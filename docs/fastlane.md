# Fastlane Configuration

## IOS

### Setup
Set environment
Enter file ~/.bash_profile
``vi ~/.bash_profile``
Use the export command to add new environment variables
``export APPLE_ID=your_apple_id``
Execute the new ~/.bash_profile by either restarting the terminal window or using:
``source ~/.bash_profile``
(if you are using zsh, then ~/.zshrc or ~/.zprofile)

```
cd ios && fastlane init
```
Config Appfile:
```app_identifier("your_bundle_id") # The bundle identifier of your app```
```apple_id("your_apple_id") # Your Apple email address```
```itc_team_id("your_app_store_connect_id") # App Store Connect Team ID```
```team_id("your_team_id") # Developer Portal Team ID```
You can follow this link to get neccessary values: https://docs.fastlane.tools/advanced/Appfile/#appfile

For more information about the Appfile, see:
https://docs.fastlane.tools/advanced/#appfile

### To run fastlane on IOS
```
cd ios && fastlane |lane|
```

## Android

### Setup
```
cd android && fastlane init
```
Config Appfile:
```json_key_file("") # Path to the json secret file```
Follow https://docs.fastlane.tools/actions/supply/#setup to get one
```package_name("com.saigontechnolgy.rnbaseproject") # e.g. com.krausefx.app```

### To run fastlane on android
```
cd android && fastlane |lane|
```

# CodePush - How to use it
We will use codepush through fastlane.
You can run it directly on ios or android folder, or you can do by script. I will mention this in next section.
Currently, this file is set up to push to appcenter. If you want to push to another provider, then you can create a new action for this.
we will go to file /ios/fastlane/Fastfile and /android/fastlane/Fastfile to change 
- **owner_name**: Owner name on appcenter (You can get it on URL)
- **my_app**: App name that you created on appcenter (You can get it on URL)
- **platform**: ios / android (only choose one).

For example: You want to codepush local to appcenter. Follow this code
```
fastlane build type:codepush env:Local
```

# Build App and upload app to store by Fastlane
### Following with these steps to build and upload:
**Step 1**: create file env with environment that you want to build (ex: env.staging)

**Step2**: add variable to env file (You need to add assential variables)
* APPCENTER_TOKEN_UPLOAD_APP
* APPCENTER_RELEASE_NOTE
* APPCENTER_DISTRIBUTE_DESTINATIONS
* APPCENTER_APP_NAME
* APPCENTER_APP_DISPLAY_NAME

You can get more variable through this link (https://github.com/microsoft/fastlane-plugin-appcenter)

**Step 3**: Run this script 
**Run directly:**
For android: ```cd android && fastlane build env:[your_environment]```
For ios: ```cd ios && fastlane build env:[your_environment]```
**Run by script:**
```yarn build [your_env]```
These scripts were created for some sample environment, you can create a own environment if you want, by following with docs.

# Codepush - Using script quickly
If you are too bored to repeat the same work "cd ios or android to run fastlane to codepush ios or android", then you can you this way.
You just need run once, and then you can drink a cup of coffee and wait for it to show success.
from /template folder you run:
```
yarn codepush [your_env]
```

The terminal will show "Code Push Successful" if succeed and show "Code Push Failed" if fail.
