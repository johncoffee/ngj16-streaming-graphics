angular
    .module('app', ['ngMaterial'])
    .config(function($mdThemingProvider){
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red');
    });

angular.module('app').component('upNext', {
        template: `<div layout="row">
    <div flex="30">
        Up next   
    </div>
    <div flex="70">
        <input ng-model="$ctrl.upNext">    
    </div>
</div>`,
        controller: function (Storage) {
            Object.defineProperty(this, 'upNext', {
                get: function () {
                    return localStorage.upNext;
                },
                set: function (value) {
                    localStorage.upNext = value;
                }
            })
        }
    }
);