import AbstractView from "../AbstractView.js";

export default class extends AbstractView {

    constructor() {
        super();
        this.setTitle('login###');
    }

    async getHTML() {

        return `

            <h1>login</h1>
            
            <form action="" method="get" class="login-form">
                    <label for="email">email: </label>
                    <input type="text" name="email" id="email" required />
                    <label for="email">password: </label>
                    <input type="password" name="password" id="password" required />
                    <a data-link href="/admin/home">login</a>
            </form>
        `
    }
}