'use strict';

require('dotenv').config();

import * as express from 'express';
import { logger } from './logger';
import { schema } from './graphql';
import { auth } from './middlewares/auth';

const graphqlHTTP = require('express-graphql');
const isProduction = process.env.NODE_ENV === 'production';

const server = express();

if (isProduction) {
    server.use(auth);
}

server.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

server.listen(process.env.PORT, () => {
    logger.warn('Listening at %s', process.env.PORT);
});

process.on('unhandledRejection', function (error) {
    logger.error('unhandledRejection: ' + error.message, error);
});

process.on('uncaughtException', function (error) {
    logger.error('uncaughtException: ' + error.message, error);
});
