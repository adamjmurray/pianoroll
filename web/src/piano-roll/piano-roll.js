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
        link: function ($scope) {
            $rootScope.midiData = [
                {
                    "0": [
                        {
                            "type": "tempo",
                            "bpm": 120
                        },
                        {
                            "type": "time signature",
                            "numerator": 4,
                            "denominator": 4
                        },
                        {
                            "type": "note",
                            "pitch": 60,
                            "velocity": 95,
                            "duration": 1,
                            "channel": 1
                        }
                    ],
                    "1": [
                        {
                            "type": "note",
                            "pitch": 62,
                            "velocity": 95,
                            "duration": 1,
                            "channel": 1
                        }
                    ],
                    "2": [
                        {
                            "type": "note",
                            "pitch": 64,
                            "velocity": 95,
                            "duration": 1,
                            "channel": 1
                        }
                    ]
                }
            ];

            $scope.track = Track($rootScope.midiData[0]);

            $scope.beatsPerMeasure = $scope.track.timeSignature[0];
            $scope.numMeasures = 4;

            $scope.keys = [];
            for (var i=_NOTE_COUNT-1; i >= 0; i--) {
                var name = _NOTE_NAMES[i];

                $scope.keys.push({
                    name: name,
                    keyClass: (function(){
                        var str = name;
                        if (name.charAt(1) === '#') {
                            str += " sharp";
                        }

                        return str+" key";
                    })(),
                    rowClass: (function(){
                        var str = name;
                        if (name.charAt(1) === '#') {
                            str += " sharp";
                        }

                        return str+" row";
                    })()
                });
            }

            $scope.getNumber = function (num) {
                var array = [];
                for (var i=0; i < num; i++) {
                    array[i] = 1;
                }
                return array;
            };
        }


    }
};

pianoRollApp.directive("pianoRoll", pianoRollDirective);
