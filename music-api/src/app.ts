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
  console.log("Received request for /albums")
  res.status(200).send(albums);
});

app.get('/albums/:id', (req: express.Request, res: express.Response) => {
  console.log(`Received request for album id ${req.params.id}`)
  const result = getAlbumById(req.params.id);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send();
  }
});

app.get('/artists', (req: express.Request, res: express.Response) => {
  console.log("Received request for /artists")
  res.status(200).send(artists);
});

app.get('/artists/:id', (req: express.Request, res: express.Response) => {
  console.log(`Received request for artist id ${req.params.id}`)
  const result = getArtistById(req.params.id);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send();
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Music API server is running at http://localhost:${port}`);
});