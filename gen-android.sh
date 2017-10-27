#!/bin/bash

DATE=`date '+%Y%m%d%H%M%S'`$RANDOM

cd ../Senior_Project/android && ./gradlew assembleRelease
mv ./app/build/outputs/apk/app-release.apk ../../manage_API/app/android_app/$DATE.apk

#please bring date last line
echo $DATE