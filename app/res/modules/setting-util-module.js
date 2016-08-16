/**
 * Created by Nelson on 3/18/2016.
 */
var ElectronSettings = require('electron-settings');
var path = require('path');
var preSettings = require('./settings-module');
var PLAYER_SETTINGS = preSettings.PLAYER_SETTINGS.VALUES;
var WINDOW_SETTINGS = preSettings.WINDOW_SETTINGS.VALUES;
var HOT_KEY_SETTINGS = preSettings.HOT_KEYS.VALUES;

const electronSettings = new ElectronSettings({
    'configDirPath': path.join(__dirname, '../../userdata'),
    'configFileName': 'userSettings'
});

function setAndGetSetting(hotKey){
    electronSettings.set(hotKey.NAME, hotKey.DEFAULT_VAL);
    return hotKey.DEFAULT_VAL;
}

module.exports = {
    settings: function loadSettings(){
        return new ElectronSettings({
            'configDirPath': path.join(__dirname, '../../userdata'),
            'configFileName': 'userSettings'
        });
    },

    getMusicService: function(){
        return electronSettings.get(PLAYER_SETTINGS.MUSIC_SERVICE.NAME) || this.getDefaultMusicService();
    },

    setMusicService: function(musicService){
        electronSettings.set(PLAYER_SETTINGS.MUSIC_SERVICE.NAME, musicService);
    },

    getWindowPosition: function(){
        return electronSettings.get(WINDOW_SETTINGS.POSITION.NAME) || this.getDefaultWindowPosition();
    },

    setWindowPosition: function(position){
        electronSettings.set(WINDOW_SETTINGS.POSITION.NAME, position);
    },

    getWindowHeight: function(){
        return electronSettings.get(WINDOW_SETTINGS.WINDOW_HEIGHT.NAME) || this.getDefaultWindowHeight();
    },

    setWindowHeight: function(height){
        return electronSettings.set(WINDOW_SETTINGS.WINDOW_HEIGHT.NAME, height);
    },

    getWindowWidth: function(){
        return electronSettings.get(WINDOW_SETTINGS.WINDOW_WIDTH.NAME) || this.getDefaultWindowWidth();
    },

    setWindowWidth: function(width){
        return electronSettings.set(WINDOW_SETTINGS.WINDOW_WIDTH.NAME, width);
    },

    getTheme: function(){
        return electronSettings.get(PLAYER_SETTINGS.THEME.NAME) || this.getDefaultTheme();
    },

    setTheme: function(newTheme){
        electronSettings.set(PLAYER_SETTINGS.THEME.NAME, newTheme);
    },

    getShowHideWindowKey: function(){
        return electronSettings.get(HOT_KEY_SETTINGS.SHOW_HIDE_PLAYER.NAME) || this.getDefaultShowHidePlayerKey();
    },

    setShowHideWindowKey: function(newKey){
        electronSettings.set(HOT_KEY_SETTINGS.SHOW_HIDE_PLAYER.NAME, newKey);
    },

    getMediaNextKey: function(){
        return electronSettings.get(HOT_KEY_SETTINGS.MEDIA_NEXT.NAME) || this.getDefaultMediaNextKey();
    },

    setMediaNextKey: function(newKey){
        electronSettings.set(HOT_KEY_SETTINGS.MEDIA_NEXT.NAME, newKey);
    },

    getMediaPreviousKey: function(){
        return electronSettings.get(HOT_KEY_SETTINGS.MEDIA_PREVIOUS.NAME) || this.getDefaultMediaPreviousKey();
    },

    setMediaPreviousKey: function(newKey){
        electronSettings.set(HOT_KEY_SETTINGS.MEDIA_PREVIOUS.NAME, newKey);
    },

    getMediaPlayPauseKey: function(){
        return electronSettings.get(HOT_KEY_SETTINGS.MEDIA_PLAY_PAUSE.NAME) || this.getDefaultMediaPlayPauseKey();
    },

    setMediaPlayPauseKey: function(newKey){
        electronSettings.set(HOT_KEY_SETTINGS.MEDIA_PLAY_PAUSE.NAME, newKey);
    },

    getAlwaysOnTop: function(){
        var alwaysOnTop = electronSettings.get(WINDOW_SETTINGS.ALWAYS_ON_TOP.NAME) ||  this.getDefaultAlwaysOnTop();
        return alwaysOnTop == "true";
    },

    setAlwaysOnTop: function(newKey){
        electronSettings.set(WINDOW_SETTINGS.ALWAYS_ON_TOP, newKey);
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
        return setAndGetSetting(WINDOW_SETTINGS.ALWAYS_ON_TOP);
    },

    getDefaultWindowHeight: function(){
        return setAndGetSetting(WINDOW_SETTINGS.WINDOW_HEIGHT);
    },

    getDefaultWindowWidth: function(){
        return setAndGetSetting(WINDOW_SETTINGS.WINDOW_WIDTH);
    },
    
    getDefaultWindowPosition: function(){
        return setAndGetSetting(WINDOW_SETTINGS.POSITION);
    },

    getDefaultMusicService: function () {
        return setAndGetSetting(PLAYER_SETTINGS.MUSIC_SERVICE);
    },

    getDefaultTheme: function(){
        return setAndGetSetting(PLAYER_SETTINGS.THEME);
    },

    getDefaultShowHidePlayerKey: function () {
        return setAndGetSetting(HOT_KEY_SETTINGS.SHOW_HIDE_PLAYER);
    },

    getDefaultMediaPlayPauseKey: function(){
        return setAndGetSetting(HOT_KEY_SETTINGS.MEDIA_PLAY_PAUSE);
    },

    getDefaultMediaNextKey: function(){
        return setAndGetSetting(HOT_KEY_SETTINGS.MEDIA_PLAY_PAUSE);
    },

    getDefaultMediaPreviousKey: function(){
        return setAndGetSetting(HOT_KEY_SETTINGS.MEDIA_PLAY_PAUSE);
    }
};