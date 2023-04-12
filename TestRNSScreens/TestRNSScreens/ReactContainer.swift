//
//  ReactContainer.swift
//  TestRNSScreens
//
//  Created by Maksym Kondakov on 10.04.2023.
//

import Foundation
import React
import UIKit

class ReactContainer: UIViewController, RCTBridgeDelegate {
    
    @IBOutlet weak var reactContainer: UIView!
    
    
    override public func viewDidLoad() {
        super.viewDidLoad()
        loadReactNativeApp()
    }
    
    public func sourceURL(for bridge: RCTBridge!) -> URL! {
        let urlString = "http://localhost:8084/index.bundle?platform=ios&dev=true&minify=false"
        let bundleURL = URL(string: urlString)!
        return bundleURL
    }
    
    private func loadReactNativeApp() {
        
        
        let bridgeMaybe = RCTBridge(delegate: self, launchOptions: [AnyHashable: Any]())
        
        guard let bridge = bridgeMaybe else {
            return
        }
        
        let rootView = RCTRootView(bridge: bridge,
                               moduleName: "AwesomeProject",
                               initialProperties: nil)
        
        
        rootView.translatesAutoresizingMaskIntoConstraints = false
        reactContainer.addSubview(rootView)
    
        let insets: UIEdgeInsets = .zero
        rootView.topAnchor.constraint(equalTo: rootView.superview!.safeAreaLayoutGuide.topAnchor, constant: insets.top).isActive = true
        rootView.bottomAnchor.constraint(equalTo: rootView.superview!.safeAreaLayoutGuide.bottomAnchor, constant: -insets.bottom).isActive = true
        rootView.leadingAnchor.constraint(equalTo: rootView.superview!.safeAreaLayoutGuide.leadingAnchor, constant: insets.left).isActive = true
        rootView.trailingAnchor.constraint(equalTo: rootView.superview!.safeAreaLayoutGuide.trailingAnchor, constant: -insets.right).isActive = true
        rootView.clipsToBounds = true
    }
    
    @IBAction func closeAppClicked(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }
}


