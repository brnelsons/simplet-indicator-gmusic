/**
 * Created by Nelson on 3/18/2016.
 */
var ElectronSettings = require('electron-settings');
var path = require('path');
const electronSettings = new ElectronSettings({
    'configDirPath': path.join(__dirname, '../../userdata'),
    'configFileName': 'userSettings'
});

const DEFAULT_WINDOW_HEIGHT = 600;
const DEFAULT_WINDOW_WIDTH = 975;

module.exports = {
    settings: function loadSettings(){
        return new ElectronSettings({
            'configDirPath': path.join(__dirname, '../../userdata'),
            'configFileName': 'userSettings'
        });
    },
    MUSIC_SERVICE: 'musicService',
    POSITION: 'position',
    POSITION_HORIZONTAL: 'positionHorizontal',
    POSITION_VERTICAL: 'positionVertical',

    getMusicService: function(){
        return electronSettings.get(this.MUSIC_SERVICE) || this.getDefaultMusicService();
    },
    
    getWindowPosition: function(){
        return electronSettings.get(this.POSITION) || this.getDefaultWindowPosition();
    },
    
    getWindowHeight: function(){
        return electronSettings.get('windowHeight') || this.getDefaultWindowHeight(); 
    },

    getWindowWidth: function(){
        return electronSettings.get('windowWidth') || this.getDefaultWindowWidth();
    },
    
    getTheme: function(){
        return electronSettings.get('theme') || this.getDefaultTheme();
    },
    
    getTrayIconConfiguration: function(){
        var isWindows = process.platform === 'win32';
        var theme = this.getTheme();
        function getTrayIcon(fileType) {
            return path.join(__dirname, '../images', 'gmusic-' + theme + '-indicator.' + fileType);
        }
        return isWindows ? getTrayIcon('ico') : getTrayIcon('png');
    },
    
    getDefaultWindowHeight: function(){
        electronSettings.set('windowHeight', DEFAULT_WINDOW_HEIGHT);
        return DEFAULT_WINDOW_HEIGHT;
    },

    getDefaultWindowWidth: function(){
        electronSettings.set('windowWidth', DEFAULT_WINDOW_WIDTH);
        return DEFAULT_WINDOW_WIDTH;
    },
    
    getDefaultWindowPosition: function(){
        var pos = (process.platform === 'win32') ? 'trayBottomRight' : 'topCenter';
        electronSettings.set('position', pos);
        return pos;
    },

    getDefaultTheme: function(){
        electronSettings.set('theme', 'dark');
        return 'dark';
    },

    getDefaultMusicService: function () {
        const url = 'https://play.google.com/music/listen#/now';
        electronSettings.set('musicService', url);
        return url;
    }
};