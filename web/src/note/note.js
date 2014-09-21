var noteDirective = function($compile, $rootScope, $timeout) {
    return {
        restrict: "EA",
        replace: false,
        scope: {
            beat: "=",
            data: "="
        },
        templateUrl: "/src/note/note.html",

        link: function($scope, $elem) {

            // TODO: dragging the note around should update the model
            var $noteDiv = $elem.children().first();
            $noteDiv.draggable({ containment: "#midi_editor", distance: 10, grid: [1, 30] });
            $noteDiv.resizable({ containment: "#midi_editor", handles: "e" });

            $scope.getPosition = function() {
                var beatIndex = $scope.beat;
                var pitch = $scope.data.pitch;
                var velocity = $scope.data.velocity;
                var duration = $scope.data.duration;

                // TODO: once octaves are implemented in the html, filter by octave as well
                var pitchRow = $("#layout ."+pitch);

                // Assumes beats in the layout are 1/4 notes
                var wholeNoteWidth = $("#layout .measure:first").width();

                // TODO: use velocity to change the color of the element

                var noteWidth = duration * wholeNoteWidth;
                var noteHeight = pitchRow.height(); // and some way of knowing the height of a "pitch row" in the piano roll
                var x = 0; // TODO: calculate x position from the beat
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