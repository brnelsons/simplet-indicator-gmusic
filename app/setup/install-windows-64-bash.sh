#!/bin/bash

echo "Installing Simplet GMusic Indicator"

echo "- Checking for previous install..."
if [ -d "/c/Program\ Files/SimpletIndicator/GMusic" ]; then
  echo "- Cleaning up previous install..."
  rm -R /c/Program\ Files/SimpletIndicator/GMusic
fi

mkdir /c/Program\ Files/SimpletIndicator/GMusic

echo "- Moving files into application directory..."
cp -Rf ../../../* /c/Program\ Files/SimpletIndicator/GMusic


# Create desktop desktop file
echo "- Creating desktop entry..."
cp -f GMusic.lnk ~/AppData/Roaming/Microsoft/Windows/Start\ Menu/Programs/SimpletIndicator

echo "**** Done! ****"