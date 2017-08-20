
require('dotenv').config();

import * as express from 'express';
import { logger } from './logger';
import { auth } from './middlewares/auth';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs, resolvers } from './graphql';

const graphqlHTTP = require('express-graphql');
const isProduction = process.env.NODE_ENV === 'production';
const schema = makeExecutableSchema({ typeDefs, resolvers });

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

process.on('unhandledRejection', function (error:Error) {
    logger.error('unhandledRejection: ' + error.message, error);
});

process.on('uncaughtException', function (error:Error) {
    logger.error('uncaughtException: ' + error.message, error);
});
