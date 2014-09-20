var noteDirective = function ($compile,
                                   $rootScope,
                                   $timeout) {
  return {
    restrict: "EA",
    replace: false,
    scope: {
      beat: "=",
      data: "="
    },
    templateUrl:"/src/note/note.html",

    link: function ($scope, $elem) {

      // TODO: dragging the note around should update the model
      $elem.children().first().draggable({ containment: '#midi_editor', distance: 10, grid: [1, 30] });

      $scope.getPosition = function () {
        var beatIndex = $scope.beat;
        var pitch = $scope.data.pitch;
        var duration = $scope.data.duration;

        var noteWidth = duration * 100; // TODO: we need some way of knowing the width of a beat in the UI
        var noteHeight = 30; // and some way of knowing the height of a "pitch row" in the piano roll
        var x = 0; // TODO: calculate x position from the beat
        var y = 0; // TODO: calculate y position from the pitch

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
