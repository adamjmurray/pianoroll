"use strict";

// Does not support tempo/time-signature changes (yet)
var Track = function (midiTrackData) {
    var _track = {
        beats: [],
        bpm: 120,
        timeSignature: [4,4]
    };

    for (var i in midiTrackData) {
        var beatData = midiTrackData[i];

        var beat = [];
        for (var j=0; j < beatData.length; j++) {
            var noteData = beatData[j];

            if (noteData.type === "note") {
                beat.push(new Note(noteData));
            }
            else if (noteData.type === "tempo") {
                _track.bpm = noteData.bpm;
            }
            else if (noteData.type === "time signature") {
                _track.timeSignature = [noteData.numerator, noteData.denominator];
            }
        }
        _track.beats.push(beat);
    }

    return _track;
};
