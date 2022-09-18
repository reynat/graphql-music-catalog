import { RESTDataSource } from "apollo-datasource-rest";
import { ApolloError } from "apollo-server-core";
import {
  AlbumResponse,
  ArtistResponse,
  CreateAlbumError,
  CreateAlbumResponse,
} from "./data-source-types";

export class MusicAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8001";
  }

  async getAlbums() {
    return this.get("/albums");
  }

  async getAlbum(id: string): Promise<AlbumResponse | undefined> {
    return this.get(`/albums/${id}`)
      .then((albumResponse) => albumResponse)
      .catch((error: ApolloError) => {
        if (error.extensions.response?.status === 404) {
          console.log(`Album id ${id} not found`);
          return;
        }
        return error;
      });
  }

  async getArtist(id: string): Promise<ArtistResponse | undefined> {
    return this.get(`/artists/${id}`)
      .then((albumResponse) => albumResponse)
      .catch((error: ApolloError) => {
        if (error.extensions.response?.status === 404) {
          console.log(`Artist id ${id} not found`);
          return;
        }
        return error;
      });
  }

  async createAlbum(
    title: string,
    artistId: string
  ): Promise<CreateAlbumResponse | undefined> {
    return this.post("/albums", {
      title,
      artistId,
    })
      .then((album) => album)
      .catch((error: ApolloError): CreateAlbumError | undefined => {
        if (error.extensions.response?.status === 404) {
          return {
            kind: "artist-not-found-error",
          };
        }
        if (error.extensions.response?.status === 422) {
          return {
            kind: "duplicate-album-error",
          };
        }
        console.log(error, "Error creating album"); // Exceptional errors
        return;
      });
  }
}
