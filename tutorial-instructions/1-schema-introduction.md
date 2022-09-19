# Part 1: Schema Introduction
1. Run `git checkout 1-schema-introduction-code`. 
2. Navigate to `graphql-api/src/schema.ts` and observe the GraphQL schema. Clients will be able to execute a query named `albums`, and our server will return an array of zero or more `Album`s.
3. Based on the endpoints available on the Music API, create a basic Apollo RESTDataSource that talks to the Music API to get a list of albums. Apollo RESTDataSource documentation can be found [here](https://www.apollographql.com/docs/apollo-server/data/data-sources/#restdatasource).
4. Write the resolver code required to execute the following query:
```
query {
    albums {
        title
    }
}
```
5. Run `git checkout 1-schema-introduction-solution` to see a sample solution.