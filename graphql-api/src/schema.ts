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
    createAlbum(input: CreateAlbumInput!): CreateAlbumPayload!
  }

  input CreateAlbumInput {
    artistId: ID!
    title: String!
  }

  union CreateAlbumPayload = Album | ArtistNotFoundError | DuplicateAlbumError

  type ArtistNotFoundError {
    message: String!
  }

  type DuplicateAlbumError {
    message: String!
  }
`;
