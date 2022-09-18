export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Album = {
  __typename?: 'Album';
  artist: Artist;
  title: Scalars['String'];
};

export type Artist = {
  __typename?: 'Artist';
  name: Scalars['String'];
};

export type ArtistNotFoundError = CreateAlbumError & {
  __typename?: 'ArtistNotFoundError';
  message: Scalars['String'];
};

export type CreateAlbumError = {
  message: Scalars['String'];
};

export type CreateAlbumFailure = {
  __typename?: 'CreateAlbumFailure';
  error: CreateAlbumError;
};

export type CreateAlbumInput = {
  artistId: Scalars['ID'];
  title: Scalars['String'];
};

export type CreateAlbumPayload = CreateAlbumFailure | CreateAlbumSuccess;

export type CreateAlbumSuccess = {
  __typename?: 'CreateAlbumSuccess';
  album: Album;
};

export type DuplicateAlbumError = CreateAlbumError & {
  __typename?: 'DuplicateAlbumError';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAlbum: CreateAlbumPayload;
};


export type MutationCreateAlbumArgs = {
  input: CreateAlbumInput;
};

export type Query = {
  __typename?: 'Query';
  album?: Maybe<Album>;
  albums: Array<Maybe<Album>>;
};


export type QueryAlbumArgs = {
  id: Scalars['ID'];
};
