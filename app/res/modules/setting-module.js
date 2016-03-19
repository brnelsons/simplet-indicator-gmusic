/**
 * Created by Nelson on 3/18/2016.
 */
var ElectronSettings = require('electron-settings');
var path = require('path');

module.exports = {
    settings: function(){
        return new ElectronSettings({
            'configDirPath': path.join(__dirname, '../../userdata'),
            'configFileName': 'userSettings'
        });
    }
}