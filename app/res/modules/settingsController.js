var angular = require('angular');
var settingsModule = require('./settings-module');

var settingsApp = angular.module('settingsApp', []);
settingsApp.controller("settingsController", function($scope){
    $scope.settings = settingsModule.SETTINGS;
});