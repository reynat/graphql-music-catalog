import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { MusicAPI } from "./data-source";
import { resolvers } from "./resolvers";

export interface Context {
  dataSources: DataSources
}

interface DataSources {
  musicAPI: MusicAPI
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    musicAPI: new MusicAPI()
  }),
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true})
  ]
});

server.listen().then(({ url }) => {
  console.log(`🚀 GraphQL server ready at ${url}`);
});
