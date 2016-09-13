#!/bin/bash

echo "Installing Simplet GMusic Indicator"
echo "** this requires sudo to install **"

echo "- Checking for previous install..."
if [ -d "/opt/simplet-indicator-gmusic/" ]; then
  echo "- Cleaning up previous install..."
  sudo rm -R /opt/simplet-indicator-gmusic/
fi

echo "- Creating application directory..."
sudo mkdir /opt/simplet-indicator-gmusic/
echo "- Moving files into application directory..."
sudo cp -rf ../../../* /opt/simplet-indicator-gmusic/
sudo chmod 777 -R /opt/simplet-indicator-gmusic/

# Create desktop desktop file
echo "- Creating desktop entry..."
sudo cp -f simplet-indicator-gmusic.desktop /usr/share/applications/


