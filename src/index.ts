import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

const server = new ApolloServer({
  typeDefs,
  resolvers: [],
  dataSources: () => ({}),
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true})
  ]
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
