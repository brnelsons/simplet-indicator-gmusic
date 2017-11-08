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

module.exports = function (basePath){
    var module = {};

    const electronSettings = new ElectronSettings({
        'configDirPath': path.join(basePath, "SimpletIndicatorGMusic", "userData"),
        'configFileName': 'userSettings'
    });

    function getDefault(setting) {
        electronSettings.set(setting.NAME, setting.DEFAULT_VAL);
        return setting.DEFAULT_VAL;
    }

    /**
     * Get a specified setting, must have field 'NAME'
     */
    module.get = function (setting) {
        return electronSettings.get(setting.NAME) || getDefault(setting);
    };

    /**
     * Get a specified setting, via String
     */
        module.getForUi = function (settingName) {
        return electronSettings.get(settingName) || this.getDefaultByName(settingName);
    };

    /**
     * Iterates all of the settings to find one that matches the requested name
     */
        module.getDefaultByName = function (requestedName) {
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
    };

    /**
     * Set a setting from the UI because it doesnt have access to the settings json
     * @param settingName String setting name to set
     * @param value String setting value to set
     */
    module.setFromUi = function (settingName, value) {
        electronSettings.set(settingName, value);
    };

    /**
     * Set setting from its NAME field, value is a String
     */
    module.set = function (setting, value) {
        electronSettings.set(setting.NAME, value)
    };

    /**
     * @returns music service setting, either Google Play, Spotify, or Pandora
     */
    module.getMusicService = function () {
        return this.get(PLAYER_SETTINGS.MUSIC_SERVICE);
    };

    /**
     * sets music service setting, either Google Play, Spotify, or Pandora
     */
    module.setMusicService = function (musicService) {
        this.set(PLAYER_SETTINGS.MUSIC_SERVICE, musicService);
    };

    module.getWindowPosition = function () {
        return this.get(WINDOW_SETTINGS.POSITION);
    };

    module.setWindowPosition = function (position) {
        this.set(WINDOW_SETTINGS.POSITION, position);
    };

    module.getWindowHeight = function () {
        return this.get(WINDOW_SETTINGS.WINDOW_HEIGHT);
    };

    module.setWindowHeight = function (height) {
        return this.set(WINDOW_SETTINGS.WINDOW_HEIGHT, height);
    };

    module.getWindowWidth = function () {
        return this.get(WINDOW_SETTINGS.WINDOW_WIDTH);
    };

    module.setWindowWidth = function (width) {
        return this.set(WINDOW_SETTINGS.WINDOW_WIDTH, width);
    };

    module.getTheme = function () {
        return this.get(PLAYER_SETTINGS.THEME);
    };

    module.setTheme = function (newTheme) {
        this.set(PLAYER_SETTINGS.THEME, newTheme);
    };

    module.getShowMenuPlayPause = function () {
        return this.get(MENU_SETTINGS.SHOW_PLAY_PAUSE) === "true";
    };

    module.setMenuShowPlayPause = function (show) {
        this.set(MENU_SETTINGS.SHOW_PLAY_PAUSE, show);
    };

    module.getShowMenuNext = function () {
        return this.get(MENU_SETTINGS.SHOW_NEXT_TRACK) === "true";
    };

    module.setMenuShowNext = function (show) {
        this.set(MENU_SETTINGS.SHOW_NEXT_TRACK, show);
    };

    module.getShowMenuPrevious = function () {
        return this.get(MENU_SETTINGS.SHOW_PREVIOUS_TRACK) === "true";
    };

    module.setMenuShowPrevious = function (show) {
        this.set(MENU_SETTINGS.SHOW_PREVIOUS_TRACK, show);
    };

    module.getShowHideWindowKey = function () {
        return this.get(HOT_KEY_SETTINGS.SHOW_HIDE_PLAYER) || this.getShowHideWindowKey();
    };

    module.setShowHideWindowKey = function (newKey) {
        this.set(HOT_KEY_SETTINGS.SHOW_HIDE_PLAYER, newKey);
    };

    module.getMediaNextKey = function () {
        return this.get(HOT_KEY_SETTINGS.MEDIA_NEXT) || this.getDefaultMediaNextKey();
    };

    module.setMediaNextKey = function (newKey) {
        this.set(HOT_KEY_SETTINGS.MEDIA_NEXT, newKey);
    };

    module.getMediaPreviousKey = function () {
        return this.get(HOT_KEY_SETTINGS.MEDIA_PREVIOUS) || this.getDefaultMediaPreviousKey();
    };

    module.setMediaPreviousKey = function (newKey) {
        this.set(HOT_KEY_SETTINGS.MEDIA_PREVIOUS, newKey);
    };

    module.getMediaPlayPauseKey = function () {
        return this.get(HOT_KEY_SETTINGS.MEDIA_PLAY_PAUSE) || this.getDefaultMediaPlayPauseKey();
    };

    module.setMediaPlayPauseKey = function (newKey) {
        this.set(HOT_KEY_SETTINGS.MEDIA_PLAY_PAUSE, newKey);
    };

    module.getAlwaysOnTop = function () {
        var alwaysOnTop = this.get(WINDOW_SETTINGS.ALWAYS_ON_TOP) || this.getDefaultAlwaysOnTop();
        return alwaysOnTop === "true";
    };

    module.setAlwaysOnTop = function (newKey) {
        this.set(WINDOW_SETTINGS.ALWAYS_ON_TOP, newKey);
    };

    module.getAutoHide = function () {
        var autoHide = this.get(WINDOW_SETTINGS.AUTO_HIDE) || this.getDefaultAutoHide();
        return autoHide === "true";
    };

    module.setAutoHide = function (autoHide) {
        this.set(WINDOW_SETTINGS.AUTO_HIDE, autoHide);
    };

    module.getShowMenuIcons = function () {
        var showIcons = this.get(MENU_SETTINGS.SHOW_MENU_ICONS) || this.getDefaultShowMenuIcons();
        return showIcons === "true";
    };

    module.setShowMenuIcons = function (showIcons) {
        this.set(MENU_SETTINGS.SHOW_MENU_ICONS, showIcons);
    };

    /**
     * Returns defined tray icon settings and theme
     */
    module.getTrayIconConfiguration = function () {
        var isWindows = process.platform === 'win32';
        var theme = this.getTheme();

        function getTrayIcon(fileType) {
            return path.join(__dirname, '../resources/images/' + 'gmusic-' + theme + '-indicator.' + fileType);
        }
        return isWindows ? getTrayIcon('ico') : getTrayIcon('png');
    };

    module.getDefaultAlwaysOnTop = function () {
        return getDefault(WINDOW_SETTINGS.ALWAYS_ON_TOP);
    };

    module.getDefaultAutoHide = function () {
        return getDefault(WINDOW_SETTINGS.AUTO_HIDE);
    };

    module.getDefaultShowMenuIcons = function () {
        return getDefault(MENU_SETTINGS.SHOW_MENU_ICONS);
    };

    module.getDefaultWindowHeight = function () {
        return getDefault(WINDOW_SETTINGS.WINDOW_HEIGHT);
    };

    module.getDefaultWindowWidth = function () {
        return getDefault(WINDOW_SETTINGS.WINDOW_WIDTH);
    };

    module.getDefaultWindowPosition = function () {
        return getDefault(WINDOW_SETTINGS.POSITION);
    };

    module.getDefaultMusicService = function () {
        return getDefault(PLAYER_SETTINGS.MUSIC_SERVICE);
    };

    module.getDefaultTheme = function () {
        return getDefault(PLAYER_SETTINGS.THEME);
    };

    module.getDefaultShowHidePlayerKey = function () {
        return getDefault(HOT_KEY_SETTINGS.SHOW_HIDE_PLAYER);
    };

    module.getDefaultMediaPlayPauseKey = function () {
        return getDefault(HOT_KEY_SETTINGS.MEDIA_PLAY_PAUSE);
    };

    module.getDefaultMediaNextKey = function () {
        return getDefault(HOT_KEY_SETTINGS.MEDIA_NEXT);
    };

    module.getDefaultMediaPreviousKey = function () {
        return getDefault(HOT_KEY_SETTINGS.MEDIA_PREVIOUS);
    };

    return module;
};