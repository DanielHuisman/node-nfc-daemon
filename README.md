# node-nfc-daemon

Simple Node.js daemon which reads NFC tags and exposes a WebSocket with the information.

## Installation
### Via Git
```
git clone https://github.com/DanielHuisman/node-nfc-daemon.git`
cd node-nfc-daemon
yarn
```

### Via npm
```
yarn global add nfc-daemon
```

## Usage
### Basic usage
```
NFC Daemon
  Simple Node.js daemon which reads NFC tags and exposes a WebSocket with the information.

Options
  -H, --help             Display usage information.
  -v, --version          Display version information.
  -d, --daemon           Run as daemon (background).
  -h, --host string      The host to bind the WebSocket server to.
  -p, --port number      The port to bind the WebSocket server to.
  -t, --timeout number   Timeout in milliseconds between reading NFC tags (by default 5 seconds).
  -V, --verbose          Verbose logging (i.e. print all read NFC tags).
```

### Daemon
Use the `--daemon` or `-d` option to run this application in the background as a daemon.

### Process managers
Alternatively you can use a process manager, like [PM2](https://github.com/Unitech/pm2) or [Forever](https://github.com/foreverjs/forever), to start and monitor this application.
