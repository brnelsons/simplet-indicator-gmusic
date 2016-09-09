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
var menuBarRef;

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

function playNextTrack() {
    menuBarRef.window.webContents.executeJavaScript('document.getElementById("player-bar-forward").click();');
}
function playPreviousTrack() {
    menuBarRef.window.webContents.executeJavaScript('document.getElementById("player-bar-rewind").click();');
}
function playPause() {
    menuBarRef.window.webContents.executeJavaScript('document.getElementById("player-bar-play-pause").click();');
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

    playNextTrack: playNextTrack,
    playPreviousTrack: playPreviousTrack,
    playPause: playPause,

    setupMediaKeyEvents: function setupMediaKeyEvents(mb) {
        menuBarRef = mb;
        // old way mb.window.webContents.sendInputEvent({type: 'keydown', keyCode: 'Right'});
        mb.window.setAlwaysOnTop(settingsModule.getAlwaysOnTop());
        mb.window.on('blur', function(){
            if(settingsModule.getAutoHide()){
                mb.window.hide();
            }
        });



        globalShortcut.register(settingsModule.getMediaNextKey(), function () {
            playNextTrack();
        });

        globalShortcut.register(settingsModule.getMediaPreviousKey(), function () {
            playPreviousTrack();
        });

        globalShortcut.register(settingsModule.getMediaPlayPauseKey(), function () {
            playPause();
        });

        //show window
        globalShortcut.register(settingsModule.getShowHideWindowKey(), function () {
            showWindow(null, cachedBounds, mb)
        })
    }

};