angular
    .module('app', ['ngMaterial'])
    .config(function($mdThemingProvider, $compileProvider){
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('orange');

        $compileProvider.debugInfoEnabled(false);
    });

angular.module('app').component('upNext', {
        template: `<span class="__upnext-text">
                    Weird shit that looks cool, and more...
                    </span>`,
        controller: function () {
            this.$onInit = function () {
                window.addEventListener("message", receiveMessage, false);
                console.log("is subscribed...");
            };

            function receiveMessage(event) {
                if (event.data && event.data.type === "upNext") {
                    document.querySelector(".__upnext-text").innerHTML = event.data.text;    
                }
            }

            this.text = "";
        }
    }
);

angular.module('app').component('deadline', {
        template: `<span class="__deadline-time"></span>`,
        controller: function () {
            const updateMS = 1000;
            var deadline = new Date("2016-04-10T14:00:00.0200"); // danish local time
            var handle;
            var elem;

            this.$onInit = function () {
                elem = document.querySelector(".__deadline-time");
                onInterval();
                handle = setInterval(onInterval, updateMS);

                window.addEventListener("message", receiveMessage, false);
            };

            function receiveMessage(event) {
                if (event.data && event.data.type === "deadline") {
                    deadline = event.data.date;
                }
            }

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

angular.module('app').component('attention', {
        template: `<span class="__attention"></span>`,
        controller: function () {
            this.$onInit = function () {
                window.addEventListener("message", receiveMessage, false);
            };
            function receiveMessage(event) {
                if (event.data.type === "attention") {
                    var text = event.data.text;
                    var elem = document.querySelector(".__attention");
                    elem.innerHTML = text;
                }
            }

        }
    }
);