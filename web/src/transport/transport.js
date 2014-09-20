var transportDirective = function($compile, $rootScope, $timeout) {
    return {
        restrict: "EA",
        replace: false,
        scope: {
        },
        templateUrl: "/src/transport/transport.html",

        link: function($scope, $elem) {
            if(!$rootScope.playbackEngine) {
                $rootScope.playbackEngine = new SimpleSynthPlayer();
            }

            var $playBtn = $elem.find('.play');

            $playBtn.click(function() {
                // TODO: update to rootScope.track.beats
                $rootScope.playbackEngine.play( $rootScope.midiData );
            });
        }

    }
};

pianoRollApp.directive("transport", transportDirective);
