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
                $rootScope.playbackEngine.play( $rootScope.track.notes, $rootScope.volume );
            });

            $scope.volumeLevel = 80;

            $scope.$watch("volumeLevel", function() {
                $rootScope.volume = $scope.volumeLevel/100; // volume goes from 0.0 to 1.0
            });


        }

    }
};

pianoRollApp.directive("transport", transportDirective);
