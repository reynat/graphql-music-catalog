import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Book {
        title: String!
    }

    type Query {
        books: [Book]
    }
`