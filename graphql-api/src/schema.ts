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

  union CreateAlbumPayload = CreateAlbumSuccess | CreateAlbumFailure

  type CreateAlbumSuccess {
    album: Album!
  }

  type CreateAlbumFailure {
    error: CreateAlbumError!
  }

  interface CreateAlbumError {
    message: String!
  }

  type ArtistNotFoundError implements CreateAlbumError {
    message: String!
  }

  type DuplicateAlbumError implements CreateAlbumError {
    message: String!
  }
`;
