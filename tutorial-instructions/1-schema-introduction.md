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

## Query execution flow
Let's understand how the query is executed and data is collected. 
1. The query arrives at the server.
2. The server invokes the resolver for the root field `albums`. Let's assume that `musicApi.getAlbums()` returns a list of objects: 
``` json
[
  {
    "id": "album-1",
    "title": "1989",
  },
  {
    "id": "album-2",
    "title": "Red",
  }
]
```
3. For each object returned, the server invokes the resolver for the field `title` on the `Album` user type. The _parent_ input argument for this resolver is the return value from the previous invocation, so it can simply return `parent.title`.
4. The resolution process is terminated, and the result gets wrapped with a `data` field to [adhere to the GraphQL spec](https://spec.graphql.org/October2016/#sec-Data).
``` json
{
  "data": {
    "albums": [
        {
            "title": "1989"
        },
        {
            "title": "Red"
        }
    ]
  }
}
```


**🤔 Wondering why there's no resolver for `album.id` in the sample solution but it still works?**

When using GraphQL.js, you don’t have to implement the resolver if the implementation is as trivial as in the example. You can thus omit their implementation since GraphQL.js already infers what it needs to return based on the names of the fields and the parent argument.



_Reference: https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e_
