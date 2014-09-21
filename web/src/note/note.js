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
                console.log(ui);
//
//                ui.position
//                var beat = 1;
                //$scope.data.beat = beat;
                //$scope.data.
            }

            function onResize(event, ui) {

            }

            $scope.getPosition = function() {
                var beat = $scope.data.beat;
                var pitch = $scope.data.pitch;
                var octave = $scope.data.octave;
                var velocity = $scope.data.velocity;
                var duration = $scope.data.duration;


                var octaveContainer = $("#layout .octave:nth-last-child("+octave+")");
                var pitchRow = octaveContainer.find("[title='"+pitch+"']");

                // Assumes beats in the layout are 1/4 notes
                var wholeNoteWidth = $("#layout .measure:first").width();

                var beatPosition = beat / $rootScope.track.measureDuration;

                // TODO: use velocity to change the color of the element

                var noteWidth = duration * wholeNoteWidth;
                var noteHeight = pitchRow.height(); // and some way of knowing the height of a "pitch row" in the piano roll
                var x = wholeNoteWidth * beatPosition;
                var y = pitchRow.position().top;

                return {
                    left: x + "px",
                    top: y + "px",
                    width: noteWidth + "px",
                    height: noteHeight + "px"
                }
            };
        }

    }
};

pianoRollApp.directive("note", noteDirective);