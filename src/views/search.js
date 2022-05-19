import { getSearchAlbums } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const template = (onSubmit, results) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>

        <form class="search" @submit="${onSubmit}">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button class="button-list">Search</button>
        </form>

        <h2>Results:</h2>

        <!--Show after click Search button-->
        <div class="search-result">
            ${results}
        </div>
    </section>
`;

const albumTemplate = (album, user) => html`
    <div class="card-box">
        <img src="${album?.imgUrl}" alt="${album?.name}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${album?.name}</p>
                <p class="artist">Artist: ${album?.artist}</p>
                <p class="genre">Genre: ${album?.genre}</p>
                <p class="price">Price: &dollar;${album?.price}</p>
                <p class="date">Release Date: ${album?.releaseDate}</p>
            </div>
            <div class="btn-group">
                ${user ? html`
                    <a href="/details/${album._id}" id="details">Details</a>
                ` : ''}
            </div>
        </div>
    </div>`;

export async function searchPage(ctx) {
  ctx.render(template(searchAlbums));

    const userData = !!getUserData();

  async function searchAlbums(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('search');

    if (name == '') {
      alert('Name is required');
      return;
    }

    const albums = await getSearchAlbums(name);

    const albumCards = albums && albums.length ? html`${albums.map(album => albumTemplate(album, userData))}` : html`<p
            class="no-result">No result.</p>`;
    ctx.render(template(searchAlbums, albumCards));
  }
}