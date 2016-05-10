#!/bin/bash

DIR = "/opt/simplet-indicator-gmusic/"

echo "Installing Simplet GMusic Indicator"
echo "** this requires sudo to install **"

echo "- Checking for previous install..."
if [ -d "$DIR" ]; then
  echo "- Cleaning up previous install..."
  sudo rm -R $DIR
fi

echo "- Creating application directory..."
sudo mkdir $DIR
echo "- Moving files into application directory..."
sudo cp -rf ../../../* $DIR

# Create desktop desktop file
echo "- Creating desktop entry..."
sudo cp -f simplet-indicator-gmusic.desktop /usr/share/applications/