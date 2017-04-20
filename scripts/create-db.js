
require('dotenv').config();

const Data = require('../lib/data');

Data.createDB()
    .then(() => Data.closeDB()).then(() => console.log('DONE!'))
    .catch(e => console.trace(e));
