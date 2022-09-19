# Part 3: Null Propagation
1. Observe what is returned when the following query is run:
``` graphql
query {
  album(id: "invalid-id") {
    title
  }
}
```

2. Observe any differences in the response when the return type for the `album` query is non-nullable instead.
```
type Query {
    albums: [Album]!
    album(id: ID!): Album!
  }
```



3. Revert any changes to the schema so that the return type for an album by id is nullable. 

