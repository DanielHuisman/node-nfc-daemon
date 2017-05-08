import util from 'util';
import WebSocket from 'ws';
import {nfc} from 'nfc';

const inspect = (data) => util.inspect(data, {depth: null});

const start = ({host, port, verbose = false, timeout = 5000, restartTimeout = 500}) => {
    // Start WebSocket server
    const server = new WebSocket.Server({
        host,
        port
    });

    // Define variables and hooks
    let lastId = null;
    const clearLastId = () => lastId = null;
    const onTag = (tag) => {
        // Broadcast NFC tag information
        server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(tag));
            }
        });

        // Log to console if verbose is enabled
        if (verbose) {
            console.log(`Read tag ${inspect(tag)}`);
        }
    };

    // Define main loop
    const startNFC = () => {
        try {
            const device = new nfc.NFC();
            device.on('read', (tag) => {
                if (tag.uid !== lastId) {
                    lastId = tag.uid;
                    setTimeout(clearLastId, timeout);

                    // Call hook
                    onTag(tag);
                }
            }).on('stopped', () => {
                // Restart loop
                setTimeout(startNFC, restartTimeout);
            }).on('error', (err) => {
                console.error(err);
            }).start();
        } catch (err) {
            console.error(err);

            // Restart loop
            setTimeout(startNFC, restartTimeout);
        }
    };

    // Start reading NFC tags
    startNFC();
};

export default start;
