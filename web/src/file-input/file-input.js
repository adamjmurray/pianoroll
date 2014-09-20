
var fileInputDirective = function ($compile,
                                   $rootScope,
                                   $timeout) {
    return {
        restrict: "EA",
        replace: false,
        scope: {
            midiData: "="
        },
        templateUrl:"/src/file-input/file-input.html",
        link: function ($scope, element) {

            // Check for the various File API support.
            if ( !(window.File && window.FileReader && window.FileList && window.Blob) ) {
                alert('The File APIs are not fully supported in this browser.');
            }

            function handleFileSelect(evt) {
                evt.stopPropagation();
                evt.preventDefault();

                var files = evt.dataTransfer.files; // FileList object.
                var file = files[0];

                var output =
                    '<strong>' + escape(file.name) + '</strong> (' + (file.type || 'n/a') + ') - ' +
                    file.size + ' bytes, last modified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a');

                var midi = new MIDIFileReader(new Html5FileStream(file));

                midi.read(function() {
                    // Now we should have midi.tracks data structure we can use to populate our piano roll

                    console.log("Tracks:");
                    console.log(JSON.stringify(midi.tracks, null, 2));
                    console.log("MIDI format type: " + midi.formatType);
                    console.log("Number of tracks: " + midi.numTracks);
                    console.log("Time division: " + midi.timeDiv);

                    output += '<br/><br/><pre>' + JSON.stringify(midi.tracks, null, 2) + '</pre>';
                    //document.getElementById('list').innerHTML = output;
                    $rootScope.midiData = midi.tracks;
                });

            }

            function handleDragOver(evt) {
                evt.stopPropagation();
                evt.preventDefault();
                evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
            }

            // Setup the dnd listeners.
            var dropZone = $('#drop_zone')[0];
            dropZone.addEventListener('dragover', handleDragOver, false);
            dropZone.addEventListener('drop', handleFileSelect, false);

        }


    }
};

pianoRollApp.directive("fileInput", fileInputDirective);