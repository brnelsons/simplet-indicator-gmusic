/**
 * Created by Nelson on 3/18/2016.
 */
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const Positioner = require('electron-positioner');
const globalShortcut = electron.globalShortcut;
const path = require('path');
const settingsModule = require('./setting-module.js');
var settingsWindow;
var cachedBounds;

function showWindow(e, bounds, mb) {
    if (e != null &&( e.altKey || e.shiftKey || e.ctrlKey || e.metaKey)) return mb.hideWindow();
    if (mb.window && mb.window.isVisible()) return mb.hideWindow();
    cachedBounds = bounds || cachedBounds;
    return mb.showWindow(cachedBounds);
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
            settingsWindow.loadURL('file://' + path.join(__dirname, '../../settings.html'))
        }
    },

    closeSettings: function () {
        if (settingsWindow != null) {
            settingsWindow.close();
            settingsWindow = null;
        }
    },

    showWindow: function(e, bounds, mb) {
        showWindow(e, bounds, mb);
    },

    setupMediaKeyEvents: function setupMediaKeyEvents(mb) {
        //globalShortcut.register('ctrl+n', function(){//for testing
        globalShortcut.register(settingsModule.getMediaNextKey(), function () {
            mb.window.webContents.sendInputEvent({type: 'keydown', keyCode: 'Right'});
        });
        //globalShortcut.register('ctrl+p', function(){//for testing
        globalShortcut.register(settingsModule.getMediaPreviousKey(), function () {
            mb.window.webContents.sendInputEvent({type: 'keydown', keyCode: 'Left'});
        });
        //globalShortcut.register('ctrl+p', function(){//for testing
        globalShortcut.register(settingsModule.getMediaPlayPauseKey(), function () {
            mb.window.webContents.sendInputEvent({type: 'keydown', keyCode: 'Space'});
        });

        //show window
        globalShortcut.register(settingsModule.getShowHideWindowKey(), function() {
            showWindow(null, cachedBounds, mb)
        })
    }

};