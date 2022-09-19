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

export type NewAlbum = {
  id: string;
  title: string;
  artist: string;
};

export type CreateAlbumResponse = NewAlbum | CreateAlbumError;

export type CreateAlbumError = ArtistNotFoundError | DuplicateAlbumError;

type ArtistNotFoundError = {
  kind: "artist-not-found-error";
};

type DuplicateAlbumError = {
  kind: "duplicate-album-error";
};

export const isArtistNotFoundError = (
  response: CreateAlbumResponse
): response is ArtistNotFoundError =>
  (response as ArtistNotFoundError).kind === "artist-not-found-error";

export const isDuplicateAlbumError = (
  response: CreateAlbumResponse
): response is DuplicateAlbumError =>
  (response as DuplicateAlbumError).kind === "duplicate-album-error";
