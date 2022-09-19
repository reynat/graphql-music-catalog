# Part 6: Mutation Patterns

## Include a mutation with happy path only
1. Let's add a mutation to our schema to allow clients to add a new album. Notice that the input parameters are encapsulated in its own type. The reasons for doing this are: 
    - Encapsulates the logic required for a given query/mutation
    - Avoids breaking changes in the future
``` graphql
type Mutation {
    createAlbum(input: CreateAlbumInput!): Album!
}   

input CreateAlbumInput {
    artistId: ID!
    title: String!
}
```

2. Complete the resolver to execute the following query:
```graphql
mutation($input: CreateAlbumInput!) {
  createAlbum(input: $input) {
    title
    artist {
      name
    }
  }
}
```
```json
// Variables
{
  "input": {
    "title": "evermore",
    "artistId": "artist-1"
  }
}
```

3. Play around with variables. What happens when you include an invalid artist id? Can you add the same album twice?

___

GraphQL errors were originally designed to represent exceptional errors, not necessarily product or business errors that need to be relayed to the end-user. It is helpful to divide errors into two broad categories to understand what goes where:
- Exceptional errors: something went wrong during the query (e.g. network timeouts) These are often errors that developers need to deal with.
- Business errors: the user did something wrong (e.g. creating a duplicate album). These errors should be treated as data and explicitly modelled in our schema.

---
## Model a single business error
4. We first model the business error that happens when creating an album for an artist that does not exist. Below is an example schema.     
    - Notice that a `union` type is used. This allows us to add custom fields to each error scenario, such as a `message` to display to the user when the artist cannot be found.
    - The previous query used in step 2 is now invalid. [Inline fragments](https://atheros.ai/blog/how-to-query-your-schema-with-graphql-fragments) are used to conditionally execute the query at runtime.
``` graphql
 type Mutation {
    createAlbum(input: CreateAlbumInput!): CreateAlbumPayload!
}
input CreateAlbumInput {
    artistId: ID!
    title: String!
}
union CreateAlbumPayload = Album | ArtistNotFoundError
type ArtistNotFoundError {
    message: String!
}
```
``` graphql
mutation($input: CreateAlbumInput!) {
  createAlbum(input: $input) {
    ... on Album {
      title
      artist {
        name
      }
    } 
    ... on ArtistNotError {
        message
    }
  }
}
```
5. Try writing the resolver for the `CreateAlbumPayload` type. Refer to [this article](https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/#resolving-a-union) to learn about resolving unions.

Checkout to GIT TAG to see a sample solution

---
## Model multiple business errors
1. Let's include the business error that happens when the user attempts to create a duplicate album. Check out to GIT TAG for skeleton code.
    - Note that there are data source types that capture the business errors returned from the Music API
2. Update the schema to model the possibility of having two business errors and update the resolvers.

---
## Prevent breaking changes by encapsulating success and failure cases in their own types
1. In the Candidate Graph, we make success and failure cases even more explicit. Check out to GIT TAG for skeleton code
    - The result payload is a union of success and failure. In many cases unions are problematic because additions to them are breaking, however, the assumption here is that a mutation can only ever succeed or fail - ever.
    - The failure type contains a list of errors. The error type is an interface.
    - The error type interface contains an error string that should be human readable. If all else fails, the error message should be able to be displayed to the end user.
    - Specific error types implement the error interface. These errors would have types specific to business rules. It enables graph clients to take action based on the type of error. Extra properties can be added to any specific error type to assist clients to take appropriate actions.
