# Part 3: Null Propagation
1. Run `git checkout 3-null-propagation-code`. 

2. Observe what is returned when the following query is run:
``` graphql
query {
  album(id: "invalid-id") {
    title
  }
}
```

3. Observe any differences in the response when the return type for the `album` query is non-nullable instead.
```
type Query {
    albums: [Album]!
    album(id: ID!): Album!
  }
```

4. Revert any changes to the schema so that the return type for an album by id is nullable. 

5. Run `git checkout 3-null-propagation-solution` to see a sample solution.