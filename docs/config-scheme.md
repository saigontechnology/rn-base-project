# Config scheme (android & ios)
Many times when developing an application, we developers need to create different builds with different configurations. Facilitating the maintenance and testing process. Usually 3 different builds are created: **development**, **staging** and **production**.

## Installing react-native-config

Install the package

```bash
// yarn 
yarn add react-native-config

// npm 
npm install react-native-config --save
```

For iOS also run **pod install** after package is installed

And below line of code to `android/app/build.gradle` to apply plugin

```bash
apply plugin: "com.android.application"
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle" // <- add this line
```

## Create .env files for each configuration

`.env.development`

```bash
ENV=development
API_URL=https://api.dev.com
```

`.env.staging`

```bash
ENV=staging
API_URL=https://api.staging.com
```

`.env.staging`

```bash
ENV=production
API_URL=https://api.com
```

## Setup for Android

Now we need to define **envConfigFiles** in `build.gradle` associating builds with env files. To achieve this, add the below code before the apply from call, and be sure to leave the build cases in lowercase.

`android/app/build.gradle`

```bash
// add this block
project.ext.envConfigFiles = [
   development: ".env.development",
   staging: ".env.staging",
   production: ".env.production",
]
// ---
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradl
```

Adding Product Flavor on project below line **compileSdkVersion**

`android/app/build.gradle`

```bash
android {
    ndkVersion rootProject.ext.ndkVersion
    compileSdkVersion rootProject.ext.compileSdkVersion

    // add this block
    flavorDimensions "default"
     productFlavors {
        development {}
        staging {}
        production {}
    }

    defaultConfig {
        applicationId project.env.get("APP_ID") // using env
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        buildConfigField "boolean", "IS_NEW_ARCHITECTURE_ENABLED", isNewArchitectureEnabled().toString()
        resValue "string", "build_config_package", "com.saigontechnolgy.rnbaseproject" // add this line

        if (isNewArchitectureEnabled()) {
            // We configure the CMake build only if you decide to opt-in for the New Architecture.
            externalNativeBuild {
                cmake {
                    arguments "-DPROJECT_BUILD_DIR=$buildDir",
                        "-DREACT_ANDROID_DIR=$rootDir/../node_modules/react-native/ReactAndroid",
                        "-DREACT_ANDROID_BUILD_DIR=$rootDir/../node_modules/react-native/ReactAndroid/build",
                        "-DNODE_MODULES_DIR=$rootDir/../node_modules",
                        "-DANDROID_STL=c++_shared"
                }
            }
            if (!enableSeparateBuildPerCPUArchitecture) {
                ndk {
                    abiFilters (*reactNativeArchitectures())
                }
            }
        }
    }

   // ---
...
```

Value `APP_ID` in env below:

```bash
API_URL=
APP_ENV=dev
CODEPUSH_KEY_IOS=
CODEPUSH_KEY_ANDROID=
APP_ID=com.saigontechnolgy.rnbaseproject.development // this line
APP_NAME=BaseDev 
```

Names should match based on **productFlavors**, so **productiondebug** will match **debug** in this case and generate debug build of App with configuration from `.env.production`.

Also add matchingFallbacks in buildTypes as shown below:

`android/app/build.gradle`

```bash
buildTypes {
        debug {
            signingConfig signingConfigs.debug
            matchingFallbacks = ['debug', 'release'] // <- add this line
        }
        release {
            signingConfig signingConfigs.debug
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
```

### Android Change App name and App Icon

Edit file `android/app/src/main/res/values/string.xml`.

- Change `app_name` using env: 

```bash
<resources>
    <string name="app_name">@string/APP_NAME</string>
    <string moduleConfig="true" name="CodePushDeploymentKey">@string/CODEPUSH_KEY_ANDROID</string>
</resources>
```

- Value `APP_NAME` and `CODEPUSH_KEY_ANDROID` in file env 

```bash
API_URL=
APP_ENV=dev
CODEPUSH_KEY_IOS=
CODEPUSH_KEY_ANDROID=
APP_ID=com.saigontechnolgy.rnbaseproject.development
APP_NAME=BaseDev // this line
```

- The result should be like

