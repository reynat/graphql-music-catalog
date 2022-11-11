import { GraphQLRequestContext } from "apollo-server-core";
import { ApolloServerPlugin } from "apollo-server-plugin-base";

export const logErrorPlugin: ApolloServerPlugin = {
  requestDidStart: async (_requestContext: GraphQLRequestContext) => ({
    willSendResponse: async (requestContext: GraphQLRequestContext) => {
      if (requestContext.response.errors !== undefined) {
        console.log("🚨 Exceptional error found!");
      }
    },
  }),
};
