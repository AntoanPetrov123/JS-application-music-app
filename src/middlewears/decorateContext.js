import { logout } from '../api/data.js';
import{ page, render } from '../lib.js';
import { getUserData } from '../util.js';



const root = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

//add elements to main in html file
export default function decorateContext(ctx, next){

    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}

//update navigation bar
export function updateUserNav(){
    const userData = getUserData(); //from util file

    if(userData){
        //in index.html
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    }else{
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

function onLogout(){
    logout();
    updateUserNav();
    page.redirect('/');
}