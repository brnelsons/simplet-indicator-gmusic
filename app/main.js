/**
 * Created by bnelson on 3/9/16.
 */
const electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
const Positioner = require('electron-positioner');
const app = electron.app;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;

var menubar = require('menubar');
var path = require('path');
var ElectronSettings = require('electron-settings');
var cachedBounds; // cachedBounds are needed for double-clicked event

const ipcMain = require('electron').ipcMain;
ipcMain.on('close-settings', function(event, arg) {
    util.closeSettings();
});

var options = {
    'configDirPath': path.join(__dirname, 'userdata'),
    'configFileName': 'userSettings'
};

var settings = new ElectronSettings(options);

const DEBUG_ENABLED = false;

function getDefaultPosition() {
    var pos = (process.platform === 'win32') ? 'trayBottomRight' : 'topCenter';
    settings.set('position', pos);
    return pos;
}
function getDefaultTheme() {
    settings.set('theme', 'dark');
    return 'dark';
}

var windowPos = settings.get('position') ||  getDefaultPosition();
var theme = settings.get('theme') || getDefaultTheme();

var opts = {
    dir: __dirname,
    icon: path.join(__dirname, 'res/images', 'gmusic-'+theme+'-indicator.png'),
    width: 975,
    height: 600,
    tooltip: 'GMusic',
    transparent: "true",
    'preload-window': 'true',
    index: 'https://play.google.com/music/listen#/now',
    'window-position': windowPos
    //'always-on-top': 'false'
};

var mb = menubar(opts);

mb.on('ready', function ready() {
    console.log('app is ready');

    var tray = mb.tray;
    var contextMenu = new Menu();
    contextMenu.append(new MenuItem({label: "Show", click: clicked}));
    contextMenu.append(new MenuItem({label: "Settings", click: util.showSettings}));
    if (DEBUG_ENABLED) {
        contextMenu.append(new MenuItem({label: "Debug", click: util.debug}));
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

var settingsWindow;

var util = {
    showSettings: function settings() {
        if(settingsWindow==null) {
            var options = {
                height: 400,
                width: 400,
                //show: true,
                frame: false,
                //center: true,
                //darkTheme: true,
                transparent: true
            };
            settingsWindow = new BrowserWindow(options);
            var positioner = new Positioner(settingsWindow);

            if (DEBUG_ENABLED) {
                settingsWindow.toggleDevTools();
            }
            positioner.move('center');
            settingsWindow.loadURL('file://' + path.join(opts.dir, 'settings.html'))
        }
    },
    closeSettings: function(){
        if(settingsWindow != null){
            settingsWindow.close();
            settingsWindow = null;
        }
    },
    debug: function debug() {
        mb.window.toggleDevTools();
    }
};