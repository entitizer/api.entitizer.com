
import { Promise } from './utils';
import { logger } from './logger';
import { EntityManager, storage, keyring } from 'entitizer.entities';
import { Entity, PlainObject } from 'entitizer.models';

const redis = require('redis');

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS
});

// const dynamoStorage = new keyring.DynamoStorage([process.env.ENTITIZER_TABLE_PREFIX, 'NamesKeyring'].join('_'));
const redisStorage = new keyring.RedisStorage(client);
const namekeyring = new keyring.NameKeyring(redisStorage);
const entityStorage = new storage.EntityStorage();
const entityNamesStorage = new storage.EntityNamesStorage();
const manager = new EntityManager(namekeyring, entityStorage, entityNamesStorage);

export function getEntityById(id: string, params?: PlainObject) {
    return manager.getEntity(id, params);
}

export function getEntitiesByName(name: string, lang: string, params?: PlainObject) {
    return manager.getEntitiesByName(name, lang, params);
}

export function getEntities(ids: string[], params?: PlainObject) {
    return manager.getEntities(ids, params);
}

export function createEntity(data: PlainObject, params?: PlainObject) {
    return manager.createEntity(data);
}

export function setEntityNames(entityId: string, names: string[]) {
    return manager.setEntityNames(entityId, names);
}

export function addEntityNames(entityId: string, names: string[]) {
    return manager.addEntityNames(entityId, names);
}

export function deleteEntity(id: string, params?: PlainObject) {
    return manager.deleteEntity(id, params);
}

export function clearDB() {
    return Promise.props({
        p1: client.flushdbAsync(),
        p2: storage.deleteTables('iam-sure').catch()
    });
}

export function createDB() {
    return Promise.props({
        p2: storage.createTables().catch()
    });
}

export function closeDB() {
    return Promise.props({
        p1: client.quitAsync()
    });
}
