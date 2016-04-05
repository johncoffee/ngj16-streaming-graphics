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
        <input ng-model="upNext">   
        <button class="md-button" ng-click="$ctrl.upNext = upNext">Apply</button>
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

angular.module('app').component('attention', {
        template: `<div layout="row">
    <div flex="30">
        Attention   
    </div>
    <div flex="70">
        <input ng-model="attention" size="45">
        <button class="md-button" ng-click="$ctrl.attention = attention">Apply</button>
    </div>
</div>`,
        controller: function (Storage) {
            Object.defineProperty(this, 'attention', {
                get: function () {
                    return localStorage.attention;
                },
                set: function (value) {
                    localStorage.attention = value;
                    if (Storage.sceneRef) {
                        Storage.sceneRef.postMessage({
                            type: "attention",
                            text: this.attention
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

angular.module('app').component('deadline', {
        template: `<div layout="row">
    <div flex="30">
        Deadline    
    </div>
    <div flex="70">
        <input type="text" ng-model="deadline" size="30">
        <button class="md-button" ng-click="$ctrl.deadline = deadline">Apply</button><br>
        <code>2016-04-02T14:00:00.0200</code>    
    </div>
</div>`,
        controller: function (Storage) {
            const defaultDate = "2016-04-10T14:00:00.0200";

            Object.defineProperty(this, 'deadline', {
                get: function () {
                    return localStorage.deadline;
                },
                set: function (value) {
                    localStorage.deadline = value;

                    var dateObj = new Date(value);
                    if (!isNaN(dateObj.getTime())) {
                        if (Storage.sceneRef) {
                            Storage.sceneRef.postMessage({
                                type: "deadline",
                                date: dateObj,
                            }, location + 'scene1.html');
                        }
                        else {
                            console.info("deadline sending: scene not open?");
                        }
                    }
                }
            })
        }
    }
);


// Storage
angular.module('app').service('Storage', function () {

        function Storage() {
            this.sceneRef = null;
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
                if (!Storage.sceneRef) {
                    Storage.sceneRef = $window.open('scene1.html', '_blank', 'width=1280,height=720,target=_blank');
                }
                else {
                    Storage.sceneRef.focus();
                }
            }
        }
    }
);


angular.module('app').component('pause', {
        template: `<div layout="row">
    <div flex="30">
        Show pause picture   
    </div>
    <div flex="70">
        <input ng-model="$ctrl.pause" type="checkbox">    
    </div>
</div>`,
        controller: function (Storage) {
            Object.defineProperty(this, 'pause', {
                get: function () {
                    return (localStorage.pause == 1);
                },
                set: function (value) {
                    localStorage.pause = (value == 1) ? '1' : '';
                    if (Storage.sceneRef) {
                        Storage.sceneRef.postMessage({
                            type: "pause",
                            pause: !!value
                        }, location + 'scene1.html');
                    }
                    else {
                        console.info("window not open. pause");
                    }
                }
            })
        }
    }
);