
import { logger } from '../logger';
import { usecases, entityRepository, uniqueNameRepository, Context, entitizer } from '../data';
import * as GraphQLJSON from 'graphql-type-json';
import { exploreEntity } from '../helpers/explore-entity';
import { importEntity } from '../helpers/import-entity';

export const resolvers = {
    Query: {
        entityById: (_: any, args: { id: string }) => entityRepository.getById(args.id).toPromise(),
        entitiesByIds: (_: any, args: { ids: string[] }) => entityRepository.getByIds(args.ids).toPromise(),
        entityIdsByKeys: (_: any, args: { keys: string[] }) => uniqueNameRepository.getEntityIdsByKeys(args.keys).toPromise(),
        uniqueNamesByEntityId: (_: any, args: { entityId: string }) => uniqueNameRepository.getByEntityId(args.entityId).toPromise(),
        entitize: (_: any, args: { context: Context }) => {
            logger.info('context', args.context);
            return entitizer.entitize(args.context)
        }
    },
    Mutation: {
        entityCreate: (_: any, args: { data: any }) => usecases.entityCreate.execute(args.data).toPromise(),
        uniqueNameCreate: (_: any, args: { data: any }) => usecases.uniqueNameCreate.execute(args.data).toPromise(),
        entityImport: (_: any, args: { id: string, lang: string }) => exploreEntity(args.id, args.lang).then(data => importEntity(data.entity, data.names))
    },
    JSON: GraphQLJSON
}
