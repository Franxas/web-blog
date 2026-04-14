import AbstractView from "../AbstractView.js";

export default class extends AbstractView {

    constructor() {
        super();
        this.setTitle('login###');
    }

    async getHTML() {

        return `

            <h1>login</h1>
            
            <form action="" method="get" class="login-form" id="pass-login-form">
                    <label for="email">email: </label>
                    <input type="text" name="email" id="email" required />
                    <label for="email">password: </label>
                    <input type="password" name="password" id="password" required />
                    <a id="submit-input" href="/">login</a>
                    <div id="error-mess" style= "color: red"></div>
            </form>
        `
    }

    async load() {

        const submitButton = document.getElementById("submit-input");
        const emailInput = document.getElementById("email");
        const passInput = document.getElementById("password");

        submitButton.addEventListener("click", async (e) => {
            e.preventDefault();
            const passVal = passInput.value;
            const emailVal = emailInput.value;
            if (!passVal) {
                const subDiv = document.getElementById("pass-login-form");
                const errMess = document.getElementById("error-mess");
                errMess.textContent = "invalid password";
                subDiv.appendChild(errMess);
            } else {
        
                // server side: compare input password value with saved password.

                console.log("testing pass");
                console.log(emailVal);
                console.log(passVal);
                this.controller.testPassword({email: emailVal, password: passVal});
            }
        })  
    }
}