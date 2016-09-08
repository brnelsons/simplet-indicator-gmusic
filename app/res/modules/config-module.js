/**
 * Created by Nelson on 3/18/2016.
 */
const electron = require('electron');
const settingsModule = require('./setting-util-module.js');
var path = require('path');

module.exports = {
    
    getMenubarConfig: function(){
        return {
            dir: __dirname,
            icon: settingsModule.getTrayIconConfiguration(),
            height: parseInt(settingsModule.getWindowHeight()),
            width: parseInt(settingsModule.getWindowWidth()),
            'show-on-all-workspaces': false,
            tooltip: 'GMusic',
            transparent: "true",
            'preload-window': "true",
            index: settingsModule.getMusicService(),
            'window-position': settingsModule.getWindowPosition(),
            'always-on-top': true /*this is to override the menubar default config*/
        }
    }
};