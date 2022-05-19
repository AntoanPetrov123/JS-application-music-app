import{ page } from './lib.js';
import decorateContext, { updateUserNav} from './middlewears/decorateContext.js';
import { catalogPage } from './views/catalog.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { detailsPage } from './views/details.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/search.js';


page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/details/:id', detailsPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/search', searchPage);


updateUserNav();

page.start();