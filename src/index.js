import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import daemon from 'daemon';
import {nfc} from 'nfc';

import start from './server';

const pkg = require('../package.json');

// Define command line options
const optionDefinitions = [{
    name: 'help',
    alias: 'H',
    type: Boolean,
    description: 'Display usage information.'
}, {
    name: 'version',
    alias: 'v',
    type: Boolean,
    description: 'Display version information.'
}, {
    name: 'daemon',
    alias: 'd',
    type: Boolean,
    description: 'Run as daemon (background).'
}, {
    name: 'host',
    alias: 'h',
    type: String,
    defaultValue: '127.0.0.1',
    description: 'The host to bind the WebSocket server to.'
}, {
    name: 'port',
    alias: 'p',
    type: Number,
    defaultValue: 5000,
    description: 'The port to bind the WebSocket server to.'
}, {
    name: 'timeout',
    alias: 't',
    type: Number,
    defaultValue: 5000,
    description: 'Timeout in milliseconds between reading NFC tags.'
}, {
    name: 'verbose',
    alias: 'V',
    type: Boolean,
    description: 'Verbose logging (i.e. print all read NFC tags).'
}];

// Define command line usage
const usageDefinition = [{
    header: 'NFC Daemon',
    content: 'Simple Node.js daemon which reads NFC tags and exposes a WebSocket with the information.'
}, {
    header: 'Options',
    optionList: optionDefinitions
}];

// Parse options and usage definitions
const options = commandLineArgs(optionDefinitions);
const usage = commandLineUsage(usageDefinition);

// Process options
if (options.daemon) {
    // Restart application as daemon
    daemon();
    console.log(`NFC daemon started with PID ${process.pid}`);
} else {
    if (options.help) {
        // Display usage information
        console.log(usage);

        // Exit after printing information
        process.exit(0);
    } else if (options.version) {
        // Display version information
        const version = nfc.version();
        console.log(`NFC daemon version ${pkg.version}`);
        console.log(`  - ${version.name} ${version.version}`);

        // Exit after printing information
        process.exit(0);
    }
}

// Start NFC daemon
start(options);
