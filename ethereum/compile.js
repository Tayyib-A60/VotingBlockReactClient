const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, 'contracts', 'Election.sol');
const source = fs.readFileSync(contractPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

// console.log(output);

    for(let contract in output) {
        // const name = contract.substring(1,contract.length);
        
        fs.outputJSONSync(
            path.resolve(buildPath, contract.replace(':', '') + '.json'),
            output[contract]
        );
    }