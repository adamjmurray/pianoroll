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
                $rootScope.playbackEngine.play( $rootScope.track.notes );
            });
        }

    }
};

pianoRollApp.directive("transport", transportDirective);
