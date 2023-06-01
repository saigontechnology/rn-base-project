#1/use/bin/env bash

npx jetify

if [[ ! "$CI" = true ]]; then
  # Do not install iOS Pods on CI
  # Get the name of the CPU
  cpu=$(sysctl -n machdep.cpu.brand_string)
  if [[ $cpu =~ "Apple" ]]; then
    if [[ $cpu =~ "M2" ]]; then
      echo "M2"
      cd ./ios && pod install && cd ..
    else
      echo "M1"
      cd ./ios && arch -arm64 pod install && cd ..
    fi
  else
    echo "Intel"
    cd ./ios && pod install && cd ..
  fi
  error_code=$?
  echo "Pods error_code: ${error_code}"
  set +e
  if [ $error_code -eq 1 ] || [ $error_code -eq 31 ]; then
    echo "Local specs is not up-to-date, re-running pod install and updating the local spec repo."
     if [[ $cpu =~ "Apple" ]]; then
        if [[ $cpu =~ "M2" ]]; then
             echo "M2"
             cd ./ios && pod install --repo-update && cd ..
           else
             echo "M1"
             arch -arm64 pod install --repo-update && cd ..
           fi
    else
      echo "Intel"
      pod install --repo-update && cd ..
    fi
  else
    exit $error_code
  fi
fi
