import AbstractController from "../AbstractController.js";

export default class AdminLogin extends AbstractController {

    constructor() {
        super();
    }

    async showView() {
        document.querySelector('#app').innerHTML = await this.view.getHTML();
        await this.view.load();
    }

    async testPassword(testValues) {

        console.log(testValues);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: testValues.email,
                    password: testValues.password
                })
            });

            const data = await response.json();

            console.log('test login OK');
            console.log("email: " + testValues.email);
            console.log("pass: " + testValues.password);
            console.log("result:");
            console.log(data);

        } catch (error) {
            console.error('test login failed');
            console.error(error);
        }
    }
}