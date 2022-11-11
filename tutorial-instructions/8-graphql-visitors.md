# Part 8: GraphQL Visitors

In the Candidate Graph, we collect metrics about our graph to understand its performance and diagnose issues. A common metric is the paths used within the graph to answer questions such as:
- Which part of the graph is most widely used?
- Which part of the graph has the highest latency?
- Which queries were causing errors in the graph?
- Which queries were affected when a certain resource API is down?

## Query result paths
``` graphql
query {
  albums {
    title
    artist {
        name
    }
  }
}
```
For each piece of information that a query returns, there is an associated query path, which consists of the fields in the GraphQL query that we followed to get that information. The query result paths for the example above are:
- query.albums.title
- query.albums.artist.name

Before we get to constructing these paths, we first need to understand how GraphQL works under the hood.

## Abstract syntax trees
When GraphQL receives a query, it converts it into an abstract syntax tree (AST) that conveys the the structure and content of that query. Apollo calls the AST a `document` and includes it in the `requestContext` object provided to an Apollo plugin.

1. Create a new plugin called `queryPathsPlugin` with the code below. Don't forget to include it in `app.ts` and run `yarn`.
``` ts
import { removeLoc } from "@graphql-tools/optimize";
import { GraphQLRequestContext } from "apollo-server-core";
import { ApolloServerPlugin } from "apollo-server-plugin-base";

export const queryPathsPlugin: ApolloServerPlugin = {
  requestDidStart: async (_requestContext: GraphQLRequestContext) => ({
    willSendResponse: async (requestContext: GraphQLRequestContext) => {
      const {
        document,
      } = requestContext;

      console.log(JSON.stringify(removeLoc(document)));
    },
  }),
};

```

2. Start the graph server and run the following query:
``` 
query {
  albums {
    title
    artist {
      name
    }
  }
}
```

3. Observe the AST that gets printed (using a JSON prettier tool like [this one](https://jsonformatter.org/json-pretty-print) might be helpful). It should look something like this:
```
{
  "kind": "Document",
  "definitions": [
    {
      "kind": "OperationDefinition",
      "operation": "query",
      "variableDefinitions": [],
      "directives": [],
      "selectionSet": {
        "kind": "SelectionSet",
        "selections": [
          {
            "kind": "Field",
            "name": {
              "kind": "Name",
              "value": "albums"
            },
            "arguments": [],
            "directives": [],
            "selectionSet": {
              "kind": "SelectionSet",
              "selections": [
                {
                  "kind": "Field",
                  "name": {
                    "kind": "Name",
                    "value": "title"
                  },
                  "arguments": [],
                  "directives": []
                },
                {
                  "kind": "Field",
                  "name": {
                    "kind": "Name",
                    "value": "artist"
                  },
                  "arguments": [],
                  "directives": [],
                  "selectionSet": {
                    "kind": "SelectionSet",
                    "selections": [
                      {
                        "kind": "Field",
                        "name": {
                          "kind": "Name",
                          "value": "name"
                        },
                        "arguments": [],
                        "directives": []
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
}
```

Notice that the AST contains a rich amount information about the query, such as which fields were requested, the arguments included, and the directives used. Let's traverse it!

## The visitor pattern
To traverse an AST, GraphQL uses a design pattern called a Visitor to "visit" each node within the AST. 

The plugin below uses a visitor that logs each time it enters and leaves a node of kind `Field`. Update your `logErrorPlugin` and and try running the `ExampleQuery` from above. Observe the order in which the nodes are entered and left. 

``` ts
import { removeLoc } from "@graphql-tools/optimize";
import { GraphQLRequestContext } from "apollo-server-core";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { visit } from 'graphql';

export const queryPathsPlugin: ApolloServerPlugin = {
  requestDidStart: async (_requestContext: GraphQLRequestContext) => ({
    willSendResponse: async (requestContext: GraphQLRequestContext) => {
      const {
        document,
      } = requestContext;

      visit(removeLoc(document), {
        Field: {
          enter: (node) => {
            console.log("Enter node", node)
          },
          leave: (node) => {
            console.log("Leave node", node)
          }
        }
      })
    },
  }),
};
```

A visitor uses a [depth-first-search algorithm](https://brilliant.org/wiki/depth-first-search-dfs/) to traverse an AST. This is important to know when we want to use it to manipulate the AST. In the Candidate Graph, we use this pattern to track usage of our schema. 

The visitor in the example above visits only the "Field" nodes. Our AST also has several other kinds, including "OperationDefinition", "SelectionSet" and "Name". Experiment with the visitor function to also visit the other nodes.


## Putting it all together
Have a go at writing a visitor that produces the result paths from a given query. Some understanding of depth-first-search algorithms might be helpful here.

Below is some skeleton to help you get started:
``` ts
export const queryPathsPlugin: ApolloServerPlugin = {
  requestDidStart: async (_requestContext: GraphQLRequestContext) => ({
    willSendResponse: async (requestContext: GraphQLRequestContext) => {
      const {
        document,
      } = requestContext;

      const currentFieldPath = [];
      const allFieldPaths = []
      visit(removeLoc(document), {
        OperationDefinition: {
          // write your visitor function here
        },
        Field: {
          // write your visitor function here
        }
      })

      console.log(allFieldPaths)
    },
  }),
};
```

Run `git checkout 8-graphql-visitors-solution` to see a sample solution.