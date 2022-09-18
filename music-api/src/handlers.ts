import { albums, artists } from "./mock-data";

export const getArtistById = (artistId: string) =>
  artists.find((artist) => artist.id === artistId);

export const getAlbumById = (albumId: string) =>
  albums.find((album) => album.id === albumId);

export const createNewAlbum = (artistId: string, albumTitle: string) => {
  if (getArtistById(artistId)) {
    const newAlbum = {
      id: `album-${albums.length + 1}`,
      title: albumTitle,
      artist: artistId,
    };
    albums.push(newAlbum);
    return newAlbum;
  }
  return;
};

export const isDuplicateAlbum = (artistId: string, albumTitle: string) => 
albums.find((album) => album.title === albumTitle && album.artist === artistId)

