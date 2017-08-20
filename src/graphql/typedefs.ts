
import * as GraphQLJSON from 'graphql-type-json';

const types = `

scalar JSON

# named Entity
type Entity {
    id: ID!
    lang: String
    wikiId: String
    name: String
    abbr: String
    description: String
    wikiPageId: Int
    wikiTitle: String
    aliases: [String]
    extract: String
    type: String
    types: [String]
    cc2: String
    rank: Int
    data: JSON
    createdAt: Int
    updatedAt: Int
    redirectId: String
}
# entity unique name
type UniqueName {
    entityId: String!
    key: String!
    lang: String
    name: String
    uniqueName: String
    createdAt: Int
}
`;

const inputs = `

input EntityInput {
    lang: String!
    wikiId: String!
    name: String!
    abbr: String
    description: String
    wikiPageId: Int
    wikiTitle: String
    aliases: [String]
    extract: String
    type: String
    types: [String]
    cc2: String
    rank: Int
    data: JSON
    createdAt: Int
    updatedAt: Int
    redirectId: String
}

input UniqueNameInput {
    entityId: String!
    lang: String!
    name: String!
    uniqueName: String
    createdAt: Int
}
`;

const queries = `

type Query {
  entityById(id: ID!, redirect: Boolean): Entity
  entitiesByIds(ids: [ID]!, redirect: Boolean): [Entity]
  uniqueNamesByEntityId(entityId: String!): [UniqueName]
  entityIdsByKeys(keys: [String]!): [String]
}

type Mutation {
  entityCreate(data: EntityInput!): Entity
  uniqueNameCreate(data: UniqueNameInput!): UniqueName
}
`

export const typeDefs = [types, inputs, queries].join('\n');
