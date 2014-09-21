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

            var $playBtn = $elem.find(".play");

            $scope.volumeLevel = 80;
            $scope.bpm = 120;

            $playBtn.click(function() {
                $rootScope.playbackEngine.play( $rootScope.track.notes, $scope.bpm, $scope.volumeLevel/100 );
            });

           var $tempoInput = $elem.find(".tempo");
           $tempoInput.numeric(); // prevent non-numeric values from being input
        }
    }
};

pianoRollApp.directive("transport", transportDirective);
