import express from "express";
import {
  getAlbumById,
  createNewAlbum,
  getArtistById,
  isDuplicateAlbum,
} from "./handlers";
import { albums, artists } from "./mock-data";

const app: express.Application = express();
const port = 8001;

app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send();
});

app.get("/albums", (req: express.Request, res: express.Response) => {
  console.log("Received request for /albums");
  res.status(200).send(albums);
});

app.get("/albums/:id", (req: express.Request, res: express.Response) => {
  console.log(`Received request for album id ${req.params.id}`);
  const result = getAlbumById(req.params.id);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send();
  }
});

app.post("/albums", (req: express.Request, res: express.Response) => {
  const validRequestBody = (req: express.Request) =>
    req.body.title && req.body.artistId;

  if (!validRequestBody(req)) {
    return res.status(400).send("Album title and artist id must be provided");
  }

  const newAlbumTitle = req.body.title;
  const newAlbumArtistId = req.body.artistId;
  console.log(
    `Received request to create new album ${newAlbumTitle} for artist ${newAlbumArtistId}`
  );

  if (isDuplicateAlbum(newAlbumArtistId, newAlbumTitle)) {
    return res.status(422).send("Duplicate album");
  }

  const result = createNewAlbum(newAlbumArtistId, newAlbumTitle);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send("Invalid artist id");
  }
});

app.get("/artists", (req: express.Request, res: express.Response) => {
  console.log("Received request for /artists");
  res.status(200).send(artists);
});

app.get("/artists/:id", (req: express.Request, res: express.Response) => {
  console.log(`Received request for artist id ${req.params.id}`);
  const result = getArtistById(req.params.id);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send();
  }
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: Music API server is running at http://localhost:${port}`
  );
});
