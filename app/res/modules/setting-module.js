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

function setAndReturn(FIELD, DEFAULT_VAL) {
    electronSettings.set(FIELD, DEFAULT_VAL);
    return DEFAULT_VAL;
}

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
    WINDOW_WIDTH: 'windowWidth',
    WINDOW_HEIGHT: 'windowHeight',
    DEFAULT_WINDOW_HEIGHT: '600',
    DEFAULT_WINDOW_WIDTH: '975',
    THEME: 'theme',
    MEDIA_PLAY_PAUSE: 'mediaPlayPauseKey',
    MEDIA_NEXT: 'mediaNextKey',
    MEDIA_PREVIOUS: 'mediaShowKey',
    SHOW_HIDE_PLAYER: 'showHidePlayerKey',
    ALWAYS_ON_TOP: 'alwaysOnTop',

    getMusicService: function(){
        return electronSettings.get(this.MUSIC_SERVICE) || this.getDefaultMusicService();
    },

    setMusicService: function(musicService){
        electronSettings.set(this.MUSIC_SERVICE, musicService);
    },

    getWindowPosition: function(){
        return electronSettings.get(this.POSITION) || this.getDefaultWindowPosition();
    },

    setWindowPosition: function(position){
        electronSettings.set(this.POSITION, position);
    },

    getWindowHeight: function(){
        return electronSettings.get(this.WINDOW_HEIGHT) || this.getDefaultWindowHeight();
    },

    setWindowHeight: function(height){
        return electronSettings.set(this.WINDOW_HEIGHT, height);
    },

    getWindowWidth: function(){
        return electronSettings.get(this.WINDOW_WIDTH) || this.getDefaultWindowWidth();
    },

    setWindowWidth: function(width){
        return electronSettings.set(this.WINDOW_WIDTH, width);
    },

    getTheme: function(){
        return electronSettings.get(this.THEME) || this.getDefaultTheme();
    },

    setTheme: function(newTheme){
        electronSettings.set(this.THEME, newTheme);
    },

    getShowHideWindowKey: function(){
        return electronSettings.get(this.SHOW_HIDE_PLAYER) || this.getDefaultShowHidePlayerKey();
    },

    setShowHideWindowKey: function(newKey){
        electronSettings.set(this.SHOW_HIDE_PLAYER, newKey);
    },

    getMediaNextKey: function(){
        return electronSettings.get(this.MEDIA_NEXT) || this.getDefaultMediaNextKey();
    },

    setMediaNextKey: function(newKey){
        electronSettings.set(this.MEDIA_NEXT, newKey);
    },

    getMediaPreviousKey: function(){
        return electronSettings.get(this.MEDIA_PREVIOUS) || this.getDefaultMediaPreviousKey();
    },

    setMediaPreviousKey: function(newKey){
        electronSettings.set(this.MEDIA_PREVIOUS, newKey);
    },

    getMediaPlayPauseKey: function(){
        return electronSettings.get(this.MEDIA_PLAY_PAUSE) || this.getDefaultMediaPlayPauseKey();
    },

    setMediaPlayPauseKey: function(newKey){
        electronSettings.set(this.MEDIA_PLAY_PAUSE, newKey);
    },

    getAlwaysOnTop: function(){
        return electronSettings.get(this.ALWAYS_ON_TOP) ||  this.getDefaultAlwaysOnTop();
    },

    setAlwaysOnTop: function(newKey){
        electronSettings.set(this.ALWAYS_ON_TOP, newKey);
    },

    //predefined configs from settings
    getTrayIconConfiguration: function(){
        var isWindows = process.platform === 'win32';
        var theme = this.getTheme();
        function getTrayIcon(fileType) {
            return path.join(__dirname, '../images', 'gmusic-' + theme + '-indicator.' + fileType);
        }
        return isWindows ? getTrayIcon('ico') : getTrayIcon('png');
    },

    getDefaultAlwaysOnTop: function(){
        return setAndReturn(this.ALWAYS_ON_TOP, 'false');
    },

    getDefaultWindowHeight: function(){
        return setAndReturn(this.WINDOW_HEIGHT, DEFAULT_WINDOW_HEIGHT);
    },

    getDefaultWindowWidth: function(){
        return setAndReturn(this.WINDOW_WIDTH, DEFAULT_WINDOW_WIDTH);
    },
    
    getDefaultWindowPosition: function(){
        return setAndReturn(this.POSITION, (process.platform === 'win32') ? 'trayBottomRight' : 'topCenter');
    },

    getDefaultTheme: function(){
        return setAndReturn(this.THEME, 'dark');
    },

    getDefaultShowHidePlayerKey: function () {
        return setAndReturn(this.SHOW_HIDE_PLAYER, 'ctrl+home');
    },

    getDefaultMusicService: function () {
        return setAndReturn(this.MUSIC_SERVICE, 'https://play.google.com/music/listen#/now');
    },

    getDefaultMediaPlayPauseKey: function(){
        return setAndReturn(this.MEDIA_PLAY_PAUSE, 'MediaPlayPause');
    },

    getDefaultMediaNextKey: function(){
        return setAndReturn(this.MEDIA_NEXT, 'MediaNextTrack');
    },

    getDefaultMediaPreviousKey: function(){
        return setAndReturn(this.MEDIA_PREVIOUS, 'MediaPreviousTrack');
    }
};