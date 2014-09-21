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
            $noteDiv.draggable({ containment: "#midi_editor", distance: 10, grid: [1, $rootScope.rowHeight], stop: onDrag});
            $noteDiv.resizable({ containment: "#midi_editor", handles: "e", stop: onResize});

            var getRow = function() {
                return $("#layout .row[title='"+$elem.attr("title")+"']");
            };

            $noteDiv.hover(function() {
                getRow().find(".measure").addClass("hover");
            },
            function () {
                getRow().find(".measure").removeClass("hover");
            });

            $noteDiv.click(function() {
                $(".note.selected").removeClass("selected");
                $noteDiv.addClass("selected");
            });
            $("#layout").click(function() {
                $noteDiv.removeClass("selected");
            });

            function onDrag(event, ui) {
                getRow().find(".measure").removeClass("hover");
                var totalHeight = $("#layout").height();

                var beat = ui.position.left/$rootScope.noteWidth;
                var midiNote = parseInt((((totalHeight - ui.position.top) / $rootScope.rowHeight) -1));
                var pitchData = midiToNote(midiNote);
                $scope.data.beat = beat;
                $scope.data.pitch = pitchData[0];
                $scope.data.octave = pitchData[1] + 1;
                $scope.data.midiValue = midiNote + 12;

                $elem.attr("title", $scope.data.pitch+$scope.data.octave);
            }

            $scope.deleteNote = function () {
                for (var i=0; i<$rootScope.track.notes.length; i++) {
                    if ($rootScope.track.notes[i] == $scope.data) {
                        $rootScope.track.notes.splice(i, 1);
                    }
                }
            };

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
                var noteHeight = $rootScope.rowHeight; // and some way of knowing the height of a "pitch row" in the piano roll
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