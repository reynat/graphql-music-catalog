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

export type ArtistNotFoundError = {
  message: string;
};

export const isArtistNotFoundError = (
  error: ArtistNotFoundError | CreateAlbumResponse
): error is ArtistNotFoundError =>
  (error as ArtistNotFoundError).message !== undefined;
