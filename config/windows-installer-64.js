const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');

getInstallerConfig()
    .set("wine")
    .then(createWindowsInstaller)
    .catch(function (error) {
        console.error(error.message || error);
        process.exit(1);
    });

function getInstallerConfig() {
    console.log('creating windows installer');
    const rootPath = path.join('./');
    const buildPath = path.join(rootPath, 'dist/build');
    const outPath = path.join(rootPath, 'dist/installers');

    return Promise.resolve({
        appDirectory: path.join(buildPath, 'GMusic-win32-x64'),
        authors: 'Brian Nelson',
        noMsi: true,
        outputDirectory: path.join(outPath, 'windows-installer'),
        exe: 'simplet-indicator-gmusic.exe',
        setupExe: 'InstallGmusic64.exe',
        setupIcon: path.join(rootPath, 'src', 'resources', 'images', 'gmusic_dark_desktop.ico')
    })
}