import { RESTDataSource } from "apollo-datasource-rest";

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

export type CreateAlbumResponse = {
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

  async getAlbum(id: string) {
    return this.get(`/albums/${id}`);
  }

  async getArtist(id: string): Promise<ArtistResponse | undefined> {
    return this.get(`/artists/${id}`);
  }

  async createAlbum(
    title: string,
    artistId: string
  ): Promise<CreateAlbumResponse | undefined> {
    return this.post("/albums", {
      title,
      artistId,
    });
  }
}
