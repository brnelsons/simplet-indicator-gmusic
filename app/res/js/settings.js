/**
 * Created by Nelson on 3/16/2016.
 */
const settingsModule = require('./res/modules/setting-util-module.js');
const ipcRenderer = require('electron').ipcRenderer;
var path = require('path');

const serviceDictionary = {
    'gmusic': 'https://play.google.com/music/listen#/now',
    'pandora': 'https://www.pandora.com',
    'spotify': 'https://play.spotify.com/browse'
};
const serviceDictionaryLookup = {
    'https://play.google.com/music/listen#/now': 'gmusic',
     'https://www.pandora.com': 'pandora',
     'https://play.spotify.com/browse': 'spotify'
};

function loadThemeSetting(theme) {
    if (theme == 'light') {
        updateButtons('light', 'theme');
    } else {
        updateButtons('dark', 'theme');
    }
}

function deactivateButtons(buttons){
    buttons.removeClass('active');
}

function updateButtons(activeButton, btnGroupName) {
    deactivateButtons($('button[type=button][name='+btnGroupName+']'));
    $($('button[type=button][name="'+btnGroupName+'"][value="'+activeButton+'"]')).addClass('active');
}

function checkHideVPosition() {
    var tray = $('button[type=button][name=trayPosition].active', '#settingsForm').val();
    if (tray == 'false') {
        $('#vert-position-div', '#settingsForm').show();
    } else {
        $('#vert-position-div', '#settingsForm').hide();
    }
}
$(document).ready(function loadAll() {

    $('button[type=button][name="trayPosition"]').click(function () {
        updateButtons($(this).val(), 'trayPosition');
        checkHideVPosition();
    });

    $('button[type=button][name="theme"]').click(function () {
        var theme = $(this).val();
        loadThemeSetting(theme);
    });

    $('button[type=button][name="positionVertical"]').click(function () {
        updateButtons($(this).val(), 'positionVertical');
    });

    $('button[type=button][name="positionHorizontal"]').click(function () {
        updateButtons($(this).val(), 'positionHorizontal');
    });

    $('button[type=button][name="musicService"]').click(function () {
        updateButtons($(this).val(), 'musicService');
    });

    function loadPositionSettings() {
        var position = settingsModule.getWindowPosition();
        var POS_VERT = settingsModule.POSITION_VERTICAL;
        var POS_HOR = settingsModule.POSITION_HORIZONTAL;

        if (position == 'center') {
            updateButtons('false', 'trayPosition');
            updateButtons('Center', POS_VERT);

            updateButtons('Center', POS_HOR);
        } else {
            var trayFixActive = position.match("^tray") != null;
            updateButtons(trayFixActive, 'trayPosition');
            checkHideVPosition(trayFixActive);

            if (position.toLowerCase().match(/bottom/g)) {
                updateButtons('Bottom', POS_VERT);
            } else if (position.toLowerCase().match(/top/g)) {
                updateButtons('Top', POS_VERT);
            } else {
                updateButtons('Center', POS_VERT);
            }
            if (position.toLowerCase().match(/left/g)) {
                updateButtons('Left', POS_HOR);
            } else if (position.toLowerCase().match(/right/g)) {
                updateButtons('Right', POS_HOR);
            } else {
                updateButtons('Center', POS_HOR);
            }
        }
    }

    function loadMusicServiceSetting(){
        var musicServiceUrl = settingsModule.getMusicService();
        updateButtons(serviceDictionaryLookup[musicServiceUrl], settingsModule.MUSIC_SERVICE)
    }

    function loadThemeSettings() {
        loadThemeSetting(settingsModule.getTheme());
    }

    loadPositionSettings();
    loadThemeSettings();
    loadMusicServiceSetting();
});

function closeSettingsWindow(){
    setTimeout(function(){
        ipcRenderer.send('close-settings');
    }, 500);
}

function saveAll() {
    const SETTINGS_FORM = '#settingsForm';

    function saveWindowPosition() {
        var tray = $('button[name=trayPosition].active', SETTINGS_FORM).val();
        var vPosition = $('button[name=positionVertical].active', SETTINGS_FORM).val();
        var hPosition = $('button[name=positionHorizontal].active', SETTINGS_FORM).val();
        var position = '';

        if (tray == 'false' && vPosition.toLowerCase() == 'center' && hPosition.toLowerCase() == 'center') {
            position = 'center'
        } else {
            if (tray == 'true') {
                position += 'tray';
                position += hPosition;
            } else {
                position += vPosition.toLowerCase();
                position += hPosition;
            }
        }
        settingsModule.setWindowPosition(position);
        settingsModule.setTheme($('button[name=theme].active', SETTINGS_FORM).val());
    }
    saveWindowPosition();

    var musicService = $('button[name=musicService].active', SETTINGS_FORM).val();
    settingsModule.setMusicService(serviceDictionary[musicService]);

    closeSettingsWindow()
}
