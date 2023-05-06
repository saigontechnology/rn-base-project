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
             npx react-native run-android --variant=$opt --appIdSuffix=development
            break
        fi 
    done
fi

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
