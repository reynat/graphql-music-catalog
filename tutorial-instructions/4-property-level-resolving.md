# Part 4: Property Level Resolving
1. Update the schema to return the artist for an album.
    ``` graphql
    type Album {
      title: String!
      artist: Artist!
    }

    type Artist {
      name: String!
    }

    type Query {
      albums: [Album]!
      album(id: ID!): Album
    }
    ```

2. Run the following query and observe the response. Notice how null values are propogated up the graph.
    ``` graphql
    query {
      album(id: "album-1") {
        title
        artist {
          name
        }
      }
    }
    ```

3. Write the Artist resolver using the information received from the parent `Query.album` resolver. 
    - You can declare types in the data source layer and use them in your resolver file. To avoid confusion between the different types, you can import them in your resolver file like below: 
      ``` js
      import * as DataSourceTypes from "./data-source";
      import * as Schema from "./generated/graphql";
      ```

4. Query for  album id `album-1` and then for `album-2` and observe the responses (mock data in Music API has an incorrect id). Notice how nulls get propagated up the schema when a nested field cannot be resolved. 

## Resolver chain
The resolver chain for the query above matches the hierarchical structure of the query itself
![Alt Resolver chain](./resolver-chain.png)

In this example, parent resolvers do not process the data returned from the MusicAPI data source, so the parent type received by child resolvers are DataSourceTypes.  
![Alt Resolver sequence diagram](./resolver-sequence-diagram.png)