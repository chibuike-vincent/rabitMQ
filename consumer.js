const amqp = require('amqplib/callback_api');

 const Receiver = amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        return channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            return `[x] Received %s, ${msg.content.toString()}`
        }, {
            noAck: true
        });
    });
});


module.exports = Receiver