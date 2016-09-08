/**
 * Created by Nelson on 3/18/2016.
 */
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const Positioner = require('electron-positioner');
const globalShortcut = electron.globalShortcut;
const path = require('path');
const settingsModule = require('./setting-util-module.js');
var settingsWindow;
var cachedBounds;

function showWindow(e, bounds, mb) {
    if (e != null && ( e.altKey || e.shiftKey || e.ctrlKey || e.metaKey)) return mb.hideWindow();
    if (mb.window && mb.window.isVisible()) return mb.hideWindow();
    cachedBounds = bounds || cachedBounds;
    var bool = mb.showWindow(cachedBounds);
    setTimeout(function () {
        mb.window.focus();
    }, 500);
    return bool;
}

module.exports = {
    showSettings: function settings() {
        if (settingsWindow == null) {
            var options = {
                height: 600,
                width: 440,
                frame: false,
                darkTheme: true,
                transparent: true,
                resizable: false
            };
            settingsWindow = new BrowserWindow(options);
            var positioner = new Positioner(settingsWindow);

            positioner.move('center');
            settingsWindow.loadURL('file://' + path.join(__dirname, '../../new_settings.html'))
        }else if (settingsWindow.isVisible()){
            settingsWindow.hide();
        }else{
            settingsWindow.show();
        }
    },

    closeSettings: function closeSettings() {
        if (settingsWindow != null) {
            settingsWindow.close();
            settingsWindow = null;
        }
    },

    showWindow: function (e, bounds, mb) {
        showWindow(e, bounds, mb);
    },

    setupMediaKeyEvents: function setupMediaKeyEvents(mb) {
        // old way mb.window.webContents.sendInputEvent({type: 'keydown', keyCode: 'Right'});
        mb.window.setAlwaysOnTop(settingsModule.getAlwaysOnTop());
        mb.window.on('blur', function(){
            if(settingsModule.getAutoHide()){
                mb.window.hide();
            }
        });

        globalShortcut.register(settingsModule.getMediaNextKey(), function () {
            mb.window.webContents.executeJavaScript('document.getElementById("player-bar-forward").click();');
        });

        globalShortcut.register(settingsModule.getMediaPreviousKey(), function () {
            mb.window.webContents.executeJavaScript('document.getElementById("player-bar-rewind").click();');
        });

        globalShortcut.register(settingsModule.getMediaPlayPauseKey(), function () {
            mb.window.webContents.executeJavaScript('document.getElementById("player-bar-play-pause").click();');
        });

        //show window
        globalShortcut.register(settingsModule.getShowHideWindowKey(), function () {
            showWindow(null, cachedBounds, mb)
        })
    }

};