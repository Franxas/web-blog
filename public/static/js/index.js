import controllers from "./utils/bootstrap.js";

const router = async () => {

    const routes = [
            { path: '/admin/login', controller: controllers.adminLogin },
            { path: '/admin/home', controller: controllers.adminHome },
            { path: '/admin/editor', controller: controllers.editor},
            { path: '/', controller: controllers.home },
            { path: '/posts', controller: controllers.posts},
            { path: '/projects', controller: controllers.projects}
    ];

    const match = routes.find(route => route.path === location.pathname) || routes[0]; //location.pathname meaning the path portion of the current url
    console.log('test match');
    console.log(match);
    const controller = match.controller;
    await controller.showView();
    
    try { //this so that the editor runs when needed with no errors when not
        controller.getView().loadEditor();
    } catch (error) {
        console.log("no editor test");
    }
} 

const navigate = function(url) {

    history.pushState(null, null, url);
    router();
}

document.addEventListener('DOMContentLoaded', () => {


    document.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigate(e.target.href);
        }
    })

    router();
})