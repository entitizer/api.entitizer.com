
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql';
const GraphQLJsonType = require('graphql-type-json');

export const EntityType = new GraphQLObjectType({
    name: 'Entity',
    fields: {
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        abbr: {
            type: GraphQLString
        },
        cc2: {
            type: GraphQLString
        },
        lang: {
            type: GraphQLString
        },
        wikiId: {
            type: GraphQLString
        },
        wikiTitle: {
            type: GraphQLString
        },
        wikiPageId: {
            type: GraphQLInt
        },
        wikiImage: {
            type: GraphQLString
        },
        types: {
            type: new GraphQLList(GraphQLString)
        },
        aliases: {
            type: new GraphQLList(GraphQLString)
        },
        description: {
            type: GraphQLString
        },
        extract: {
            type: GraphQLString
        },
        enWikiTitle: {
            type: GraphQLString
        },
        type: {
            type: GraphQLString
        },
        rank: {
            type: GraphQLInt
        },
        data: {
            type: GraphQLJsonType
        },
        createdAt: {
            type: GraphQLString
        }
    }
});
