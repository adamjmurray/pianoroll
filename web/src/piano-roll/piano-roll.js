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

            $scope.addNote = function(measure, beatNum, key, octave) {
                var beat = measure * $scope.beatsPerMeasure + beatNum;
                var pitch = noteToMidi(key.name, octave);

                if (!$rootScope.midiData[0][beat]) {
                    $rootScope.midiData[0][beat] = [];
                }
                $rootScope.midiData[0][beat] = $rootScope.midiData[0][beat].concat(
                    {
                        "type": "note",
                        "pitch": pitch,
                        "velocity": 100,
                        "duration": 1,
                        "channel": 1
                    });
            };

            $scope.zoomLevel = 100;
            $scope.noteStyle = {
                width: 40 + "px"
            };
            $rootScope.noteWidth = 40;

            $scope.$watch("zoomLevel", function() {
                var editorWidth = $("#midi_editor").width();
                var newRowWidth = editorWidth * ($scope.zoomLevel / 100);
                var numBeats = $scope.numMeasures * $scope.beatsPerMeasure;
                var noteWidth = newRowWidth / numBeats;
                $scope.noteStyle.width = noteWidth + "px";
                $rootScope.noteWidth = noteWidth;
            });

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
                            "channel": 1,
                            "beat": 5.5
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

            $rootScope.track = Track($rootScope.midiData[0]);
            console.log($rootScope.track);
            $scope.beatsPerMeasure = $rootScope.track.timeSignature[0];
            $scope.numMeasures = 4;
            $rootScope.numOctaves = 11;

            $scope.keys = [];
            for (var i=_NOTE_COUNT-1; i >= 0; i--) {
                var name = _NOTE_NAMES[i];

                $scope.keys.push({
                    name: name,
                    keyClass: (function(){
                        return spellOut(name)+" key";
                    })(),
                    rowClass: (function(){
                        return spellOut(name)+" row";
                    })()
                });
            }

            $scope.getNumber = function (num) {
                var array = [];
                for (var i=0; i < num; i++) {
                    array[i] = i;
                }
                return array;
            };
        }


    }
};

pianoRollApp.directive("pianoRoll", pianoRollDirective);
