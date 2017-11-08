/**
 * Created by Nelson on 3/18/2016.
 */
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const Positioner = require('electron-positioner');
const globalShortcut = electron.globalShortcut;
const path = require('path');
const settingsModule = require('./settings-util.js')(electron.app.getPath("appData"));
const musicServices = require('./settings.js').SETTINGS.PLAYER_SETTINGS.VALUES.MUSIC_SERVICE.OPTIONS;
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

function playNextTrack(musicService) {
    // menuBarRef.window.webContents.executeJavaScript('document.getElementById("player-bar-forward").click();');
    menuBarRef.window.webContents.executeJavaScript(musicService.JS_NEXT);
}
function playPreviousTrack(musicService) {
    // menuBarRef.window.webContents.executeJavaScript('document.getElementById("player-bar-rewind").click();');
    menuBarRef.window.webContents.executeJavaScript(musicService.JS_PREV);
}
function playPause(musicService) {
    // menuBarRef.window.webContents.executeJavaScript('document.getElementById("player-bar-play-pause").click();');
    menuBarRef.window.webContents.executeJavaScript(musicService.JS_PLAY_PAUSE);
}
module.exports = {
    showSettings: function settings() {
        if (settingsWindow == null) {
            var options = {
                height: 600,
                width: 480,
                frame: false,
                darkTheme: true,
                transparent: true,
                resizable: false
            };
            settingsWindow = new BrowserWindow(options);
            var positioner = new Positioner(settingsWindow);

            positioner.move('center');
            settingsWindow.loadURL('file://' + path.join(__dirname, '../settings-bootstrap.html'))
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

        const musicServiceUrl = settingsModule.getMusicService();
        var musicServiceFound;
        for(var musicService in musicServices){
            if(musicServices.hasOwnProperty(musicService)){
                var service = musicServices[musicService];
                if(service['VALUE'] === musicServiceUrl){
                    musicServiceFound = service;
                }
            }
        }

        globalShortcut.register(settingsModule.getMediaNextKey(), function () {
            playNextTrack(musicServiceFound);
        });

        globalShortcut.register(settingsModule.getMediaPreviousKey(), function () {
            playPreviousTrack(musicServiceFound);
        });

        globalShortcut.register(settingsModule.getMediaPlayPauseKey(), function () {
            playPause(musicServiceFound);
        });

        //show window
        globalShortcut.register(settingsModule.getShowHideWindowKey(), function () {
            showWindow(null, cachedBounds, mb)
        })
    },
    getMenubarConfig: function(){
        return {
            dir: __dirname,
            icon: settingsModule.getTrayIconConfiguration(),
            height: parseInt(settingsModule.getWindowHeight()),
            width: parseInt(settingsModule.getWindowWidth()),
            showOnAllWorkspaces: false,
            tooltip: 'GMusic',
            transparent: "true",
            preloadWindow: "true",
            index: settingsModule.getMusicService(),
            windowPosition: settingsModule.getWindowPosition(),
            alwaysOnTop: true /*this is to override the menubar default config*/
        }
    }

};