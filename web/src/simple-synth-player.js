SimpleSynthPlayer = (function() {

    function SimpleSynthPlayer() {
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        var gainNode = audioCtx.createGain();
        gainNode.connect(audioCtx.destination);

        this.audioCtx = audioCtx;
        this.gainNode = gainNode;
    }

    SimpleSynthPlayer.prototype.play = function(notes, bpm, volume) {
        if(!bpm) bpm = 120;
        if(volume === undefined) volume = 0.8;

        this.beatLength = 60/bpm;
        this.gainNode.gain.value = volume;

        var _this = this;
        var timeOffset = this.audioCtx.currentTime + 0.1; // plus a little fudge factor so we don't lose the first note (not sure if that can even be an issue, just paranoid)

        notes.forEach(function(note){
            _this.playNote(note, timeOffset);
        });
    };

    SimpleSynthPlayer.prototype.playNote = function(note, timeOffset) {
        if(!timeOffset) timeOffset = 0;

        // Probably not the best idea to create an oscillator for every single note, but don't have time to design
        // a polyphony/voice system right now. Go, go, garbage collector!

        // create Oscillator node
        // actually, we're going to create a few slightly detuned oscillators to make the sound phatter
        for(var i=0; i<3; i++)
        {
            var oscillator = this.audioCtx.createOscillator();
            oscillator.type = "sawtooth";

            // Converting from MIDI pitch to Hz using formula from http://en.wikipedia.org/wiki/MIDI_Tuning_Standard
            var frequency = Math.pow(2, (note.midiValue - 69) / 12) * 440;
            oscillator.frequency.value = frequency + (frequency * 0.005 * i);

            // TODO: start time should be based on BPM
            // I'll assume 120 BPM for now, which means each beat is half a second and we can just divide by 2

            var startTime = timeOffset + note.beat * this.beatLength;
            var endTime = startTime + note.duration * this.beatLength;

            oscillator.start(startTime);
            oscillator.stop(endTime);
            oscillator.connect(this.gainNode);
        }
    }

    return SimpleSynthPlayer;
})();

