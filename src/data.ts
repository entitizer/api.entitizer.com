
import { logger } from './logger';
import { EntityCreate, EntityGetById, UniqueNameCreate } from 'entitizer.entities';
import { DataEntityRepository, DataUniqueNameRepository, MemoryEntityStore, MemoryUniqueNameStore, EntityDataMapper, UniqueNameDataMapper } from 'entitizer.data';

export const entityRepository = new DataEntityRepository(new MemoryEntityStore(), new EntityDataMapper());
export const uniqueNameRepository = new DataUniqueNameRepository(new MemoryUniqueNameStore(), new UniqueNameDataMapper());

export const usecases = {
    entityCreate: new EntityCreate(entityRepository),
    entityGetById: new EntityGetById(entityRepository),
    uniqueNameCreate: new UniqueNameCreate(uniqueNameRepository)
}

// const redis = require('redis');

// const client = redis.createClient({
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
//     password: process.env.REDIS_PASS
// });


