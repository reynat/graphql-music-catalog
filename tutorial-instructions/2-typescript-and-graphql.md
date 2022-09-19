# Part 2: Typescript and GraphQL
The [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator#readme) is a tool that generates code out of a schema. In our case, we will be generating Typescript types to be used in our resolvers.

1. Run
```
yarn add @graphql-codegen/cli @graphql-codegen/typescript -D
```

2. Create a `codegen.yml` file in the root folder of `graphql-api` and include the code below.
``` yml
overwrite: true
schema: "src/schema.ts"
documents: null
generates:
  src/generated/graphql.ts:
    plugins:
      - "typescript"
```

3. Include a script in `package.json`
```
"generate": "graphql-codegen --config codegen.yml"
```

4. Run `yarn generate` and notice the types generated in `src/generated/graphql.ts`. 

5. Add another query that enables a client to get an album by id. Your schema should now look like the one below.
``` graphql
type Query {
    albums: [Album]!
    album(id: ID!): Album
}
```

6. Hook up the data source and resolvers so that the query below can be successfully executed. The type `QueryAlbumArgs` can be helpful when building the `Query.album` resolver.
```graphql
query {
  album(id: "album-1") {
    title
  }
}
```

Navigate to GIT TAG to see the solution