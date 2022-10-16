import { ApolloServerPlugin } from "apollo-server-plugin-base";

export const logErrorPlugin: ApolloServerPlugin = {
  requestDidStart: async (_requestContext) => ({
    willSendResponse: async (requestContext) => {
      if (requestContext.response.errors !== undefined) {
        console.log("🚨 Exceptional error found!");
      }
    },
  }),
};
