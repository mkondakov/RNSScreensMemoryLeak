This test project demonstrates memory leak in react-native-screens iOS implementation.

## Issue

Instance of RNSScreen class creates strong reference cycle with instance of RNSScreenView class.
This issue is critical in our project where user can open and close react-native app inside native iOS app many times.

```h

// RNSScreen.h

@property (nonatomic, retain) RNSScreen *controller;

```

```objc

// RNSScreen.mm

@implementation RNSScreenView {

- (instancetype)initWithBridge:(RCTBridge *)bridge
{
  if (self = [super init]) {
    _bridge = bridge;
    [self initCommonProps];
  }

  return self;
}

- (void)initCommonProps
{
  _controller = [[RNSScreen alloc] initWithView:self];
  _stackPresentation = RNSScreenStackPresentationPush;
  _stackAnimation = RNSScreenStackAnimationDefault;
  _gestureEnabled = YES;
  _replaceAnimation = RNSScreenReplaceAnimationPop;
  _dismissed = NO;
  _hasStatusBarStyleSet = NO;
  _hasStatusBarAnimationSet = NO;
  _hasStatusBarHiddenSet = NO;
  _hasOrientationSet = NO;
  _hasHomeIndicatorHiddenSet = NO;
}

// ...

@end

```

Here we can see that after call of RNSScreenView.initCommonProps function strong reference cycle is created between RNSScreenView.controller and RNSScreen.view

## Proof

If we create weak version of controller and reassign controller to it in viewDidAppear function, we will see that memory leak is gone. It is not appropriate fix, it is just done for demonstration reason.

```objc

// RNSScreen.h

@property (nonatomic, retain) RNSScreen *controller;
@property (nonatomic, weak) RNSScreen *weakController;

```

```objc
- (void)viewDidAppear:(BOOL)animated
{
  [super viewDidAppear:animated];
  if (!_isSwiping || _shouldNotify) {
    // we are going forward or dismissing without swipe
    // or successfully swiped back
    [self.screenView notifyAppear];
    [self notifyTransitionProgress:1.0 closing:NO goingForward:_goingForward];
  }

  _isSwiping = NO;
  _shouldNotify = YES;
    
    ((RNSScreenView*)self.view).weakController = ((RNSScreenView*)self.view).controller;
    ((RNSScreenView*)self.view).controller = nil;
}
```

Memory usage:
<img src="https://github.com/mkondakov/RNSScreensMemoryLeak/blob/master/memoryUsage.png" width="100%" alt="Memory usage">

Memory leak:
<img src="https://github.com/mkondakov/RNSScreensMemoryLeak/blob/master/memoryLeak.png" width="100%" alt="Memory leak">

Memory usage before "fix": beforeFix.mp4

Memory usage after "fix": afterFix.mp4

## How to run

### Prerequisites

cocoapods: 1.12.0

node: v18.14.0

yarn: 1.22.10

Xcode: 14.3

### Steps
1. clone project
2. open TestRNSScreens folder in terminal
3. run "pod install"
4. open "TestRNSScreens.xcworkspace" in Xcode
5. run
6. click on "Open RN App" button
7. click on "close" button
8. repeat 6 and 7 steps few times
9. check memory usage in Xcode
