# Part 6: Mutation Patterns

1. [ Include a mutation that always succeeds ](#happy-path)
2. [ Model a single business error ](#single-business-error)
3. [ Model multiple business errors ](#multiple-business-errors)
4. [ Encapsulate success and failure cases in their own types ](#complex-mutation-payload)

<a name="happy-path"></a>
## Include a mutation that always succeeds
1. Run `git checkout 6-mutation-patterns-code`.

2. Let's add a mutation to our schema to allow clients to add a new album. 
    ``` graphql
    type Mutation {
        createAlbum(input: CreateAlbumInput!): Album!
    }   

    input CreateAlbumInput {
        artistId: ID!
        title: String!
    }
    ```

    >Notice that the input parameters are encapsulated in its own type. The reasons for doing this are: 
        >- Encapsulates the logic required for a given query/mutation
        >- Avoids breaking changes in the future

3. Complete the resolver to execute the following query:
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

4. Play around with the variables. What happens when you include an invalid artist id? Can you add the same album twice?

5. Run `git checkout 6-happy-path-solution` to see a sample solution.

---
<a name=single-business-errors></a>
## Model a single business error
>GraphQL errors were originally designed to represent exceptional errors, not necessarily product or business errors that need to be relayed to the end-user. It is helpful to divide errors into two broad categories to understand what goes where:
  >- Exceptional errors: something went wrong during the query (e.g. network timeouts). These are often errors that developers need to deal with.
  >- Business errors: the user did something wrong (e.g. creating a duplicate album). These errors should be treated as data and explicitly modelled in our schema.

1. We first model the business error that happens when the user creates an album for an artist that does not exist. Below is an example schema and query.     
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
        ... on ArtistNotFoundError {
            message
        }
      }
    }
    ```
    >- Notice that a `union` type is used. This allows us to add custom fields to each error scenario, such as a `message` to display to the user when the artist cannot be found.
    >- The previous query used in step 2 is now invalid. [Inline fragments](https://atheros.ai/blog/how-to-query-your-schema-with-graphql-fragments) are used to conditionally execute the query at runtime.

2. Try writing the resolver for the `CreateAlbumPayload` type. Refer to [this article](https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/#resolving-a-union) to learn about resolving unions.

3. Run `git checkout 6-single-business-error-solution` to see a sample solution.

---
<a name=multiple-business-error></a>
## Model multiple business errors
1. Run `git checkout 6-multiple-business-errors-code`.
2. Let's include the business error that happens when the user attempts to create a duplicate album.
    - Note that there are data source types that capture the business errors returned from the Music API
3. Update the schema to model the possibility of having two business errors and update the resolvers.
4. Run `git checkout 6-multiple-business-errors-solution` to see a sample solution.

---
<a name="complex-mutation-payload"></a>
## Encapsulate success and failure cases in their own types
1. Run `git checkout 6-complex-payload-code` for skeleton code and observe the pattern used to model success and failure cases.

    >In the Candidate Graph, this pattern is commonly used for mutations and treatment of results. Some features to note are:
      >- The result payload is a union of success and failure. In many cases unions are problematic because additions to them are breaking, however, the assumption here is that a mutation can only ever succeed or fail - ever.
      >- The failure type contains a list of errors. The error type is an interface.
      >- The error type interface contains an error string that should be human readable. If all else fails, the error message should be able to be displayed to the end user.
      >- Specific error types implement the error interface. These errors would have types specific to business rules. It enables graph clients to take action based on the type of error. Extra properties can be added to any specific error type to assist clients to take appropriate actions.

2. Update the resolvers so that the query below can be executed for all success and failure cases.
    ```graphql
    mutation($input: CreateAlbumInput!) {
      createAlbum(input: $input) {
      ... on CreateAlbumSuccess {
        album {
          title
          artist {
            name
          }
        }
      }
      ... on CreateAlbumFailure {
        errors {
          message
        }
      }
      }
    }
    ```

3. Run `git checkout 6-complex-payload-solution` to see a sample solution.