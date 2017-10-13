
function getBooleanOptions(){
    return {
        TRUE: {
            NAME: 'true',
            VALUE: 'true',
            DISPLAY_NAME: 'True'
        },
        FALSE: {
            NAME: 'false',
            VALUE: 'false',
            DISPLAY_NAME: 'False'
        }
    }
}

module.exports = {
    SETTINGS: {
        PLAYER_SETTINGS: {
            DISPLAY_NAME: 'Player Settings',
            ORDER: 0,
            VALUES: {
                MUSIC_SERVICE: {
                    ORDER: 0,
                    NAME: 'musicService',
                    TYPE: 'BUTTONS',
                    DESC: '',
                    DISPLAY_NAME: 'Music Service',
                    DEFAULT_VAL: 'https://play.google.com/music/listen#/now',
                    OPTIONS: {
                        GMUSIC: {
                            NAME: 'gmusic',
                            VALUE: 'https://play.google.com/music/listen#/now',
                            DISPLAY_NAME: 'Google Music'
                        },
                        PANDORA: {
                            NAME: 'pandora',
                            VALUE: 'https://www.pandora.com',
                            DISPLAY_NAME: 'Pandora'
                        },
                        SPOTIFY: {
                            NAME: 'spotify',
                            VALUE: 'https://play.spotify.com/browse',
                            DISPLAY_NAME: 'Spotify'
                        }
                    }
                },
                THEME: {
                    ORDER: 1,
                    NAME: 'theme',
                    DISPLAY_NAME: 'Icon Theme',
                    TYPE: 'BUTTONS',
                    DESC: '',
                    DEFAULT_VAL: 'light',
                    OPTIONS: {
                        DARK: {
                            NAME: 'dark',
                            VALUE: 'dark',
                            DISPLAY_NAME: 'Dark'
                        },
                        LIGHT: {
                            NAME: 'light',
                            VALUE: 'light',
                            DISPLAY_NAME: 'Light'
                        }
                    }
                }
            }
        },

        WINDOW_SETTINGS: {
            DISPLAY_NAME: 'Window Settings',
            ORDER: 1,
            VALUES: {
                ALWAYS_ON_TOP: {
                    ORDER: 0,
                    NAME: 'alwaysOnTop',
                    DISPLAY_NAME: 'Always On Top',
                    TYPE: 'BUTTONS',
                    DESC: '',
                    DEFAULT_VAL: 'false',
                    OPTIONS: {
                        TRUE: {
                            NAME: 'true',
                            VALUE: 'true',
                            DISPLAY_NAME: 'True'
                        },
                        FALSE: {
                            NAME: 'false',
                            VALUE: 'false',
                            DISPLAY_NAME: 'False'
                        }
                    }
                },
                AUTO_HIDE: {
                    ORDER: 3,
                    NAME: 'autoHide',
                    DISPLAY_NAME: 'Auto Hide Window',
                    TYPE: 'BUTTONS',
                    DESC: '',
                    DEFAULT_VAL: 'true',
                    OPTIONS: {
                        TRUE: {
                            NAME: 'true',
                            VALUE: 'true',
                            DISPLAY_NAME: 'True'
                        },
                        FALSE: {
                            NAME: 'false',
                            VALUE: 'false',
                            DISPLAY_NAME: 'False'
                        }
                    }
                },
                POSITION: {
                    ORDER: 1,
                    NAME: 'position',
                    DISPLAY_NAME: 'Position',
                    TYPE: 'DROPDOWN',
                    DESC: '',
                    DEFAULT_VAL: (process.platform === 'win32') ? 'trayBottomCenter' : 'topCenter',
                    OPTIONS: {
                        TOP_LEFT: {
                            DISPLAY_NAME: 'Top Left',
                            VALUE: 'topLeft'
                        },
                        TOP_CENTER: {
                            DISPLAY_NAME: 'Top Center',
                            VALUE: 'topCenter'
                        },
                        TOP_RIGHT: {
                            DISPLAY_NAME: 'Top Right',
                            VALUE: 'topRight'
                        },
                        CENTER_LEFT: {
                            DISPLAY_NAME: 'Center Left',
                            VALUE: 'centerLeft'
                        },
                        CENTER: {
                            DISPLAY_NAME: 'Center',
                            VALUE: 'center'
                        },
                        CENTER_RIGHT: {
                            DISPLAY_NAME: 'Center Right',
                            VALUE: 'centerRight'
                        },
                        BOTTOM_LEFT: {
                            DISPLAY_NAME: 'Bottom Left',
                            VALUE: 'bottomLeft'
                        },
                        BOTTOM: {
                            DISPLAY_NAME: 'Bottom',
                            VALUE: 'bottom'
                        },
                        BOTTOM_RIGHT: {
                            DISPLAY_NAME: 'Bottom Right',
                            VALUE: 'bottomRight'
                        },
                        TRAY_LEFT: {
                            DISPLAY_NAME: 'Tray  Left',
                            VALUE: 'trayLeft'
                        },
                        TRAY_CENTER: {
                            DISPLAY_NAME: 'Tray Center',
                            VALUE: 'trayCenter'
                        },
                        TRAY_RIGHT: {
                            DISPLAY_NAME: 'Tray Right',
                            VALUE: 'trayRight'
                        },
                        TRAY_BOTTOM_LEFT: {
                            DISPLAY_NAME: 'Tray Bottom Left',
                            VALUE: 'trayBottomLeft'
                        },
                        TRAY_BOTTOM_CENTER: {
                            DISPLAY_NAME: 'Tray Bottom Center',
                            VALUE: 'trayBottomCenter'
                        },
                        TRAY_BOTTOM_RIGHT: {
                            DISPLAY_NAME: 'Tray Bottom Right',
                            VALUE: 'trayBottomRight'
                        }
                    }
                },
                WINDOW_WIDTH: {
                    ORDER: 2,
                    NAME: 'windowWidth',
                    DISPLAY_NAME: 'Player Window Width',
                    TYPE: 'NUMBER',
                    DESC: 'Width in Pixels',
                    DEFAULT_VAL: '975'
                },
                WINDOW_HEIGHT: {
                    ORDER: 3,
                    NAME: 'windowHeight',
                    DISPLAY_NAME: 'Player Window Height',
                    TYPE: 'NUMBER',
                    DESC: 'Height in Pixels',
                    DEFAULT_VAL: '500'
                }
            }
        },
        MENU_SETTINGS: {
            DISPLAY_NAME: 'Menu Settings',
            ORDER: 2,
            VALUES: {
                SHOW_PLAY_PAUSE: {
                    ORDER: 0,
                    NAME: 'showMenuPlayPause',
                    DISPLAY_NAME: 'Show \'Play/Pause\'',
                    TYPE: 'BUTTONS',
                    DESC: '',
                    DEFAULT_VAL: 'false',
                    OPTIONS: getBooleanOptions()
                },
                SHOW_NEXT_TRACK: {
                    ORDER: 1,
                    NAME: 'showMenuNextTrack',
                    DISPLAY_NAME: 'Show \'Next\'',
                    TYPE: 'BUTTONS',
                    DESC: '',
                    DEFAULT_VAL: 'false',
                    OPTIONS: getBooleanOptions()
                },
                SHOW_PREVIOUS_TRACK:{
                    ORDER: 2,
                    NAME: 'showMenuPreviousTrack',
                    DISPLAY_NAME: 'Show \'Previous\'',
                    TYPE: 'BUTTONS',
                    DESC: '',
                    DEFAULT_VAL: 'false',
                    OPTIONS: getBooleanOptions()
                },
                SHOW_MENU_ICONS:{
                    ORDER: 3,
                    NAME: 'showMenuIcons',
                    DISPLAY_NAME: 'Show Menu Icons',
                    TYPE: 'BUTTONS',
                    DESC: '',
                    DEFAULT_VAL: 'false',
                    OPTIONS: getBooleanOptions()
                }
            }
        },

        HOT_KEYS: {
            DISPLAY_NAME: "Keyboard HotKeys",
            ORDER: 3,
            VALUES: {
                MEDIA_PLAY_PAUSE: {
                    ORDER: 0,
                    NAME: 'mediaPlayPauseKey',
                    DISPLAY_NAME: 'Play/Pause',
                    TYPE: 'TEXT',
                    DESC: 'MediaPlayPause',
                    DEFAULT_VAL: 'MediaPlayPause'
                },
                MEDIA_NEXT: {
                    ORDER: 1,
                    NAME: 'mediaNextKey',
                    DISPLAY_NAME: 'Next Track',
                    TYPE: 'TEXT',
                    DESC: 'MediaNextTrack',
                    DEFAULT_VAL: 'MediaNextTrack'
                },
                MEDIA_PREVIOUS: {
                    ORDER: 2,
                    NAME: 'mediaPreviousKey',
                    DISPLAY_NAME: 'Previous Track',
                    TYPE: 'TEXT',
                    DESC: 'MediaPreviousTrack',
                    DEFAULT_VAL: 'MediaPreviousTrack'
                },
                SHOW_HIDE_PLAYER: {
                    ORDER: 3,
                    NAME: 'showHidePlayerKey',
                    DISPLAY_NAME: 'Show/Hide Player',
                    TYPE: 'TEXT',
                    DESC: 'ctrl+home',
                    DEFAULT_VAL: 'ctrl+home'
                }
            }
        }
    }
};