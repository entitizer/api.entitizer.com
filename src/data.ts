
import { Promise } from './utils';
import { logger } from './logger';
import { EntityManager, DynamoStorage, NameKeyring, EntityService, EntityNamesService, createTables } from 'entitizer.entities-manager';
import { Entity, PlainObject } from 'entitizer.models';

const dynamoStorage = new DynamoStorage([process.env.ENTITIZER_TABLE_PREFIX, 'NamesKeyring'].join('_'));
const namekeyring = new NameKeyring(dynamoStorage);
const entityService = new EntityService();
const entityNamesService = new EntityNamesService();
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

export function deleteEntity(id: string, params?: PlainObject) {
    return manager.deleteEntity(id, params);
}

function init() {
    return Promise.props({
        p1: dynamoStorage.createTable(),
        p2: createTables()
    });
}

init().catch((e) => logger.error(e));
