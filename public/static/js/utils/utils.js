    
    export default async function glitchWindow() {

            const rect1 = document.createElement("div");
            const rect2 = document.createElement("div");
            const rect3 = document.createElement("div");
            const rect4 = document.createElement("div");

            let xPos1 = (Math.random() * 500) + 300;
            let yPos1 = Math.random() * 300;
            let width1 = Math.random() * 500;
            let height1 = Math.random() * 500;
            rect1.style.display = "none";
            rect1.style.position = "absolute";
            rect1.style.top = `${yPos1}px`;
            rect1.style.left = `${xPos1}px`;
            rect1.style.width = `${width1}px`;
            rect1.style.height = `${height1}px`;
            rect1.style.backgroundColor = `black`;

            let xPos2 = (Math.random() * 500) + 300;
            let yPos2 = Math.random() * 300;
            let width2 = Math.random() * 500;
            let height2 = Math.random() * 500;
            rect2.style.display = "none";
            rect2.style.position = "absolute";
            rect2.style.top = `${yPos2}px`;
            rect2.style.left = `${xPos2}px`;
            rect2.style.width = `${width2}px`;
            rect2.style.height = `${height2}px`;
            rect2.style.backgroundColor = `black`;

            let xPos3 = (Math.random() * 500) + 300;
            let yPos3 = Math.random() * 300;
            let width3 = Math.random() * 500;
            let height3 = Math.random() * 500;
            rect3.style.display = "none";
            rect3.style.position = "absolute";
            rect3.style.top = `${yPos3}px`;
            rect3.style.left = `${xPos3}px`;
            rect3.style.width = `${width3}px`;
            rect3.style.height = `${height3}px`;
            rect3.style.backgroundColor = `white`;

            let xPos4 = (Math.random() * 500) + 300;
            let yPos4 = Math.random() * 300;
            let width4 = Math.random() * 500;
            let height4 = Math.random() * 500;
            rect4.style.display = "none";
            rect4.style.position = "absolute";
            rect4.style.top = `${yPos4}px`;
            rect4.style.left = `${xPos4}px`;
            rect4.style.width = `${width4}px`;
            rect4.style.height = `${height4}px`;
            rect4.style.backgroundColor = `white`;

            const appWindow = document.getElementById("app");
            appWindow.appendChild(rect1);
            appWindow.appendChild(rect2);
            appWindow.appendChild(rect3);
            appWindow.appendChild(rect4);

        setInterval(() => {

            rect1.style.display = "flex";
            xPos1 = (Math.random() * 500) + 300;
            yPos1 = Math.random() * 300;
            width1 = Math.random() * 500;
            height1 = Math.random() * 500;
            rect1.style.top = `${yPos1}px`;
            rect1.style.left = `${xPos1}px`;
            rect1.style.width = `${width1}px`;
            rect1.style.height = `${height1}px`;

            rect2.style.display = "flex";
            xPos2 = (Math.random() * 500) + 300;
            yPos2 = Math.random() * 300;
            width2 = Math.random() * 500;
            height2 = Math.random() * 500;
            rect2.style.top = `${yPos2}px`;
            rect2.style.left = `${xPos2}px`;
            rect2.style.width = `${width2}px`;
            rect2.style.height = `${height2}px`;

            rect3.style.display = "flex";
            xPos3 = (Math.random() * 500) + 300;
            yPos3 = Math.random() * 300;
            width3 = Math.random() * 500;
            height3 = Math.random() * 500;
            rect3.style.top = `${yPos3}px`;
            rect3.style.left = `${xPos3}px`;
            rect3.style.width = `${width3}px`;
            rect3.style.height = `${height3}px`;

            rect4.style.display = "flex";
            xPos4 = (Math.random() * 500) + 300;
            yPos4 = Math.random() * 300;
            width4 = Math.random() * 500;
            height4 = Math.random() * 500;
            rect4.style.top = `${yPos4}px`;
            rect4.style.left = `${xPos4}px`;
            rect4.style.width = `${width4}px`;
            rect4.style.height = `${height4}px`;
            

            setTimeout(() => {
                rect1.style.display = "none";
                rect2.style.display = "none";
                rect3.style.display = "none";
                rect4.style.display = "none";
            }, 50);

        }, 2500);
    }