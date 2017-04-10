
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql';
import * as Data from '../data';
import { logger } from '../logger';
import { EntityType } from './types';
import { EntityCreateInput } from './inputs';

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
            entity: {
                type: EntityCreateInput
            }
        },
        resolve(source, args) {
            logger.info('createEntity', args);
            return Data.createEntity(args.entity);
        }
    },
    addEntityName: {
        type: new GraphQLList(GraphQLString),
        args: {
            entityId: {
                type: new GraphQLNonNull(GraphQLString)
            },
            name: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(source, args) {
            logger.info('addEntityName', args);
            return Data.addEntityName(args.entityId, args.name);
        }
    }
}
