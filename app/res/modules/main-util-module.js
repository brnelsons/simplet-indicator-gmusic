/**
 * Created by Nelson on 3/18/2016.
 */
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const Positioner = require('electron-positioner');
const globalShortcut = electron.globalShortcut;
const path = require('path');
var settingsWindow;

module.exports = {
    showSettings: function settings() {
        if (settingsWindow == null) {
            var options = {
                height: process.platform === 'win32' ? 600 : 500,
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

    setupMediaKeyEvents: function setupMediaKeyEvents(window) {
        //globalShortcut.register('ctrl+n', function(){//for testing
        globalShortcut.register('MediaNextTrack', function () {
            window.webContents.sendInputEvent({type: 'keydown', keyCode: 'Right'});
        });
        //globalShortcut.register('ctrl+p', function(){//for testing
        globalShortcut.register('MediaPreviousTrack', function () {
            window.webContents.sendInputEvent({type: 'keydown', keyCode: 'Left'});
        });
        //globalShortcut.register('ctrl+p', function(){//for testing
        globalShortcut.register('MediaPlayPause', function () {
            window.webContents.sendInputEvent({type: 'keydown', keyCode: 'Space'});
        });
    }

};