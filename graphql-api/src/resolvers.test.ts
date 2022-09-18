import { ApolloServer, gql } from "apollo-server";
import { mock } from "jest-mock-extended";
import { MusicAPI } from "./data-source";
import { AlbumResponse } from "./data-source-types";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

describe("album Query resolver", () => {
  it("should return an album when a valid ID is provided", async () => {
    const query = gql`
      query {
        album(id: "valid-album-id") {
          title
        }
      }
    `;
    const musicAPI = mock<MusicAPI>();
    const testAlbumResponse: AlbumResponse = {
      id: "valid-album-id",
      title: "some-title",
      artist: "valid-artist-id",
    };
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

    expect(result.data).toEqual({
      album: {
        title: "some-title",
      },
    });
    expect(result.errors).toBeUndefined();
  });

  it("should return null with no errors when an invalid ID is provided and musicAPI returns undefined", async () => {
    const query = gql`
      query {
        album(id: "invalid-album-id") {
          title
        }
      }
    `;
    const musicAPI = mock<MusicAPI>();
    musicAPI.getAlbum.mockResolvedValueOnce(undefined);

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

    expect(result.data).toEqual({
      album: null,
    });
    expect(result.errors).toBeUndefined();
  });
});
