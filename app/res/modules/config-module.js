/**
 * Created by Nelson on 3/18/2016.
 */
const electron = require('electron');
const settingsModule = require('./setting-module.js');
var path = require('path');

module.exports = {
    
    getMenubarConfig: function(){
        return {
            dir: __dirname,
            icon: settingsModule.getTrayIconConfiguration(),
            height: settingsModule.getWindowHeight(),
            width: settingsModule.getWindowWidth(),
            tooltip: 'GMusic',
            transparent: "true",
            'preload-window': 'true',
            index: settingsModule.getMusicService(),
            'window-position': settingsModule.getWindowPosition()
            //'always-on-top': 'false'
        }
    }
};