
import { Entity, EntityHelper } from 'entitizer.entities';
import { usecases } from '../data';

export function importEntity(entity: Entity, names?: string[]) {
    if (entity.type === 'C') {
        return Promise.reject(new Error(`Invalid entity type==C`))
    }
    return usecases.entityCreate.execute(entity).toPromise()
        .catch(e => {
            if (e.message === 'The conditional request failed') {
                entity.id = EntityHelper.createId({ lang: entity.lang, wikiId: entity.wikiId });
                return entity;
            }
            // debug('rethrow error: ', e.message);
            throw e;
        })
        .then((dbEntity: Entity) => {
            if (!dbEntity) {
                return Promise.reject(new Error('Entity not found!'));
            }
            // debug('creating all then names', info.names);
            const tasks = names.map(name => usecases.uniqueNameCreate.execute({ entityId: dbEntity.id, name: name, lang: dbEntity.lang }).toPromise()
                .catch(e => { }));

            return Promise.all(tasks).then(() => dbEntity);
        });
}
