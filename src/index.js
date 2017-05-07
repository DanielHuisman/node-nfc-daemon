import util from 'util';
import {nfc} from 'nfc';

const inspect = (data) => util.inspect(data, {depth: null});

console.log('nfc.version(): ', inspect(nfc.version()));
console.log('nfc.scan(): ', inspect(nfc.scan()));

const readDevice = () => {
    const device = new nfc.NFC();
    device.on('read', (tag) => {
        console.log(tag);

        // if (tag.data && tag.offset) {
        //     console.log(inspect(nfc.parse(tag.data.slice(tag.offset))));
        // }
    }).on('stopped', () => {
        console.log('stopped');

        setTimeout(readDevice, 1000);
    }).on('error', (err) => {
        console.error(err);
    }).start();
};

readDevice();
