# GraphQL Music Catalog
This repository contains a basic system of services to facilitate the introduction of GraphQL concepts, patterns, and best practices used in the Candidate Graph. 

> ⚠️ **This is not production ready code:** This is for demonstration purposes only and should never be deployed.

## Prerequisites
This tutorial assumes a basic understanding of Typescript and GraphQL principles.

Helpful tutorial links to get started with GraphQL:
- [Getting started with Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started/)
- [Apollo Odyssey tutorials](https://www.apollographql.com/tutorials/)

## Run locally
This repository contains two APIs, one for GraphQL and another for the resource Music API. 

To set up the GraphQL API, open a new terminal in this repository and follow the steps below:
1. Navigate to the `graphql-api` folder
```
cd graphql-api
```
2. Set up the dependencies 
```
yarn
```
3. Startup service
```
yarn start
```

Repeat this on another terminal for `music-api`.

| Service      | Location |
| ----------- | ----------- |
| GraphQL API      | [localhost:4000](http://localhost:4000)       |
| Music API   | [localhost:8001](http://localhost:8001)        |

To confirm the system has been instantiated correctly, you can visit the [GraphQL Playground](http://localhost:4000) where you can explore the current schema and test an example query.

## Development
You will only be developing on the GraphQL API. `nodemon` will automatically restart the application when file changes in the directory are detected.

Tests can be run using
```
yarn test
```

## TO DO
- Include custom scalar
- Include custom enum
- Include pagination
- RESTDataSource caching + batching