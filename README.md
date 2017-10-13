# simplet-indicator-gmusic

## Simple Google Music Indicator Applet

![Ubuntu Indicator](extras/ubuntu-collapsed.png?raw=true "")
![Ubuntu Indicator](extras/ubuntu-open.png?raw=true "")

# Dev Install

### Ubuntu 16.04

Debian distros may need to create a symlink for electron to install properly

##### Install nodejs  
* `curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -`  
* `sudo apt-get install -y nodejs`

##### Install npm
* `sudo apt install npm`
* `sudo npm install -g npm`

##### Create symlink to node js  
* `sudo ln -s /usr/bin/nodejs /usr/bin/node`

##### If Compiling windows binaries then install Wine
* `sudo apt install wine`