import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { MusicAPI } from "./data-source";

export interface Context {
  dataSources: DataSources
}

interface DataSources {
}

const server = new ApolloServer({
  typeDefs,
  resolvers: [],
  dataSources: () => ({
    musicApi: new MusicAPI()
  }),
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true})
  ]
});

server.listen().then(({ url }) => {
  console.log(`🚀 GraphQL server ready at ${url}`);
});
