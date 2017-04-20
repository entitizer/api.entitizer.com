
require('dotenv').config();

const Data = require('../lib/data');

if (process.env.IAMSURE !== 'iam-sure') {
    console.error('You are not sure!');
    return;
}

Data.clearDB()
    .then(() => Data.closeDB()).then(() => console.log('DONE!'))
    .catch(e => console.trace(e));
