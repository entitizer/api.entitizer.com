
import { Promise } from './utils';
import { logger } from './logger';
import { EntityManager, storage, keyring } from 'entitizer.entities';
import { Entity, PlainObject } from 'entitizer.models';

const dynamoStorage = new keyring.DynamoStorage([process.env.ENTITIZER_TABLE_PREFIX, 'NamesKeyring'].join('_'));
const namekeyring = new keyring.NameKeyring(dynamoStorage);
const entityService = new storage.EntityService();
const entityNamesService = new storage.EntityNamesService();
const manager = new EntityManager(namekeyring, entityService, entityNamesService);

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

export function addEntityName(entityId: string, name: string) {
    return manager.addEntityName(entityId, name);
}

export function deleteEntity(id: string, params?: PlainObject) {
    return manager.deleteEntity(id, params);
}

function init() {
    return Promise.props({
        p1: dynamoStorage.createTable(),
        p2: storage.createTables()
    });
}

init().catch((e) => logger.error(e));
