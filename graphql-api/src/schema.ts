import { gql } from "apollo-server";

export const typeDefs = gql`
  type Album {
    title: String!
    artist: Artist!
  }

  type Artist {
    name: String!
  }

  type Query {
    albums: [Album]!
    album(id: ID!): Album
  }

  type Mutation {
    createAlbum(input: CreateAlbumInput!): Album!
  }

  input CreateAlbumInput {
    artistId: ID!
    title: String!
  }
`;
