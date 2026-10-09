function initWebSocket(server, path) {

    const { WebSocketServer } = require('ws');
    const crypto = require('crypto');
    const wss = new WebSocketServer({ server });
    const fs = require('fs');
    const filePath = path.join(__dirname, 'drawingData.json');

    let drawingData = [];
    
    // DEV ONLY: delete old drawing data when server starts
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('Old drawingData.json deleted');
    }
    
    wss.on('connection', (socket) => {
    

        const isFirstClient = wss.clients.size === 1;
        console.log("count: " + wss.clients.size);

        if (isFirstClient) {
            drawingData = [];
            console.log('New drawing created');
        }


        const clientId = crypto.randomUUID();
        console.log('WebSocket client connected', clientId);
    
    
        socket.clientId = clientId;
        socket.send(JSON.stringify({
            type: 'connected',
            clientId: clientId
        }));
                
        wss.clients.forEach((client) => {

            if (client.readyState === 1) {
                client.send(JSON.stringify({
                    type: "drawing data",
                    data: drawingData
                }));
            }

        });
            
    
    
        socket.on('message', (message) => {
    
            const data = JSON.parse(message.toString());
            const messageData = {
                ...data,
                clientId: socket.clientId
            }
            console.log("Message from:", socket.clientId);
            console.log(messageData);

            if (messageData.type === "add") {

                let testStrokeId = false;

                if (drawingData.length > 0) {
                    testStrokeId = messageData.strokeId === drawingData[drawingData.length - 1].strokeId;
                }

                if (testStrokeId) {

                    messageData.pos.forEach(e => {
                    drawingData[drawingData.length - 1].pos.push(e);  
                    })
                } else {
                    drawingData.push(messageData);
                }

                wss.clients.forEach((client) => {
        
                    if (client.readyState === 1) {
                        client.send(JSON.stringify({
                            type: "drawing data",
                            data: drawingData
                        }));
                    }
        
                });
            } else if (messageData.type === "delete") {

                // Find the latest stroke belonging to this client
                let lastClientStrokeIndex = -1;

                for (let i = drawingData.length - 1; i >= 0; i--) {
                    if (drawingData[i].clientId === socket.clientId) {
                        lastClientStrokeIndex = i;
                        break;
                    }
                }

                if (lastClientStrokeIndex !== -1) {
                    const lastClientStrokeId =
                        drawingData[lastClientStrokeIndex].strokeId;

                    // Remove the stroke
                    drawingData = drawingData.filter(
                        s => !(
                            s.clientId === socket.clientId &&
                            s.strokeId === lastClientStrokeId
                        )
                    );

                    // Broadcast updated drawing data
                    wss.clients.forEach((client) => {
                        if (client.readyState === 1) {
                            client.send(JSON.stringify({
                                type: "drawing data",
                                data: drawingData
                            }));
                        }
                    });
                }
            }
    
        });
    
        socket.on('close', () => {
            console.log('WebSocket client disconnected');
        });
    
    });

}

module.exports = { initWebSocket };