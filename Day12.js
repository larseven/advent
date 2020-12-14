var lineReader = require('line-reader'),
    Promise = require('bluebird');

var inputFile = "./inputs/day12.txt"
var directions = [];

var degree = 0,
    ew = 0,
    ns = 0,
    wEw = 10,
    wNs = 1;

function updatePlacement(dir, steps) {
    switch(dir) {
        case 'N':
            ns += steps;
            break;
        case 'S':
            ns -= steps;
            break;
        case 'E':
            ew += steps;
            break;
        case 'W':
            ew -= steps;
            break;
        case 'L':
            updateDirection(steps);
            break;
        case 'R':
            updateDirection(-steps);
            break;
        case 'F':
            moveForward(steps);
            break;
    }
}

function updateWaypoint(dir, steps) {
    switch(dir) {
        case 'N':
            wNs += steps;
            break;
        case 'S':
            wNs -= steps;
            break;
        case 'E':
            wEw += steps;
            break;
        case 'W':
            wEw -= steps;
            break;
        case 'L':
            updateWaypointDirection(steps);
            break;
        case 'R':
            updateWaypointDirection(-steps);
            break;
        case 'F':
            ew += wEw * steps;
            ns += wNs * steps;
            break;
    }
}

function updateWaypointDirection(degrees) {
    change = (degrees + 360) % 360;
    let currentWEw = wEw;
    let currentWNs = wNs;

    if (change == 90) {
        wEw = -currentWNs;
        wNs = currentWEw;
    } else if (change == 180) {
        wEw = -currentWEw;
        wNs = -currentWNs;
    } else if (change == 270) {
        wEw = currentWNs;
        wNs = -currentWEw;
    }
}

function updateDirection(degrees) {
    degree += degrees + 360;
    degree = degree % 360;
}

function moveForward(steps) {
    if (degree == 90) {
        ns += steps;
    } else if (degree == 180) {
        ew -= steps;
    } else if (degree == 270) {
        ns -= steps;
    }
}

function getManhattanDistance() {
    return Math.abs(ew) + Math.abs(ns);
}

function onInputsRead() {
    directions.forEach(d => {
        console.log(d);
        updatePlacement(d.dir, d.steps);
    });

    console.log("Part 1:" + getManhattanDistance()); // 1687

    // Reset stuff
    degree = 0;
    ew = 0;
    ns = 0;

    directions.forEach(d => {
        console.log(d);
        updateWaypoint(d.dir, d.steps);
    });

    console.log("Part 2:" + getManhattanDistance()); // 20873
}

Promise.promisify(lineReader.eachLine)(inputFile, function(line) {
    directions.push({
        "dir": line.substring(0, 1),
        "steps": parseInt(line.substring(1, line.length))
    })
}).then(onInputsRead);
