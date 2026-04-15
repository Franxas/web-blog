import controllers from "./utils/bootstrap.js";


const router = async () => {

    const routes = [
            { path: '/admin/login', controller: controllers.adminLogin },
            { path: '/admin/home', controller: controllers.adminHome },
            { path: '/admin/editor', controller: controllers.editor},
            { path: '/', controller: controllers.home },
            { path: '/posts', controller: controllers.posts},
            { path: '/projects', controller: controllers.projects},
            { path: '/synth', controller: controllers.synth}
    ];

    const match = routes.find(route => route.path === location.pathname) || routes[0]; //location.pathname meaning the path portion of the current url
    const controller = match.controller;

    console.log()

    if (controllers.synth.getState()) {
        await controllers.synth.stop();
    }
    await controller.showView();
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

    window.addEventListener('popstate', router);

    router();
})