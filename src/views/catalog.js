import { getAllAlbums } from '../api/data.js';
import {html} from '../lib.js';
import { getUserData } from '../util.js';


const catalogTemplate = (album, userData) => html`
<section id="catalogPage">
    <h1>All Albums</h1>

    ${album.length == 0 ? html`<p>No Albums in Catalog!</p>` : album.map(album => albumTemplate(album, userData))} 

</section>`;

const albumTemplate = (album, user) => html`
<div class="card-box">
    <img src="${album.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        <div class="btn-group">
        ${user ? html`
            <a href="/details/${album._id}" id="details">Details</a>`
             : ''}
        </div>
    </div>
</div>`;

export async function catalogPage(ctx){
    const album = await getAllAlbums();

    const userData = !!getUserData();

    ctx.render(catalogTemplate(album, userData)); 
}