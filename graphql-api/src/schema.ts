import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Album {
        title: String!
    }

    type Query {
        albums: [Album]!
    }
`