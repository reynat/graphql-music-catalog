# Part 1: Schema Introduction
1. Navigate to `graphql-api/src/schema.ts` and observe the GraphQL schema. Clients will be able to execute a query named `albums`, and our server will return an array of zero or more `Album`s.
2. Based on the endpoints available on the Music API, create a basic Apollo RESTDataSource that talks to the Music API to get a list of albums. Apollo RESTDataSource documentation can be found [here](https://www.apollographql.com/docs/apollo-server/data/data-sources/#restdatasource).
3. Write the resolver code required to execute the following query:
```
query {
    albums {
        title
    }
}
```

Git checkout to INSERT GIT TAG HERE to see the solution