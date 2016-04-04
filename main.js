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
        <input ng-model="$ctrl.upNext" ng-model-options="{debounce: 3000}">    
    </div>
</div>`,
        controller: function (Storage) {
            Object.defineProperty(this, 'upNext', {
                get: function () {
                    return localStorage.upNext;
                },
                set: function (value) {
                    localStorage.upNext = value;
                    if (Storage.sceneRef) {
                        Storage.sceneRef.postMessage({
                            type: "upNext",
                            text: this.upNext,
                        }, location + 'scene1.html');
                    }
                    else {
                        console.info("scene not open?");
                    }
                }
            })
        }
    }
);

// Storage
angular.module('app').service('Storage', function () {

        function Storage() {
            this.ref = null;
        }


        return Storage;
    }
);

// open scene button
angular.module('app').component('openScene', {
        template: `<div layout="row">
    <div flex="30">
        Open the scene
    </div>
    <div flex="70">
        <button ng-click="$ctrl.open()" class="md-button md-primary">open!</button>       
    </div>
</div>`,
        controller: function (Storage, $window) {
            this.open = function () {
                var ref = $window.open('scene1.html', '_blank', 'width=1280,height=720,target=_blank');
                Storage.sceneRef = ref;
            }
        }
    }
);