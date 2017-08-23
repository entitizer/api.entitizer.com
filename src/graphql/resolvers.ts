
import { logger } from '../logger';
import { usecases, entityRepository, uniqueNameRepository } from '../data';
import * as GraphQLJSON from 'graphql-type-json';

export const resolvers = {
    Query: {
        entityById: (_: any, args: { id: string }) => entityRepository.getById(args.id).toPromise(),
        entitiesByIds: (_: any, args: { ids: string[] }) => entityRepository.getByIds(args.ids).toPromise(),
        entityIdsByKeys: (_: any, args: { keys: string[] }) => uniqueNameRepository.getEntityIdsByKeys(args.keys).toPromise(),
        uniqueNamesByEntityId: (_: any, args: { entityId: string }) => uniqueNameRepository.getByEntityId(args.entityId).toPromise()
    },
    Mutation: {
        entityCreate: (_: any, args: { data: any }) => usecases.entityCreate.execute(args.data).toPromise(),
        uniqueNameCreate: (_: any, args: { data: any }) => usecases.uniqueNameCreate.execute(args.data).toPromise()
    },
    JSON: GraphQLJSON
}
