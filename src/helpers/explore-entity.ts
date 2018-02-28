

import { getEntities, WikiEntity } from 'wiki-entity';
import { uniq } from '../utils';
import { fromWikiEntity } from 'entitizer.entity-mapper';
import { Entity, EntityHelper } from 'entitizer.entities';

export type EntityInfo = {
    entity?: Entity
    wikiEntity: WikiEntity
    names?: string[]
}

export function exploreEntity(id: string, lang: string) {
    return new Promise<EntityInfo>((resolve, reject) => {
        getEntities({ ids: id, categories: false, claims: 'none', extract: 3, language: lang, redirects: true, types: true })
            .then((entities: WikiEntity[]) => {
                if (!entities || !entities.length) {
                    return Promise.reject(new Error(`not found entity=${id}`));
                }
                const info: EntityInfo = { wikiEntity: entities[0] };
                info.entity = convertEntity(entities[0], lang, { defaultType: null });
                if (!entityPassFilter(info.entity)) {
                    return Promise.reject(new Error(`Entity is invalid: ${info.entity.name}`));
                }
                info.names = createEntityNames(info.entity, info.wikiEntity.redirects);
                if (info.names.length === 0) {
                    return Promise.reject(new Error(`no names for entity=${id}`));
                }
                return Promise.resolve(info);
            })
            .then(resolve)
            .catch(reject);
    });
}

function entityPassFilter(entity: Entity): boolean {
    if (!entity.type || !entity.name || entity.name === entity.name.toLowerCase()) {
        return false;
    }
    if (!entity.name && !entity.wikiTitle) {
        return false;
    }
    if (entity.name && entity.name === entity.name.toLowerCase()) {
        return false;
    }
    return true;
}

function createEntityNames(entity: Entity, redirects?: string[]): string[] {
    let names = [entity.name];

    if (entity.wikiTitle) {
        names.push(entity.wikiTitle);
    }

    let partialName = entity.name.endsWith(')') && entity.name ||
        entity.wikiTitle && entity.wikiTitle.endsWith(')') && entity.wikiTitle
    if (partialName) {
        const i = partialName.lastIndexOf('(');
        if (i) {
            names.push(partialName.substr(0, i).trim())
        }
    }

    // partialName = entity.name.indexOf(',') && entity.name ||
    //     entity.wikiTitle && entity.wikiTitle.indexOf(',') && entity.wikiTitle
    // if (partialName) {
    //     const i = partialName.indexOf(',');
    //     if (i) {
    //         names.push(partialName.substr(0, i).trim())
    //     }
    // }

    if (redirects && redirects.length) {
        names = names.concat(redirects);
    }

    if (entity.aliases && entity.aliases.length) {
        // concat only aliases longer then entity's name or with minnimum 2 words
        names = names.concat(entity.aliases.filter(item =>
            item.toLowerCase() !== item &&
            (
                item.length > entity.name.length ||
                item.toUpperCase() === item ||
                item.split(/\s+/g).length > 1
            ))
        )
    }

    names = uniq(names);

    return names.filter(name => name && name.toLowerCase() !== name);
}

function convertEntity(item: WikiEntity, lang: string, options: any) {
    const enyEntity: any = fromWikiEntity(item, lang, options);

    for (let prop in enyEntity) {
        if (~[null, undefined].indexOf(enyEntity[prop]) || Array.isArray(enyEntity[prop]) && enyEntity[prop].length === 0) {
            delete enyEntity[prop];
        }
    }

    const entity = <Entity>enyEntity;

    if (entity.extract) {
        entity.extract = entity.extract.replace(/\([^\)]+\)/, '').replace(/\ {2,}/g, ' ').replace(/ ,/g, ',').trim();
        if (entity.extract.length > 200) {
            const items = entity.extract.split(/\n+/g).filter(t => t.length > 10);
            if (items[0].length > 150) {
                entity.extract = items[0].trim();
            }
            else if (items.length > 1) {
                entity.extract = items.slice(0, 2).join('\n');
            }
        }
        entity.extract = entity.extract.length > 400 ? entity.extract.substr(0, 400).trim() : entity.extract;
    }

    return entity;
}
