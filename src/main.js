/**
 * Created by bnelson on 3/9/16.
 */
const electron = require('electron');
const serverEvents = require('electron').ipcMain;
const path = require('path');
const app = electron.app;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const util = require('./modules/window-util.js');
const appDataBasePath = app.getPath("appData");
const settings = require('./modules/settings-util.js')(appDataBasePath);
console.log("Storing user settings at " + appDataBasePath);
const menubar = require('menubar');

var mb = menubar(util.getMenubarConfig());

mb.on('ready', function ready() {
    console.log('app is ready');
    const imagePath = path.join(__dirname, "resources/images/");
    console.log(imagePath);
    util.setupMediaKeyEvents(mb);

    var tray = mb.tray;
    var contextMenu = new Menu();
    var showHideLabel = "Show" + (!settings.getAutoHide() ? "/Hide ("+settings.getShowHideWindowKey()+")" : "");
    contextMenu.append(new MenuItem({label: showHideLabel, click: clicked}));
    if(settings.getShowMenuPlayPause()){
        contextMenu.append(new MenuItem({type: 'separator'}));
        contextMenu.append(new MenuItem({
                label: "Play/Pause",
                icon: (settings.getShowMenuIcons() ? imagePath + "pause_play.png" : null),
                click: util.playPause
        }));
    }
    if(settings.getShowMenuNext()){
        contextMenu.append(new MenuItem({type: 'separator'}));
        contextMenu.append(new MenuItem({
            label: "Next Track",
            icon: (settings.getShowMenuIcons() ? imagePath + "next_track.png" : null),
            click: util.playNextTrack}));
    }
    if(settings.getShowMenuPrevious()){
        contextMenu.append(new MenuItem({type: 'separator'}));
        contextMenu.append(new MenuItem({
            label: "Previous Track",
            icon: (settings.getShowMenuIcons() ? imagePath + "prev_track.png" : null),
            click: util.playPreviousTrack}));
    }
    contextMenu.append(new MenuItem({type: 'separator'}));
    contextMenu.append(new MenuItem({label: "Settings", click: util.showSettings}));
    contextMenu.append(new MenuItem({label: "Quit", click: function () {app.quit();}}));
    tray.setContextMenu(contextMenu);
});

function clicked(e, bounds) {
    util.showWindow(e, bounds, mb)
}

serverEvents.on('closeSettings', function() {
    util.closeSettings();
    util.setupMediaKeyEvents(mb);
});

serverEvents.on('getAppVersion', function(event) {
    console.log(app.getVersion());
    event.sender.send('setAppVersion', app.getVersion());
});

serverEvents.on('getAppDataPath', function(event) {
    console.log(appDataBasePath);
    event.sender.send('setAppDataPath', appDataBasePath);
});