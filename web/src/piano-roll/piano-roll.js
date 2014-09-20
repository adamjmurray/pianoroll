var pianoRollDirective = function ($compile,
        $rootScope,
        $timeout) {
    return {
        restrict: "EA",
        replace: false,
        scope: {
            midiData: "="
        },
        templateUrl:"/src/piano-roll/piano-roll.html",
        link: function (scope) {
            //Do stuff here
        }
    };
};

pianoRollApp.directive("pianoRoll", pianoRollDirective);
