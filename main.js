/**
 * Created by bnelson on 3/9/16.
 */
const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;

var menubar = require('menubar');
var path = require('path');
var cachedBounds; // cachedBounds are needed for double-clicked event

var opts = {
    dir: __dirname,
    icon: path.join(__dirname, 'res/images', 'gmusic-light.png'),
    width: 900,
    height: 450,
    tooltip: 'Show Weather',
    transparent: "true",
    'preload-window': 'true',
    index: 'https://play.google.com/music/listen#/now'
    //'always-on-top': 'false'
};

var mb = menubar(opts);

mb.on('ready', function ready() {
    console.log('app is ready');

    var tray = mb.tray;
    var contextMenu = new Menu();
    contextMenu.append(new MenuItem({label: "Show", click: clicked}));
    //contextMenu.append(new MenuItem({label: "Settings", click: util.showSettings}));
    //if (DEBUG_ENABLED) {
    //    contextMenu.append(new MenuItem({label: "Debug", click: util.debug}));
    //}
    contextMenu.append(new MenuItem({
        label: "Quit", click: function () {
            app.quit()
        }
    }));
    tray.setContextMenu(contextMenu);
});

function clicked(e, bounds) {
    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) return mb.hideWindow();
    if (menubar.window && menubar.window.isVisible()) return mb.hideWindow();
    cachedBounds = bounds || cachedBounds;
    mb.showWindow(cachedBounds);
}

//var util = {
//    showSettings: function settings() {
//        var options = {
//            height: 600,
//            width: 400,
//            show: true,
//            frame: true,
//            center: true,
//            darkTheme: true
//        };
//        var newWindow = new BrowserWindow(options);
//        var positioner = new Positioner(newWindow);
//        positioner.move('center');
//        newWindow.loadURL('file://' + path.join(opts.dir, 'settings.html'))
//    },
//
//    debug: function debug() {
//        mb.window.toggleDevTools();
//    }
//};