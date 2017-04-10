
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLInputObjectType } from 'graphql';
const GraphQLJsonType = require('graphql-type-json');

export const EntityCreateInput = new GraphQLInputObjectType({
    name: 'EntityCreateInput',
    fields:
    {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        abbr: {
            type: GraphQLString
        },
        cc2: {
            type: GraphQLString
        },
        lang: {
            type: new GraphQLNonNull(GraphQLString)
        },
        wikiId: {
            type: new GraphQLNonNull(GraphQLString)
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
            type: new GraphQLNonNull(GraphQLString)
        },
        rank: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        data: {
            type: GraphQLJsonType
        }
    }
});