var lineReader = require('line-reader'),
    Promise = require('bluebird'),
    lcm = require('compute-lcm');

var inputFile = "./inputs/day13.txt";
var busTable = "";
var buses = [];
var time = 0n;

function onInputsRead() {
    cleanUpReadBuses(busTable);

    part1(261);
    part2(807435693182510);
}

function getWaitTime(time, interval) {
    return interval - time % interval;
}

function part1(expected) {
    var min = -1n;
    var minBus;
    for (i=0; i < buses.length; i++) {
        let b = buses[i];
        let waitTime = getWaitTime(time, b.value);
        if (waitTime < min || min == -1n) {
            min = waitTime;
            minBus = b;
        }
    }

    console.log("Part 1:" + min * minBus.value + " (expected: " + expected +")");
}

function part2(expected) {
    var step = 1n; 
    var candidate = 0n; 

    var keepLooking = true;
    var foundBusses = 0;
    while(keepLooking) {
        keepLooking = false;
        for (i=foundBusses; i < buses.length; i++) {
            candidate += step;    
            let bus = buses[i];
            let worksForThisBus = false;
            if (bus.index == 0) {
                worksForThisBus = candidate % bus.value == 0;
            } else {
                if (bus.index > bus.value) {
                    if (candidate < (bus.value + bus.index)) {
                        worksForThisBus = false;
                    }else {
                        let testIndex = candidate + bus.index;
                        worksForThisBus = (testIndex % bus.value == 0); 
                    }
                } else {
                    worksForThisBus = (candidate % bus.value) == (bus.value - bus.index);
                }
            }
            if (!worksForThisBus){
                keepLooking = true;
                break;
            } else {
                foundBusses++;
                step = step * (bus.value);
            }
        }
    }

    console.log("Part 2 : " + candidate + " (expected: " + expected +")");
}

// Remove x and set indexes
function cleanUpReadBuses(line) {
    buses = [];
    let rawBuses = line.split(",");
    let index = 0n;
    rawBuses.forEach(b => {
        if (b != 'x') {
            buses.push({ 
                "index": index,
                "value": BigInt(b)
            });
        }
        index++;
    });
}

Promise.promisify(lineReader.eachLine)(inputFile, function(line) {
    if(time == 0n) {
        time = BigInt(line); 
    } else {
        busTable = line;
    } 
}).then(onInputsRead);
