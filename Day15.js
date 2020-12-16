// Part 1: 
// getSpokenNumber("0,3,6", 2020, 436);
// getSpokenNumber("1,3,2", 2020, 1);
// getSpokenNumber("2,1,3", 2020, 10);
// getSpokenNumber("1,2,3", 2020, 27);
getSpokenNumber("14,3,1,0,9,5", 2020, 614);

// Part 2:
// getSpokenNumber("0,3,6", 30000000, 175594);
getSpokenNumber("14,3,1,0,9,5", 30000000, 1065);


function getSpokenNumber(sequence, finalIndex, expected) {
    var spokenNumbers = {};
    var start = sequence.split(",");

    for (i = 0; i < start.length; i++) {
        spokenNumbers[parseInt(start[i])] = {
            "first": i,
            "second": -1
        }
    }

    var index = start.length;
    var lastSpokenValue = parseInt(start[start.length-1]);
    var done = 1;
    for (i = index; i < finalIndex; i++) {
        if (lastSpokenValue in spokenNumbers) {
            let lastSpoken = spokenNumbers[lastSpokenValue];
            if (lastSpoken.second != -1) {
                lastSpoken.first = lastSpoken.second;
            }
            if (lastSpoken.first != i-1) {
                lastSpoken.second = i-1;
                lastSpokenValue = lastSpoken.second - lastSpoken.first;
            } else {
                lastSpokenValue = 0;
            }
        } else {
            spokenNumbers[lastSpokenValue] = {
                "first": i-1,
                "second": -1
            }
            lastSpokenValue = 0;
        }
        if (((i*100)/finalIndex) > done) {
            // Progress bar!
            done++;
            console.log("Progress: " + done + "%");
        }
        
    }
    console.log("Spoken value at index " + finalIndex + " was " + lastSpokenValue + " (expected: " + expected +")");
}
