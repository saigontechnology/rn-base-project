#1/use/bin/env bash

npx jetify

if [[ ! "$CI" = true ]]; then
  # Do not install iOS Pods on CI
  if [[ $(sysctl -n machdep.cpu.brand_string) =~ "Apple" ]]; then
    echo "M1"
    cd ./ios && arch -x86_64 npx pod install && cd ..
  else
    echo "Intel"
    cd ./ios && npx pod install && cd ..
  fi
  error_code=$?
  echo "Pods error_code: ${error_code}"
  set +e
  if [ $error_code -eq 1 ] || [ $error_code -eq 31 ]; then
    echo "Local specs is not up-to-date, re-running pod install and updating the local spec repo."
     if [[ $(sysctl -n machdep.cpu.brand_string) =~ "Apple" ]]; then
        echo "M1"
        arch -x86_64 npx pod install --repo-update && cd ..
    else
      echo "Intel"
      nxp pod install --repo-update && cd ..
    fi
  else
    exit $error_code
  fi
fi
