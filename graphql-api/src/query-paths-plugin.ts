import { removeLoc } from "@graphql-tools/optimize";
import { GraphQLRequestContext } from "apollo-server-core";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { visit } from "graphql";

export const queryPathsPlugin: ApolloServerPlugin = {
  requestDidStart: async (_requestContext: GraphQLRequestContext) => ({
    willSendResponse: async (requestContext: GraphQLRequestContext) => {
      const { document } = requestContext;

      const currentFieldPath = [];
      const allFieldPaths = [];
      visit(removeLoc(document), {
        OperationDefinition: {
          enter(node) {
            currentFieldPath.push(node.operation);
          },
        },
        Field: {
          enter(node) {
            if (node.name.kind === "Name") {
              currentFieldPath.push(node.name.value);
            }
          },
          leave(node) {
            if (node.selectionSet === undefined) {
              // reached a leaf node
              allFieldPaths.push([...currentFieldPath]);
              currentFieldPath.pop();
            }
          },
        },
      });

      console.log(allFieldPaths);
    },
  }),
};
