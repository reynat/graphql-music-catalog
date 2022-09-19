import { Context } from "./app";
import { QueryAlbumArgs } from "./generated/graphql";

export const resolvers = {
  Query: {
    albums: (_parent: any, _args: any, context: Context) => {
      return context.dataSources.musicAPI.getAlbums();
    },
    album: (_parent: any, args: QueryAlbumArgs, context: Context) => {
      return context.dataSources.musicAPI.getAlbum(args.id);
    },
  },
};