![](https://user-images.githubusercontent.com/117077260/201819353-40780a31-e5b4-43f1-a7ca-285aa47b85ae.png)

Create bash script run android `run-app.bash` in folder scripts

```bash
prompt_android="Please select variant for android: "
OPTIONS_ANDROID=(
    "developmentDebug" 
    "developmentRelease"
    "stagingDebug" 
    "stagingRelease" 
    "productionDebug" 
    "productionRelease"
    "quit"
)

if [ "$1" == "android" ]
then
    PS3="$prompt_android"
    select opt in "${OPTIONS_ANDROID[@]}"; do
        if [ "$opt" == "quit" ]
        then
            break
        fi 
        if [ "$opt" == "" ]
        then
            echo "Invalid"
        else
             echo "Variant: $opt"
             npx react-native run-android --variant=$opt
            break
        fi 
    done
fi
```

## Setup for iOS

When you create a new project, Xcode automatically generates two types of schemes for you, and they are **Debug** and **Release**. 

### Creating a new configuration

The above approach still shows debug, but in reality, it's actually a staging according to its condition change. The clean approach is to create a new scheme.

You could easily duplicate on top of debug or release. Usually, it’s on top of debug as you don't really need an additional release.

![](https://i.imgur.com/s6jPjAa.png)

Once you have duplicated on top of debug, you may then rename it to staging.

![](https://i.imgur.com/2mSJCnx.png)

### Creating a new user setting

The next step is to make it so we can run these apps side-by-side.

On the top bar, click the + sign and “Add User-Defined Setting”

![](https://i.imgur.com/Bqkcui6.png)

Name it BUNDLE_ID_SUFFIX (or something similar — you’ll need to re-use this name later)

Open the dropdown and give the following values for each configuration, leaving the “Release” value blank:

![](https://i.imgur.com/pqfRxKn.png)

### Change name your app

While you’re in your project settings, select your Target from the left sidebar and go to the “Build Settings” tab and search **product name**. Edit value `Base$(BUNDLE_ID_SUFFIX)`

![](https://i.imgur.com/4APop1w.png)

### Change bundle identifier

While you’re in your project settings, select your Target from the left sidebar and go to the “Build Settings” tab and search **product bundle**

![](https://i.imgur.com/dDJwoBz.png)

### App Icon Scheme

Lastly, a final touch would be to add different app icons based on the scheme. You will have to add the icon to the AppIcon.

Next, you can duplicate the AppIcon and rename it, as shown below:

![](https://i.imgur.com/7B8nW51.png)

Inside the project, you will then use different AppIcon based on the scheme.

![](https://i.imgur.com/pE9XzqF.png)

### Create a new scheme 

You can duplicate scheme and edit it, as show below:

![](https://i.imgur.com/cihmf8x.png)

Edit schema > Build > Pre-actions

Select schema build settings same as selected schema and add this script

`RNBaseProjectDev`

```bash 
cp "${PROJECT_DIR}/../.env.development" "${PROJECT_DIR}/../.env"
```

![](https://i.imgur.com/4wcnZTi.png)

`RNBaseProjectStg`

```bash 
cp "${PROJECT_DIR}/../.env.staging" "${PROJECT_DIR}/../.env"
```

![](https://i.imgur.com/H9l5fpS.png)

`RNBaseProject`

```bash 
cp "${PROJECT_DIR}/../.env.production" "${PROJECT_DIR}/../.env"
```

![](https://i.imgur.com/Fkepvwu.png)

Create bash script run ios `run-app.bash` in folder scripts

```bash
prompt_ios="Please select variant for ios: "
OPTIONS_IOS=(
    "RNBaseProjectDev" 
    "RNBaseProjectStg" 
    "RNBaseProject" 
    "quit"
)

if [ "$1" == "ios" ]
then 
    PS3="$prompt_ios"
    select opt in "${OPTIONS_IOS[@]}"; do
        if [ "$opt" == "quit" ]
        then
            break
        fi 
        if [ "$opt" == "" ]
        then
            echo "Invalid"
        else
            echo "Scheme: $opt"
            npx react-native run-ios --scheme "$opt"
            break
        fi    
    done
fi
```

## Documentation

[How To Set Different App Icons and Name Using Xcode Scheme](https://betterprogramming.pub/how-to-set-different-app-icons-and-name-using-xcode-scheme-dbbd06803093)

[React Native: Multiple Environments Setup (Schemas/Flavors)](https://dev.to/leon_arantes/react-native-multiple-environments-setup-schemaflavors-3l7p)

[Different App Icons for your iOS Beta, Dev, and Release builds](https://engineering.circle.com/different-app-icons-for-your-ios-beta-dev-and-release-builds-af4d209cdbfd)

## Authors

[@loi.do](https://github.com/loido)

## Feedback

If you have any feedback, please reach out to us at loi.do@saigontechnogoly.com

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Support

For support, email loi.do@saigontechnogoly.com or join our Slack channel.
