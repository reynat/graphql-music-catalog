import { RESTDataSource } from "apollo-datasource-rest";
import { ApolloError } from "apollo-server-core";

export class MusicAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8001";
  }

  async getAlbums() {
    return this.get("/albums");
  }

  async getAlbum(id: string) {
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
}
