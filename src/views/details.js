import { deleteAlbum, getAlbumById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (album, isOwner, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${album.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: $${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>Description: ${album.description}</p>
            </div>
            <div class="actionBtn">
                <!-- Only for registered user and creator of the album-->
                ${albumTemplates(album, isOwner, onDelete)}
            </div>
        </div>
    </div>
</section>`;

const albumTemplates = (album, isOwner, onDelete) => {
    if (isOwner) {
        return html`
            <a href="/edit/${album._id}" class="edit">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
            </div>`
    } else {
        return null;
    }
}

export async function detailsPage(ctx) {
    const album = await getAlbumById(ctx.params.id);
    const userData = getUserData();

    const isOwner = userData && userData.id == album._ownerId;


    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete ${album.title}`);

        if (choice) {
            await deleteAlbum(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }

    ctx.render(detailsTemplate(album, isOwner, onDelete));
}