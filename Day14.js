var lineReader = require('line-reader'),
    Promise = require('bluebird'),
    Long = require("long");

var inputFile = "./inputs/day14.txt"
var readInputLines = [];
var memory = {};

function getMaskedValue(value, mask) {
    let maskedValue = new Long(value);
    for (var i = 0; i < mask.length; i++) {
        let maskorama = Math.pow(2, mask.length-i-1);
        if (mask.charAt(i) == '0') {
            maskedValue = maskedValue.and(new Long(maskorama).not());
        } else if (mask.charAt(i) == '1') {
            maskedValue = maskedValue.or(maskorama);
        }
    }
    return maskedValue.toNumber();
}

function getMaskedAddresses(index, mask) {
    let addresses;

    switch(mask.charAt(0)) {
        case '0':
            addresses = [(isBitSet(index, mask.length-1))];
            break;
        case '1':
            addresses = ['1'];
            break;
        case 'X':
            addresses = ['0', '1'];
            break;
    }

    for (var i = 1; i < mask.length; i++) {
        if (mask.charAt(i) == 'X') {
            addresses = expandAddresses(addresses, ['1', '0']);
        } else if (mask.charAt(i) == '1') {
            addresses = expandAddresses(addresses, ['1']);
        } else {
            addresses = expandAddresses(addresses, [isBitSet(index, mask.length-i-1)]);
        }
    }
    return addresses;
}

function expandAddresses(addresses, next) {
    let newAddresses = [];
    addresses.forEach(m => {
        next.forEach(n => {
            newAddresses.push(m + n);
        });
    });
    return newAddresses;
}

function writeToMemoryPart1() {
    let mask = '';
    readInputLines.forEach(line => {
        if (line.length > 0) {
            if (line.startsWith("mask")) {
                mask = line.split(" ")[2];
            } else {
                let index = line.split("[").pop().split("]")[0];
                let value = getMaskedValue(line.split(" ")[2], mask);
                memory[index] = value;
            }
        }
    })
}

function writeToMemoryPart2() {
    let mask = '';
    readInputLines.forEach(line => {
        if (line.length > 0) {
            if (line.startsWith("mask")) {
                mask = line.split(" ")[2];
            } else {
                let index = parseInt(line.split("[").pop().split("]")[0]);
                let value = parseInt(line.split(" ")[2]);

                let addresses = getMaskedAddresses(index, mask);
                addresses.forEach(addr => {
                    memory[parseInt(addr, 2)] = value;
                });
            }
        }
    })
}

function getSumOfMemory() {
    var sum = 0;
    for (const [key, value] of Object.entries(memory)) {
        sum += value;
    }
    return sum;
}

function onInputsRead() {
    writeToMemoryPart1();
    console.log("Part 1 :" + getSumOfMemory()); // 5055782549997

    memory = {};
    writeToMemoryPart2();
    console.log("Part 2 :" + getSumOfMemory()); // 4795970362286
}

Promise.promisify(lineReader.eachLine)(inputFile, function(line) {
    readInputLines.push(line)
}).then(onInputsRead);


function isBitSet(value, offset) {
    let maskorama = Math.pow(2, offset);
    return new Long(value).and(maskorama) > 0 ? '1' : '0'; 
}