
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLBoolean } from 'graphql';
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
            // logger.info('createEntity', args);
            return Data.createEntity(args.entity).then(entity => {
                console.log('created entity', entity);
                return entity;
            }).catch(e => console.log(e));
        }
    },
    addEntityNames: {
        type: GraphQLInt,
        args: {
            entityId: {
                type: new GraphQLNonNull(GraphQLString)
            },
            names: {
                type: new GraphQLNonNull(new GraphQLList(GraphQLString))
            }
        },
        resolve(source, args) {
            logger.info('addEntityNames', args);
            return Data.addEntityNames(args.entityId, args.names).catch(e => console.log(e));
        }
    }
}
