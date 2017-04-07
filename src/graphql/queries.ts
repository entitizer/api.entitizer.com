
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql';

import * as Data from '../data';
import { logger } from '../logger';
import { EntityType } from './types';

const EntityTypeList = new GraphQLList(EntityType);

export const queries = {
    entityById: {
        type: EntityType,
        args: {
            id: {
                name: 'id',
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(source, args) {
            logger.info('getting entityById', args);
            return Data.getEntityById(args.id);
        }
    },
    entitiesByName: {
        type: EntityTypeList,
        args: {
            name: {
                name: 'name',
                type: new GraphQLNonNull(GraphQLString)
            },
            lang: {
                name: 'lang',
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(source, args) {
            logger.info('getting entitiesByName', args);
            return Data.getEntitiesByName(args.name, args.lang);
        }
    }
}
