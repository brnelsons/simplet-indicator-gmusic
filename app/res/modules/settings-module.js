module.exports = {
    PLAYER_SETTINGS: {
        NAME: 'Player Settings',
        VALUES: {
            MUSIC_SERVICE: {
                ORDER: 0,
                NAME: 'musicService',
                DESC: '',
                DISPLAY_NAME: 'Music Service',
                DEFAULT_VAL: 'https://play.google.com/music/listen#/now',
                OPTIONS: [
                    ['gmusic', 'https://play.google.com/music/listen#/now'],
                    ['pandora', 'https://www.pandora.com'],
                    ['spotify', 'https://play.spotify.com/browse']
                ]
            },
            THEME: {
                ORDER: 1,
                NAME: 'theme',
                DISPLAY_NAME: 'Icon Theme',
                DESC: '',
                DEFAULT_VAL: 'light',
                OPTIONS: ['dark', 'light']
            }
        }
    },

    WINDOW_SETTINGS:{
        DISPLAY_NAME: 'Window Settings',
        VALUES: {
            ALWAYS_ON_TOP: {
                ORDER: 0,
                NAME: 'alwaysOnTop',
                DISPLAY_NAME: 'Static Window',
                DESC: '',
                DEFAULT_VAL: 'false',
                OPTIONS: ['true', 'false']
            },
            POSITION: {
                ORDER: 1,
                NAME: 'position',
                DISPLAY_NAME: 'Position',
                DESC: '',
                DEFAULT_VAL: (process.platform === 'win32') ? 'trayBottomCenter' : 'topCenter',
                OPTIONS: [
                    'topLeft',
                    'topCenter',
                    'topRight',
                    'centerLeft',
                    'center',
                    'centerRight',
                    'bottomLeft',
                    'bottomCenter',
                    'bottomRight',
                    'trayLeft',
                    'trayCenter',
                    'trayRight',
                    'trayBottomLeft',
                    'trayBottomCenter',
                    'trayBottomRight'
                ]
            },
            WINDOW_WIDTH: {
                ORDER: 2,
                NAME: 'windowWidth',
                DISPLAY_NAME: 'Player Width',
                DESC: '',
                DEFAULT_VAL: '975'
            },
            WINDOW_HEIGHT: {
                ORDER: 3,
                NAME: 'windowHeight',
                DISPLAY_NAME: 'Player Height',
                DESC: '',
                DEFAULT_VAL: '500'
            }
        }
    },

    HOT_KEYS: {
        DISPLAY_NAME: "Keyboard HotKeys",
        VALUES: {
            MEDIA_PLAY_PAUSE: {
                ORDER: 0,
                NAME: 'mediaPlayPauseKey',
                DISPLAY_NAME: 'Play/Pause',
                DESC: '',
                DEFAULT_VAL: 'MediaPlayPause'
            },
            MEDIA_NEXT: {
                ORDER: 1,
                NAME: 'mediaNextKey',
                DISPLAY_NAME: 'Next Track',
                DESC: '',
                DEFAULT_VAL: 'MediaNextTrack'
            },
            MEDIA_PREVIOUS: {
                ORDER: 2,
                NAME: 'mediaPreviousKey',
                DISPLAY_NAME: 'Previous Track',
                DESC: '',
                DEFAULT_VAL: 'MediaPreviousTrack'
            },
            SHOW_HIDE_PLAYER: {
                ORDER: 3,
                NAME: 'showHidePlayerKey',
                DISPLAY_NAME: 'Show/Hide Player',
                DESC: '',
                DEFAULT_VAL: 'ctrl+home'
            }
        }
    }
};