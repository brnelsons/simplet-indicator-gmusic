/**
 * Created by Nelson on 3/16/2016.
 */
const settings = require('./res/modules/setting-module.js').settings();
const ipcRenderer = require('electron').ipcRenderer;
var path = require('path');

const POS = 'position';
const THEME = 'theme';
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

    function loadPositionSettings() {
        var position = settings.get(POS);
        if (position == 'center') {
            updateButtons('false', 'trayPosition');
            updateButtons('Center', 'positionVertical');
            updateButtons('Center', 'positionHorizontal');
        } else {
            var trayFixActive = position.match("^tray") != null;
            updateButtons(trayFixActive, 'trayPosition');
            checkHideVPosition(trayFixActive);

            if (position.toLowerCase().match(/bottom/g)) {
                updateButtons('Bottom', 'positionVertical');
            } else if (position.toLowerCase().match(/top/g)) {
                updateButtons('Top', 'positionVertical');
            } else {
                updateButtons('Center', 'positionVertical');
            }
            if (position.toLowerCase().match(/left/g)) {
                updateButtons('Left', 'positionHorizontal');
            } else if (position.toLowerCase().match(/right/g)) {
                updateButtons('Right', 'positionHorizontal');
            } else {
                updateButtons('Center', 'positionHorizontal');
            }
        }
    }

    function loadThemeSettings() {
        var theme = settings.get(THEME);
        loadThemeSetting(theme)
    }

    loadPositionSettings();
    loadThemeSettings();
});

function closeSettingsWindow(){
    setTimeout(function(){
        ipcRenderer.send('close-settings');
    }, 500);
}

function saveAll() {
    var tray = $('button[name=trayPosition].active', '#settingsForm').val();
    var vPosition = $('button[name=positionVertical].active', '#settingsForm').val();
    var hPosition = $('button[name=positionHorizontal].active', '#settingsForm').val();
    var theme = $('button[name=theme].active', '#settingsForm').val();

    settings.set(THEME, theme);

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
    settings.set(POS, position);
    closeSettingsWindow()
}
