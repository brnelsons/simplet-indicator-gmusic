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
const settings = require('./res/modules/setting-module.js').settings();

var menubar = require('menubar');
var path = require('path');
var ElectronSettings = require('electron-settings');
var cachedBounds; // cachedBounds are needed for double-clicked event

var theme = settings.get('theme') || configs.getTheme();
var mb = menubar(configs.getMenubarConfig());

const DEBUG_ENABLED = false;

mb.on('ready', function ready() {
    console.log('app is ready');

    util.setupMediaKeyEvents(mb.window);

    var tray = mb.tray;
    var contextMenu = new Menu();
    contextMenu.append(new MenuItem({label: "Show", click: clicked}));
    contextMenu.append(new MenuItem({label: "Settings", click: util.showSettings}));
    if (DEBUG_ENABLED) {
        contextMenu.append(new MenuItem({label: "Debug", click: function debug(window) {
            window.toggleDevTools();
        }}));
    }
    contextMenu.append(new MenuItem({
        label: "Quit", click: function () {
            app.quit();
        }
    }));
    tray.setContextMenu(contextMenu);
});

function watchSettings() {
    settings.watch('position', function (data) {
        mb.positioner.move(data);
        var position = mb.positioner.calculate(data, cachedBounds);
        mb.window.setPosition(position.x, position.y)
    });
    settings.watch('theme', function (data) {
        var image = path.join(__dirname, 'res/images', 'gmusic-' + data + '-indicator.png');
        var tray = mb.tray;
        tray.setImage(image);
    });
}
mb.on('after-create-window', function() {
    //mb.window.setResizable(false);
    //console.log(mb.window.isResizable())
    watchSettings();
});

function clicked(e, bounds) {
    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) return mb.hideWindow();
    if (mb.window && mb.window.isVisible()) return mb.hideWindow();
    cachedBounds = bounds || cachedBounds;
    mb.showWindow(cachedBounds);
}

ipcMain.on('close-settings', function(event, arg) {
    util.closeSettings();
});