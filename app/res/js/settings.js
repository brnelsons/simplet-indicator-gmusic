/**
 * Created by Nelson on 3/16/2016.
 */
const ElectronSettings = require('electron-settings');
var path = require('path');

var options = {
    'configDirPath': path.join(__dirname, 'userdata'),
    'configFileName': 'userSettings'
};

var settings = new ElectronSettings(options);

var settingsUtil = {
    save: function save(field, value){
        settings.set(field, value);
    },
    load: function load(field){
        return settings.get(field);
    }
}