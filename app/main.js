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
var path = require('path');
var cachedBounds; // cachedBounds are needed for double-clicked event

var mb = menubar(configs.getMenubarConfig());

function getContextMenu() {
    var contextMenu = new Menu();
    contextMenu.append(new MenuItem({label: "Show", click: clicked}));
    contextMenu.append(new MenuItem({label: "Settings", click: util.showSettings}));
    contextMenu.append(new MenuItem({
        label: "Quit", click: function () {
            app.quit();
        }
    }));
    return contextMenu;
}
mb.on('ready', function ready() {
    console.log('app is ready');

    util.setupMediaKeyEvents(mb.window);
    mb.window.on('resize', function(){
        var wh = mb.window.getSize();
        settings.setWindowWidth(wh[0]);
        settings.setWindowHeight(wh[1]);
    });

    var tray = mb.tray;
    tray.setContextMenu(getContextMenu());
});

function clicked(e, bounds) {
    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) return mb.hideWindow();
    if (mb.window && mb.window.isVisible()) return mb.hideWindow();
    cachedBounds = bounds || cachedBounds;
    mb.showWindow(cachedBounds);
}

ipcMain.on('close-settings', function() {
    util.closeSettings();
    var image = path.join(__dirname, 'res/images', 'gmusic-' + settings.getTheme() + '-indicator.png');
    var tray = mb.tray;
    tray.setImage(image);
    tray.setContextMenu(getContextMenu());
});