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


            $scope.beatsPerMeasure = 4;
            $scope.numMeasures = 4;



            $scope.getPosition = function () {
                var beatWidth = 56;
                var noteHeight = 30;

                return {
                    top: noteHeight * 5 + "px",
                    left: beatWidth * 5 + "px",
                    width: beatWidth + "px",
                    height: noteHeight + "px"
                }
            };

            $scope.midi = [
                {
                    "0": [
                        {
                            "type": "note",
                            "pitch": 60,
                            "velocity": 95,
                            "duration": 1,
                            "channel": 1
                        }
                    ],
                    "1.23214": [
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


            $scope.keys = [
                {
                    name: "B",
                    keyClass: "B key",
                    rowClass: "B row"
                },
                {
                    name: "A#",
                    keyClass: "A sharp key",
                    rowClass: "A sharp row"
                },
                {
                    name: "A",
                    keyClass: "A key",
                    rowClass: "A row"
                },
                {
                    name: "G#",
                    keyClass: "G sharp key",
                    rowClass: "G sharp row"
                },
                {
                    name: "G",
                    keyClass: "G key",
                    rowClass: "G row"
                },
                {
                    name: "F#",
                    keyClass: "F sharp key",
                    rowClass: "F sharp row"
                },
                {
                    name: "F",
                    keyClass: "F key",
                    rowClass: "F row"
                },
                {
                    name: "E",
                    keyClass: "E key",
                    rowClass: "E row"
                },
                {
                    name: "D#",
                    keyClass: "D sharp key",
                    rowClass: "D sharp row"
                },
                {
                    name: "D",
                    keyClass: "D key",
                    rowClass: "D row"
                },
                {
                    name: "C#",
                    keyClass: "C sharp key",
                    rowClass: "C sharp row"
                },
                {
                    name: "C",
                    keyClass: "C key",
                    rowClass: "C row"
                }
            ];
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
