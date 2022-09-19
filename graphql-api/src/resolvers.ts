import { Context } from "./app";
import * as DataSourceTypes from "./data-source-types";
import * as Schema from "./generated/graphql";

export const resolvers = {
  Query: {
    albums: (_parent: any, _args: any, { dataSources }: Context) => {
      return dataSources.musicAPI.getAlbums();
    },
    album: (
      _parent: any,
      args: Schema.QueryAlbumArgs,
      { dataSources }: Context
    ) => {
      return dataSources.musicAPI.getAlbum(args.id);
    },
  },
  Album: {
    artist: (
      parent: DataSourceTypes.AlbumResponse,
      _args: any,
      { dataSources }: Context
    ) => {
      const artistId = parent.artist;
      return dataSources.musicAPI.getArtist(artistId);
    },
  },
  Mutation: {
    createAlbum: async (
      _parent: any,
      { input }: Schema.MutationCreateAlbumArgs,
      { dataSources }: Context
    ) => {
      return dataSources.musicAPI.createAlbum(input.title, input.artistId);
    },
  },
  CreateAlbumPayload: {
    __resolveType: (parent: DataSourceTypes.CreateAlbumResponse) => {
      if (DataSourceTypes.isCreateAlbumError(parent)) {
        return "CreateAlbumFailure";
      }
      return "CreateAlbumSuccess";
    },
  },
  CreateAlbumSuccess: {
    album: (parent: DataSourceTypes.NewAlbum) => parent,
  },
  CreateAlbumFailure: {
    errors: (parent: DataSourceTypes.CreateAlbumError) => [parent],
  },
  CreateAlbumError: {
    __resolveType: (parent: DataSourceTypes.CreateAlbumError) => {
      if (DataSourceTypes.isArtistNotFoundError(parent)) {
        return "ArtistNotFoundError";
      }
      return "DuplicateAlbumError";
    },
  },
  ArtistNotFoundError: {
    message: () => "Artist not found",
  },
  DuplicateAlbumError: {
    message: () => "Album already exists",
  },
};
