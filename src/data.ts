
import { logger } from './logger';
import { EntityCreate, UniqueNameCreate } from 'entitizer.entities';
import {
    DataEntityRepository,
    DataUniqueNameRepository,
    MemoryEntityStore,
    MemoryUniqueNameStore,
    EntityDataMapper,
    UniqueNameDataMapper,
    DynamoEntityStore,
    DynamoUniqueNameStore,
    dynamoConfig,
    dynamoCreateTables,
    // RedisKeyringStore,
    DynamoKeyringStore
} from 'entitizer.data';

import { Entitizer } from 'entitizer';

export { Context } from 'entitizer';

// const redis = require('redis');

// const client = redis.createClient({
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
//     password: process.env.REDIS_PASS
// });

export const entityRepository = new DataEntityRepository(new DynamoEntityStore(), new EntityDataMapper());
export const uniqueNameRepository = new DataUniqueNameRepository(new DynamoUniqueNameStore(new DynamoKeyringStore()), new UniqueNameDataMapper());

export const entitizer = new Entitizer(entityRepository, uniqueNameRepository);

export const usecases = {
    entityCreate: new EntityCreate(entityRepository),
    uniqueNameCreate: new UniqueNameCreate(uniqueNameRepository)
}

if (process.env.LOCAL_DB) {
    dynamoConfig({ region: 'dynamodb-local-frankfurt', endpoint: 'http://localhost:8000', accessKeyId: 'id', secretAccessKey: 'key' });
}
dynamoCreateTables().catch(e => console.error(e));
