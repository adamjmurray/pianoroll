"use strict";

describe("Note Functions", function () {
    it("Should convert numbers to note names", function () {
        expect(numberToName(0)).toBe("C");
        expect(numberToName(1)).toBe("C#");
        expect(numberToName(3)).toBe("D#");
        expect(numberToName(13)).toBe("C#");
        expect(numberToName(-1)).toBe("B");
    });

    it("Should convert names to numbers", function () {
        expect(nameToNumber("C")).toBe(0);
        expect(nameToNumber("C#")).toBe(1);
        expect(nameToNumber("Db")).toBe(1);
        expect(nameToNumber("Ebb")).toBe(2);
        expect(nameToNumber("B#")).toBe(0);
        expect(nameToNumber("D#b")).toBe(2);
    });

    it("Should convert midi to notes", function () {
        expect(midiToNote(60)).toEqual(["C", 4]);
        expect(midiToNote(62)).toEqual(["D", 4]);
        expect(midiToNote(70)).toEqual(["A#", 4]);
        expect(midiToNote(100)).toEqual(["E", 7]);
    });

    it("Should convert notes to midi", function () {
        expect(noteToMidi("C", 4)).toBe(60);
        expect(noteToMidi("D", 4)).toBe(62);
        expect(noteToMidi("A#", 4)).toBe(70);
        expect(noteToMidi("E", 7)).toBe(100);
    });

    it("Should calculate note duration", function () {
        expect(noteDuration(1/2, 120)).toEqual(1);
        expect(noteDuration(1/4, 120)).toEqual(0.5);
        expect(noteDuration(1/8, 120)).toEqual(0.25);
        expect(noteDuration(1/4, 90)).toBeCloseTo(0.666);
    });
});

describe("Model", function () {
    var sampleMidiData = [
        {
            "0": [
                {
                    "type": "tempo",
                    "bpm": 120
                },
                {
                    "type": "time signature",
                    "numerator": 4,
                    "denominator": 4
                },
                {
                    "type": "note",
                    "pitch": 60,
                    "velocity": 95,
                    "duration": 1,
                    "channel": 1
                }
        ],
            "1": [
                {
                    "type": "note",
                    "pitch": 62,
                    "velocity": 95,
                    "duration": 1,
                    "channel": 1
                }
            ],
            "2": [
                {
                    "type": "note",
                    "pitch": 64,
                    "velocity": 95,
                    "duration": 1,
                    "channel": 1
                }
            ]
        }
    ];

    it("Should instantiate", function () {
        // Only focus on using the first track for now...
        //var note = new Note(sampleMidiData[0][1][0]);
        //expect(note).toBeDefined();

        var track = Track(sampleMidiData[0]);
        expect(track).toBeDefined();

    });
});