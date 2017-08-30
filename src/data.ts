
import { logger } from './logger';
import { EntityCreate, EntityGetById, UniqueNameCreate } from 'entitizer.entities';
import { DataEntityRepository, DataUniqueNameRepository, MemoryEntityStore, MemoryUniqueNameStore, EntityDataMapper, UniqueNameDataMapper } from 'entitizer.data';
import { Entitizer } from 'entitizer';

export { Context } from 'entitizer';

export const entityRepository = new DataEntityRepository(new MemoryEntityStore(), new EntityDataMapper());
export const uniqueNameRepository = new DataUniqueNameRepository(new MemoryUniqueNameStore(), new UniqueNameDataMapper());

export const entitizer = new Entitizer(entityRepository, uniqueNameRepository);

export const usecases = {
    entityCreate: new EntityCreate(entityRepository),
    uniqueNameCreate: new UniqueNameCreate(uniqueNameRepository)
}

// const redis = require('redis');

// const client = redis.createClient({
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
//     password: process.env.REDIS_PASS
// });


