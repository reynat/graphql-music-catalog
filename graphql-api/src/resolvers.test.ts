import { ApolloServer, gql } from "apollo-server";
import { mock } from "jest-mock-extended";
import { AlbumResponse, MusicAPI } from "./data-source";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

describe("album Query resolver", () => {
  it("should return an album when a valid ID is provided", async () => {
    const query = gql`
        """insert graphql query"""
    `;
    const musicAPI = mock<MusicAPI>();
    // Insert test response data
    const testAlbumResponse: AlbumResponse = {};
    musicAPI.getAlbum.mockResolvedValueOnce(testAlbumResponse);

    const testServer = new ApolloServer({
      typeDefs,
      resolvers,
      dataSources: () => ({
        musicAPI,
      }),
    });

    const result = await testServer.executeOperation({
      query,
    });

    expect(result.data).toEqual({});
    expect(result.errors).toEqual({});
  });
});
