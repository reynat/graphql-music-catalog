import express from 'express';
import { albums, artists } from './mock-data';

const app: express.Application = express();
const port = 8001;

const getArtistById = (artistId: string) => artists.find((artist) => artist.id === artistId)
const getAlbumById = (albumId: string) => albums.find((album) => album.id === albumId)

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send();
});

app.get('/albums', (req: express.Request, res: express.Response) => {
  res.status(200).send(albums);
});

app.get('/albums/:id', (req: express.Request, res: express.Response) => {
  res.status(200).send(getAlbumById(req.params.id));
});

app.get('/artists', (req: express.Request, res: express.Response) => {
  res.status(200).send(artists);
});

app.get('/artists/:id', (req: express.Request, res: express.Response) => {
  res.status(200).send(getArtistById(req.params.id));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Music API server is running at http://localhost:${port}`);
});