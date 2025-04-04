//
//  AppDelegate.swift
//  RNBaseProject
//
//  Created by TungLe on 3/4/25.
//


import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
class AppDelegate: RCTAppDelegate {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    self.moduleName = "RNBaseProject"
    self.dependencyProvider = RCTAppDependencyProvider()
 
    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = [:]
 
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
 
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }
 
  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    CodePush.bundleURL()
#endif
  }

  /// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
  ///
  /// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
  /// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
  /// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
  func concurrentRootEnabled() -> Bool {
      return true
  }
}
