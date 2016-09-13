/**
 * Created by bnelson on 3/9/16.
 */
const electron = require('electron');
const ipcMain = require('electron').ipcMain;
const app = electron.app;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const util = require('./res/modules/window-util.js');
const settings = require('./res/modules/settings-util.js');

var menubar = require('menubar');

var mb = menubar(util.getMenubarConfig());

mb.on('ready', function ready() {
    console.log('app is ready');

    util.setupMediaKeyEvents(mb);

    var tray = mb.tray;
    var contextMenu = new Menu();
    var showHideLabel = "Show" + (!settings.getAutoHide() ? "/Hide ("+settings.getShowHideWindowKey()+")" : "");
    contextMenu.append(new MenuItem({label: showHideLabel, click: clicked}));
    if(settings.getShowMenuPlayPause()){
        contextMenu.append(new MenuItem({type: 'separator'}));
        contextMenu.append(new MenuItem({label: "Play/Pause", click: util.playPause}));
    }
    if(settings.getShowMenuNext()){
        contextMenu.append(new MenuItem({type: 'separator'}));
        contextMenu.append(new MenuItem({label: "Next Track", click: util.playNextTrack}));
    }
    if(settings.getShowMenuPrevious()){
        contextMenu.append(new MenuItem({type: 'separator'}));
        contextMenu.append(new MenuItem({label: "Previous Track", click: util.playPreviousTrack}));
    }
    contextMenu.append(new MenuItem({type: 'separator'}));
    contextMenu.append(new MenuItem({label: "Settings", click: util.showSettings}));
    contextMenu.append(new MenuItem({label: "Quit", click: function () {app.quit();}}));
    tray.setContextMenu(contextMenu);
});

function clicked(e, bounds) {
    util.showWindow(e, bounds, mb)
}

ipcMain.on('close-settings', function() {
    util.closeSettings();
    util.setupMediaKeyEvents(mb);
});