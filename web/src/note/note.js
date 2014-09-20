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
            $noteDiv.resizable({containment: "#midi_editor", handles: "e", stop: onResize});

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
                var beatIndex = $scope.data.beat;
                var pitch = $scope.data.pitch;
                var velocity = $scope.data.velocity;
                var duration = $scope.data.duration;

                // TODO: use velocity to change the color of the element

                var noteWidth = $rootScope.noteWidth; // TODO: we need some way of knowing the width of a beat in the UI
                var noteHeight = 30; // and some way of knowing the height of a "pitch row" in the piano roll
                var x = 0; // TODO: calculate x position from the beat
                var y = 0; // TODO: calculate y position from the pitch. I think setting bottom style to pitch * 30 will do it.

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
