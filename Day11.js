var lineReader = require('line-reader'),
    Promise = require('bluebird');

var inputFile = "./inputs/day11.txt"
var currentSeats = [];
var cols = 0;
var rows = 0;

function getNewState(row, col) {
    let currentState = getState(row, col);
    if (currentState == ".") {
        return ".";
    }

    let occupied = 0;
    let numbers = [-1, 0, 1];
    numbers.forEach(i => {
        numbers.forEach(j => {
            if (! (i==0 && j==0)) {
                if (getFirstSeenSeat(row, col, i, j) == "#") {
                    occupied++;
                }
            }
        })
    })

    if (currentState == "L" && occupied == 0) {
        return "#";
    }
    if (currentState == "#" && occupied >= 5) {
        return "L";
    }

    return currentState;
}

function getFirstSeenSeat(row, col, rowIndex, colIndex) {
    let check = "";
    let n = 1;
    while(check != "E") {
        check = getState(row + (rowIndex*n), col + (colIndex*n));
        if (check == "L") {
            return "L";
        }
        if (check == "#") {
            return "#";
        }
        n++;
    }
    
    return "E";    
}

function getState(row, col) {
    if (row == -1 || row >= rows) {
        return "E";
    }
    if (col == -1 || col >= cols) {
        return "E";
    }
    return currentSeats[row][col];
}

function getNewSeating() {
    let newSeat = [rows];
    for (j = 0; j < rows; j++) {
        let newRow = [cols];
        for (k = 0; k < cols; k++) {
            newRow[k] = getNewState(j, k);
        }
        newSeat[j] = newRow;
    }
    return newSeat;
}

function seatsAreEqual(oldSeats, newSeats) {
    for (j = 0; j < rows; j++) {
        for (k = 0; k < cols; k++) {
            if (oldSeats[j][k] != newSeats[j][k]) {
                return false;
            }
        }
    }
    return true;
}

function getOccupiedSeats(seats) {
    let count = 0;
    for (j = 0; j < rows; j++) {
        for (k = 0; k < cols; k++) {
            if (seats[j][k] == "#") {
                count++;
            }
        }
    }
    return count;
}

function onInputsRead() {
    rows = currentSeats.length;
    cols = currentSeats[0].length;
    
    let newSeat = getNewSeating();

    while(!seatsAreEqual(newSeat, currentSeats)) {
        console.log("Seats occupied: " + getOccupiedSeats(newSeat));
        currentSeats = newSeat;
        newSeat = getNewSeating();
    }
}

Promise.promisify(lineReader.eachLine)(inputFile, function(line) {
    currentSeats.push(line.split(""))
}).then(onInputsRead);
