import { Context } from "./app";

export const resolvers = {
    Query: {
        albums: (_parent: any, _args: any, context: Context) => {
            return context.dataSources.musicAPI.getAlbums()
        }
    }
}