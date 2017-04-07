
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql';

import * as Data from '../data';
import { logger } from '../logger';
import { EntityType } from './types';

const GraphQLJsonType = require('graphql-type-json');
const EntityTypeList = new GraphQLList(EntityType);

export const mutations = {
    deleteEntity: {
        type: EntityType,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(source, args) {
            logger.info('deleteEntity', args);
            return Data.deleteEntity(args.id);
        }
    },
    createEntity: {
        type: EntityType,
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            abbr: {
                type: GraphQLString
            },
            cc2: {
                type: GraphQLString
            },
            lang: {
                type: new GraphQLNonNull(GraphQLString)
            },
            wikiId: {
                type: new GraphQLNonNull(GraphQLString)
            },
            wikiTitle: {
                type: GraphQLString
            },
            aliases: {
                type: new GraphQLList(GraphQLString)
            },
            description: {
                type: GraphQLString
            },
            extract: {
                type: GraphQLString
            },
            enWikiTitle: {
                type: GraphQLString
            },
            type: {
                type: new GraphQLNonNull(GraphQLString)
            },
            rank: {
                type: new GraphQLNonNull(GraphQLInt)
            },
            data: {
                type: GraphQLJsonType
            }
        },
        resolve(source, args) {
            logger.info('createEntity', args);
            return Data.createEntity(args);
        }
    }
}
