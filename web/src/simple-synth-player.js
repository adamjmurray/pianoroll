SimpleSynthPlayer = (function() {

    function SimpleSynthPlayer() {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    SimpleSynthPlayer.prototype.play = function(notes) {
        var audioCtx = this.audioCtx;
        var timeOffset = audioCtx.currentTime + 0.1; // plus a little fudge factor so we don't lose the first note (not sure if that can even be an issue, just paranoid)

        function playNote(note) {
            // Probably not the best idea to create an oscillator for every single note, but don't have time to design
            // a polyphony/voice system right now. Go, go, garbage collector!

            // create Oscillator node
            var oscillator = audioCtx.createOscillator();
            oscillator.type = "sawtooth";

            // Converting from MIDI pitch to Hz using formula from http://en.wikipedia.org/wiki/MIDI_Tuning_Standard
            var frequency = Math.pow(2, (note.pitch-69)/12) * 440;
            oscillator.frequency.value = frequency;

            // TODO: start time should be based on BPM
            // I'll assume 120 BPM for now, which means each beat is half a second and we can just divide by 2

            var startTime = timeOffset + note.beat/2;
            var endTime = startTime + note.duration/2;

            oscillator.start(startTime);
            oscillator.stop(endTime);
            oscillator.connect(audioCtx.destination);
        }

        // TODO: delete this hard-coded data once the track's note data is wired up correctly
        notes = [
            {
                "type": "note",
                "pitch": 60,
                "velocity": 95,
                "duration": 1,
                "channel": 1,
                "beat": 0
            },
            {
                "type": "note",
                "pitch": 62,
                "velocity": 95,
                "duration": 1,
                "channel": 1,
                "beat": 1
            },
            {
                "type": "note",
                "pitch": 64,
                "velocity": 95,
                "duration": 1,
                "channel": 1,
                "beat": 2
            }
        ];

        notes.forEach(function(note){
            playNote(note);
        });
    };

    return SimpleSynthPlayer;
})();

