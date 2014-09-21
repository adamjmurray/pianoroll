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
            $("body").keydown(function(event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                    $rootScope.PLAY();
                }
            });

            $scope.addNote = function(measure, beatNum, key, octave) {
                octave = ($rootScope.numOctaves - 1) - (octave);
                var beat = (measure) * $scope.beatsPerMeasure + beatNum;
                var midiValue = noteToMidi(key.name, octave);

                if (!$rootScope.midiData[0][beat]) {
                    $rootScope.midiData[0][beat] = [];
                }
                $rootScope.track.notes[$rootScope.track.notes.length] = {
                    "type": "note",
                    "beat": beat,
                    "pitch": key.name,
                    "midiValue": midiValue,
                    "velocity": 100,
                    "octave": octave,
                    "duration": 1,
                    "channel": 1
                };
            };

            $scope.horizontalZoomLevel = 100;
            $scope.noteStyle = {
                width: 40 + "px",
                height: 28 + "px"
            };
            $rootScope.noteWidth = 40;

            $scope.verticalZoomLevel = 100;

            $scope.rowStyle = {
                height: 30 + "px"
            };
            $rootScope.rowHeight = 30;

            $scope.$watch("horizontalZoomLevel", function() {
                if ($scope.horizontalZoomLevel) {
                    var editorWidth = $("#midi_editor").width();
                    var newRowWidth = editorWidth * ($scope.horizontalZoomLevel / 100);
                    var numBeats = $scope.numMeasures * $scope.beatsPerMeasure;
                    var noteWidth = newRowWidth / numBeats;
                    $scope.noteStyle.width = noteWidth + "px";
                    $rootScope.noteWidth = noteWidth;
                }
            });

            $scope.$watch("verticalZoomLevel", function() {
                if ($scope.verticalZoomLevel) {
                    var rowHeight = parseInt(($scope.verticalZoomLevel / 100) * 30);
                    $scope.rowStyle.height = rowHeight + "px";
                    $scope.noteStyle.height = (rowHeight - 2) + "px";
                    $rootScope.rowHeight = rowHeight;
                    $(".note").draggable("option", "grid", [1, rowHeight]);
                    if (!$rootScope.$$phase){
                        $rootScope.$digest();
                    }
                }
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

            $rootScope.$watch("midiData", function (newValue, oldValue){
               if (newValue != oldValue) {
                   $rootScope.track = Track($rootScope.midiData[0]);
               }
            });

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
