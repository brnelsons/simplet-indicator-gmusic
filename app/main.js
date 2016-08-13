/**
 * Created by bnelson on 3/9/16.
 */
const electron = require('electron');
const ipcMain = require('electron').ipcMain;
const app = electron.app;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const util = require('./res/modules/main-util-module.js');
const configs = require('./res/modules/config-module.js');
const settings = require('./res/modules/setting-module.js');

var menubar = require('menubar');

var mb = menubar(configs.getMenubarConfig());

mb.on('ready', function ready() {
    console.log('app is ready');

    util.setupMediaKeyEvents(mb);

    var tray = mb.tray;
    var contextMenu = new Menu();
    contextMenu.append(new MenuItem({label: "Show", click: clicked}));
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