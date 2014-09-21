var transportDirective = function($compile, $rootScope, $timeout) {
    return {
        restrict: "EA",
        replace: false,
        scope: {
        },
        templateUrl: "/src/transport/transport.html",

        link: function($scope, $elem) {


            $rootScope.midiData
        }

    }
};

pianoRollApp.directive("transport", transportDirective);
