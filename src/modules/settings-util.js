/**
 * Created by Nelson on 3/18/2016.
 */
var ElectronSettings = require('electron-settings');
var path = require('path');
var preSettings = require('./settings').SETTINGS;
var PLAYER_SETTINGS = preSettings.PLAYER_SETTINGS.VALUES;
var WINDOW_SETTINGS = preSettings.WINDOW_SETTINGS.VALUES;
var HOT_KEY_SETTINGS = preSettings.HOT_KEYS.VALUES;
var MENU_SETTINGS = preSettings.MENU_SETTINGS.VALUES;
var isWindows = process.platform === 'win32';
const electronSettings = new ElectronSettings({
    'configDirPath': isWindows ? path.join(__dirname, '../userdata') : '~/.simplet-indicator-gmusic/config',
    'configFileName': 'userSettings'
});

function getDefault(setting) {
    electronSettings.set(setting.NAME, setting.DEFAULT_VAL);
    return setting.DEFAULT_VAL;
}

module.exports = {
    //TODO this may be unneeded
    settings: function () {
        return new ElectronSettings({
            'configDirPath': isWindows ? path.join(__dirname, '../userdata') : '~/.simplet-indicator-gmusic/config',
            'configFileName': 'userSettings'
        });
    },
    /**
     * Get a specified setting, must have field 'NAME'
     */
    get: function (setting) {
        return electronSettings.get(setting.NAME) || getDefault(setting);
    },

    /**
     * Get a specified setting, via String
     */
    getForUi: function (settingName) {
        return electronSettings.get(settingName) || this.getDefaultByName(settingName);
    },

    /**
     * Iterates all of the settings to find one that matches the requested name
     */
    getDefaultByName: function (requestedName) {
        var settingGroups = preSettings;
        for (var groupName in settingGroups) {
            if (settingGroups.hasOwnProperty(groupName)) {
                var groupSettings = settingGroups[groupName].VALUES;
                for (var settingName in groupSettings) {
                    if (groupSettings.hasOwnProperty(settingName)) {
                        var groupSetting = groupSettings[settingName];
                        if (groupSetting.NAME === requestedName)
                            return groupSetting.DEFAULT_VAL;
                    }
                }
            }
        }
        return null;
    },

    /**
     * Set a setting from the UI because it doesnt have access to the settings json
     * @param settingName String setting name to set
     * @param value String setting value to set
     */
    setFromUi: function (settingName, value) {
        electronSettings.set(settingName, value);
    },

    /**
     * Set setting from its NAME field, value is a String
     */
    set: function (setting, value) {
        electronSettings.set(setting.NAME, value)
    },

    /**
     * @returns music service setting, either Google Play, Spotify, or Pandora
     */
    getMusicService: function () {
        return this.get(PLAYER_SETTINGS.MUSIC_SERVICE);
    },

    /**
     * sets music service setting, either Google Play, Spotify, or Pandora
     */
    setMusicService: function (musicService) {
        this.set(PLAYER_SETTINGS.MUSIC_SERVICE, musicService);
    },

    getWindowPosition: function () {
        return this.get(WINDOW_SETTINGS.POSITION);
    },

    setWindowPosition: function (position) {
        this.set(WINDOW_SETTINGS.POSITION, position);
    },

    getWindowHeight: function () {
        return this.get(WINDOW_SETTINGS.WINDOW_HEIGHT);
    },

    setWindowHeight: function (height) {
        return this.set(WINDOW_SETTINGS.WINDOW_HEIGHT, height);
    },

    getWindowWidth: function () {
        return this.get(WINDOW_SETTINGS.WINDOW_WIDTH);
    },

    setWindowWidth: function (width) {
        return this.set(WINDOW_SETTINGS.WINDOW_WIDTH, width);
    },

    getTheme: function () {
        return this.get(PLAYER_SETTINGS.THEME);
    },

    setTheme: function (newTheme) {
        this.set(PLAYER_SETTINGS.THEME, newTheme);
    },

    getShowMenuPlayPause: function () {
        return this.get(MENU_SETTINGS.SHOW_PLAY_PAUSE) === "true";
    },

    setMenuShowPlayPause: function (show) {
        this.set(MENU_SETTINGS.SHOW_PLAY_PAUSE, show);
    },

    getShowMenuNext: function () {
        return this.get(MENU_SETTINGS.SHOW_NEXT_TRACK) === "true";
    },

    setMenuShowNext: function (show) {
        this.set(MENU_SETTINGS.SHOW_NEXT_TRACK, show);
    },

    getShowMenuPrevious: function () {
        return this.get(MENU_SETTINGS.SHOW_PREVIOUS_TRACK) === "true";
    },

    setMenuShowPrevious: function (show) {
        this.set(MENU_SETTINGS.SHOW_PREVIOUS_TRACK, show);
    },

    getShowHideWindowKey: function () {
        return this.get(HOT_KEY_SETTINGS.SHOW_HIDE_PLAYER) || this.getShowHideWindowKey();
    },

    setShowHideWindowKey: function (newKey) {
        this.set(HOT_KEY_SETTINGS.SHOW_HIDE_PLAYER, newKey);
    },

    getMediaNextKey: function () {
        return this.get(HOT_KEY_SETTINGS.MEDIA_NEXT) || this.getDefaultMediaNextKey();
    },

    setMediaNextKey: function (newKey) {
        this.set(HOT_KEY_SETTINGS.MEDIA_NEXT, newKey);
    },

    getMediaPreviousKey: function () {
        return this.get(HOT_KEY_SETTINGS.MEDIA_PREVIOUS) || this.getDefaultMediaPreviousKey();
    },

    setMediaPreviousKey: function (newKey) {
        this.set(HOT_KEY_SETTINGS.MEDIA_PREVIOUS, newKey);
    },

    getMediaPlayPauseKey: function () {
        return this.get(HOT_KEY_SETTINGS.MEDIA_PLAY_PAUSE) || this.getDefaultMediaPlayPauseKey();
    },

    setMediaPlayPauseKey: function (newKey) {
        this.set(HOT_KEY_SETTINGS.MEDIA_PLAY_PAUSE, newKey);
    },

    getAlwaysOnTop: function () {
        var alwaysOnTop = this.get(WINDOW_SETTINGS.ALWAYS_ON_TOP) || this.getDefaultAlwaysOnTop();
        return alwaysOnTop === "true";
    },

    setAlwaysOnTop: function (newKey) {
        this.set(WINDOW_SETTINGS.ALWAYS_ON_TOP, newKey);
    },

    getAutoHide: function () {
        var autoHide = this.get(WINDOW_SETTINGS.AUTO_HIDE) || this.getDefaultAutoHide();
        return autoHide === "true";
    },

    setAutoHide: function (autoHide) {
        this.set(WINDOW_SETTINGS.AUTO_HIDE, autoHide);
    },

    getShowMenuIcons: function () {
        var showIcons = this.get(MENU_SETTINGS.SHOW_MENU_ICONS) || this.getDefaultShowMenuIcons();
        return showIcons === "true";
    },

    setShowMenuIcons: function (showIcons) {
        this.set(MENU_SETTINGS.SHOW_MENU_ICONS, showIcons);
    },

    /**
     * Returns defined tray icon settings and theme
     */
    getTrayIconConfiguration: function () {
        var isWindows = process.platform === 'win32';
        var theme = this.getTheme();

        function getTrayIcon(fileType) {
            return path.join(__dirname, '../resources/images/' + 'gmusic-' + theme + '-indicator.' + fileType);
        }
        return isWindows ? getTrayIcon('ico') : getTrayIcon('png');
    },

    getDefaultAlwaysOnTop: function () {
        return getDefault(WINDOW_SETTINGS.ALWAYS_ON_TOP);
    },

    getDefaultAutoHide: function () {
        return getDefault(WINDOW_SETTINGS.AUTO_HIDE);
    },

    getDefaultShowMenuIcons: function () {
        return getDefault(MENU_SETTINGS.SHOW_MENU_ICONS);
    },

    getDefaultWindowHeight: function () {
        return getDefault(WINDOW_SETTINGS.WINDOW_HEIGHT);
    },

    getDefaultWindowWidth: function () {
        return getDefault(WINDOW_SETTINGS.WINDOW_WIDTH);
    },

    getDefaultWindowPosition: function () {
        return getDefault(WINDOW_SETTINGS.POSITION);
    },

    getDefaultMusicService: function () {
        return getDefault(PLAYER_SETTINGS.MUSIC_SERVICE);
    },

    getDefaultTheme: function () {
        return getDefault(PLAYER_SETTINGS.THEME);
    },

    getDefaultShowHidePlayerKey: function () {
        return getDefault(HOT_KEY_SETTINGS.SHOW_HIDE_PLAYER);
    },

    getDefaultMediaPlayPauseKey: function () {
        return getDefault(HOT_KEY_SETTINGS.MEDIA_PLAY_PAUSE);
    },

    getDefaultMediaNextKey: function () {
        return getDefault(HOT_KEY_SETTINGS.MEDIA_NEXT);
    },

    getDefaultMediaPreviousKey: function () {
        return getDefault(HOT_KEY_SETTINGS.MEDIA_PREVIOUS);
    }
};