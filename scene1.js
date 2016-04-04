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

angular.module('app').component('deadline', {
        template: `<span class="__deadline-time"></span>`,
        controller: function () {
            const updateMS = 1000;
            var deadline = moment(new Date("2016-04-10T12:30:00.000Z"));
            var handle;
            var elem;

            this.$onInit = function () {
                elem = document.querySelector(".__deadline-time");
                onInterval();
                handle = setInterval(onInterval, updateMS);
            };

            this.$onDestroy = function () {
                clearInterval(handle);
            };

            function onInterval() {
                const text = formatHoursMinutesSeconds(new Date(), deadline);
                elem.innerHTML = text;
            }

            function formatHoursMinutesSeconds(t0, t1) {
                var dur = moment.duration().add( t1 - t0, "millisecond");
                if (t1 > t0) {
                    var hours = Math.floor(dur.asHours());
                    if (hours < 10) {
                        hours = '0' + hours.toString();
                    }
                    var minutes = dur.minutes();
                    if (minutes < 10) {
                        minutes = '0' + minutes.toString();
                    }
                    var seconds = dur.seconds();
                    if (seconds < 10) {
                        seconds = '0' + seconds.toString();
                    }
                    return hours + ":" + minutes + ":" + seconds;
                }
                else {
                    clearInterval(handle);
                    return "00:00:00";
                }
            }
        }
    }
);

angular.module('app').component('sponsors', {
        template: `<div class="__sponsors" style="height: 11rem;
                    width: 100%;
                    background: transparent url(sponsors/IGDADKBanner.png) center center no-repeat;
                    background-size: contain
                    "></div>`,
        controller: function () {
            const updateMS = 5000;
            var handle;
            var elem;
            const images = [
                'sponsors/IGDADKBanner.png',
                'sponsors/DanskeSpil.png',
                'sponsors/Houdini_black_color.png',
                'sponsors/IOI_logotype_black_TM.png',
                'sponsors/NordicGame2016.png',
                'sponsors/SideFX_black_color.png',
                'sponsors/AAU_Line_Blue.png'
            ];
            var index = 0;

            this.$onInit = function () {
                elem = document.querySelector(".__sponsors");
                onInterval();
                handle = setInterval(onInterval, updateMS);
            };

            this.$onDestroy = function () {
                clearInterval(handle);
            };

            function onInterval() {
                if (index >= images.length) {
                    index = 0;
                }
                var file = images[index];
                elem.style.backgroundImage = `url("${file}")`;
                index += 1;
            }
        }
    }
);