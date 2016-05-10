/**
 * Created by Nelson on 3/18/2016.
 */
const electron = require('electron');
const settings = require('./setting-module.js').settings();
var path = require('path');

module.exports = {
    getTheme: function(){
        settings.set('theme', 'dark');
        return 'dark';
    },

    getPosition: function getDefaultPosition() {
        var pos = (process.platform === 'win32') ? 'trayBottomRight' : 'topCenter';
        settings.set('position', pos);
        return pos;
    },
    
    getMenubarConfig: function(){
        var isWindows = process.platform === 'win32';
        var theme = settings.get('theme') || this.getTheme();
        var trayIconPath = isWindows ? path.join(__dirname, '../images', 'gmusic-'+theme+'-indicator.ico') : path.join(__dirname, '../images', 'gmusic-'+theme+'-indicator.png');
        var windowPos = settings.get('position') || this.getPosition();

        return {
            dir: __dirname,
            icon: trayIconPath,
            width: 975,
            height: 600,
            tooltip: 'GMusic',
            transparent: "true",
            'preload-window': 'true',
            index: 'https://play.google.com/music/listen#/now',
            'window-position': windowPos
            //'always-on-top': 'false'
        }
    }
};