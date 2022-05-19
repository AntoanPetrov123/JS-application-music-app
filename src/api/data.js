//all requests

import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//get all albums
export async function getAllAlbums(){
    return api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

//create album
//specifics 
/*
{
  name,
  imgUrl,
  price,
  releaseDate,
  artist,
  genre,
  description
}
 */
export function createAlbum(album){
    return api.post('/data/albums', album);
}

//get album 
export async function getAlbumById(id){
    return api.get('/data/albums/' + id);
}

//edit album 
//specifics 
/*
{
  name,
  imgUrl,
  price,
  releaseDate,
  artist,
  genre,
  description
}
 */
export async function editAlbum(id, album){
    return api.put('/data/albums/' + id, album);
}

//delete album
export async function deleteAlbum(id){
    return api.del('/data/albums/' + id);
}

//srearch album
export async function getSearchAlbums(name) {
    return await api.get('/data/albums?where=name%20LIKE%20%22' + name + '%22');
}

