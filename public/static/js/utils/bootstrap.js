import HomeView from "../views/HomeView.js";
import HomeController from "../controllers/HomeController.js";
import PostsController from "../controllers/PostsController.js";
import PostsView from "../views/PostsView.js";
import ProjectsController from "../controllers/ProjectsController.js";
import ProjectsView from "../views/ProjectsView.js";
// admin
import AdminLoginView from "../views/admin/AdminLoginView.js";
import AdminLoginController from "../controllers/admin/AdminLoginController.js";
import AdminHomeView from "../views/admin/AdminHomeView.js";
import AdminHomeController from "../controllers/admin/AdminHomeController.js";
import EntryEditorView from "../views/admin/EntryEditorView.js";
import EntryEditorController from "../controllers/admin/EntryEditorController.js";


const init = function() { // this might hahve to be asynchronous

    //admin
    // login dependencies
    const adminLoginController = new AdminLoginController();
    const adminLoginView = new AdminLoginView();
    adminLoginController.setView(adminLoginView);
    // home dependencies
    const adminHomeController = new AdminHomeController();
    const adminHomeView = new AdminHomeView();
    adminHomeController.setView(adminHomeView);
    // editor dependencies
    const editorController = new EntryEditorController();
    const editorView = new EntryEditorView();
    editorController.setView(editorView);

    //user
    // home dependencies
    const homeController = new HomeController();
    const homeView = new HomeView();
    homeController.setView(homeView);

    // posts dependencies
    const postsController = new PostsController();
    const postsView = new PostsView();
    postsController.setView(postsView);

    // projects dependencies
    const projectsController = new ProjectsController();
    const projectsView = new ProjectsView();
    projectsController.setView(projectsView);


    return {
        adminLogin: adminLoginController,
        adminHome: adminHomeController,
        home: homeController,
        posts: postsController,
        projects: projectsController,
        editor: editorController
    }
}

export default init();