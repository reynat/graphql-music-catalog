import { RESTDataSource } from "apollo-datasource-rest";
import { ApolloError } from "apollo-server-core";

export type ArtistResponse = {
  id: string;
  name: string;
  country: string;
};

export type AlbumResponse = {
  id: string;
  title: string;
  artist: string;
};

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
}
