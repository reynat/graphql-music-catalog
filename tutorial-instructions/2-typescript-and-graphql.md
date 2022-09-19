# Part 2: Typescript and GraphQL
We will use the [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator#readme) tool to generate types out of our schema and use them in our resolvers.

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

4. Add another query that enables a client to get an album by id. You schema should now look like below.
``` graphql
type Query {
    albums: [Album]!
    album(id: ID!): Album
}
```
5. Hook up the data source and resolvers so that the query below can be successfully executed. Don't forget to run `yarn generate` to use those types! 
```graphql
query {
  album(id: "album-1") {
    title
  }
}
```

Navigate to GIT TAG to see the solution