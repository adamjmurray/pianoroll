var noteDirective = function($compile, $rootScope, $timeout) {
    return {
        restrict: "EA",
        replace: false,
        scope: {
            data: "="
        },
        templateUrl: "/src/note/note.html",

        link: function($scope, $elem) {

            // TODO: dragging the note around should update the model
            var $noteDiv = $elem.children().first();
            $noteDiv.draggable({ containment: "#midi_editor", distance: 10, grid: [1, 30], stop: onDrag});
            $noteDiv.resizable({ containment: "#midi_editor", handles: "e", stop: onResize});

            function onDrag(event, ui) {
                var totalHeight = $("#layout").height();

                var beat = ui.position.left/$rootScope.noteWidth;
                var midiNote = parseInt((((totalHeight - ui.position.top) / 30) -1));
                var pitchData = midiToNote(midiNote);
                $scope.data.beat = beat;
                $scope.data.pitch = pitchData[0];
                $scope.data.octave = pitchData[1]+1;
                $scope.data.midiValue = midiNote;

                $elem.attr("title", $scope.data.pitch+$scope.data.octave);
            }

            $scope.getPosition = function() {
                var beat = $scope.data.beat;
                var pitch = $scope.data.pitch;
                var octave = $scope.data.octave;
                var velocity = $scope.data.velocity;
                var duration = $scope.data.duration;


                var octaveContainer = $("#layout .octave:nth-child("+($rootScope.numOctaves - octave)+")");
                var pitchRow = octaveContainer.find("[data-pitch='"+pitch+"']");

                // TODO: use velocity to change the color of the element

                var noteWidth = duration * $rootScope.noteWidth;
                var noteHeight = pitchRow.height(); // and some way of knowing the height of a "pitch row" in the piano roll
                var x = $rootScope.noteWidth * beat;
                var y = pitchRow.position().top;

                return {
                    left: x + "px",
                    top: y + "px",
                    width: noteWidth + "px",
                    height: noteHeight + "px"
                }
            };

            function onResize(event, ui) {

                var duration = ui.size.width / $rootScope.noteWidth;
                $scope.data.duration = duration;
            }
        }

    }
};

pianoRollApp.directive("note", noteDirective);