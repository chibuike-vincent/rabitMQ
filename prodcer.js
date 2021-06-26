const express = require("express")
const amqp = require('amqplib/callback_api');
const Receiver = require("./consumer")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

Receiver

app.post("/send", async(req, res) => {
    const queue = "hello"
    const msg = await req.body.message
   await amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
        
        
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
})



app.listen(5000, () => {
    console.log("Server running on port 5000")
})