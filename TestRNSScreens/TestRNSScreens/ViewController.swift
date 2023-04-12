//
//  ViewController.swift
//  TestRNSScreens
//
//  Created by Maksym Kondakov on 10.04.2023.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    @IBAction func openAppClicked(_ sender: Any) {
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        let vc = storyboard.instantiateViewController(withIdentifier: "ReactContainer")
        self.present(vc, animated: true)
        
    }
    
}

