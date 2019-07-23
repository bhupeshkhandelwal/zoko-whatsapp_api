'use strict';
const request_method = require('request');
const express = require('express');
const app = express();
const myParser = require("body-parser");
app.use(myParser.json({ extended: true }));
const apibaseurl = 'https://message.zoko.io/v1/';
const apikey = 'ENTER YOUR API KEY HERE';


const server = app.listen(3013, function() {
    console.log('listening on  port %d', server.address().port);
});

/* Create a Webhook Event for Receiving Messages and Deleivery Reports*/


app.get("/create-webhook", function(request, res) {
    let response_user = request.query;

    var options = {
        uri: apibaseurl + 'webhook',
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'apiKey': apikey
        },
        json: {
            "webhookUrl": response_user.webhook, // In this Url you to Pass Api receive Mesage Api Path
        }
    };

    request_method(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('Webhook Successfully Created');
            res.status(200).send(response.body);
        } else {
            res.status(400).send(error);
        }
    });

});

app.get("/templates", function(request, res) {
    let response_user = request.body;

    var options = {
        uri: apibaseurl + 'template',
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'apiKey': apikey
        }
    };

    request_method(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.status(200).send(response.body);
        } else {
            res.status(400).send(error);
        }
    });

});



/* Receive Whatsapp Messages*/

app.post("/whatsapp-message", function(request, res) {
    let response_user = request.body;
    /*Message Receive*/
    if (response_user.event == 'message:user:in' && response_user.direction == 'FROM_CUSTOMER') {

        /* Checking Message Type*/

        if (response_user.type == 'text') {

            console.log(response_user.text);
            res.status(200).send(response_user.body);
        }

    }
});

/* Send Message To Whatsapp*/

app.get("/send-whatsapp-text-message", function(request, res) {
    let response_user = request.query;

    var options = {
        uri: apibaseurl + 'message',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'apiKey': apikey
        },
        json: {
            "messageData": [{
                "channel": "whatsapp",
                "recipient": response_user.mobile_number,
                "type": "text",
                "message": response_user.textmessage
            }]

        }
    };

    request_method(options, function(error, response, body) {
        if (!error && response.statusCode == 202) {
            console.log('Text Message Successfully Send');
            res.status(200).send(response.body);
        } else {
            console.log(error);
            res.status(400).send(response);
        }
    });

});

app.get("/send-whatsapp-image-message", function(request, res) {
    let response_user = request.query;

    var options = {
        uri: apibaseurl + 'message',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'apiKey': apikey
        },
        json: {
            "messageData": [{
                "channel": "whatsapp",
                "recipient": response_user.mobile_number,
                "type": "image",
                "message": response_user.image, //Here you have to pass Image URl
                "caption": response_user.image_caption // Image Caption
            }]

        }
    };

    request_method(options, function(error, response, body) {
        if (!error && response.statusCode == 202) {
            console.log('Text Message Successfully Send');
            res.status(200).send(response.body);
        } else {
            console.log(error);
            res.status(400).send(response);
        }
    });

});

app.get("/send-whatsapp-greeting-message", function(request, res) {
    let response_user = request.query;

    console.log(response_user.mobile_number);

    var options = {
        uri: apibaseurl + 'message',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'apiKey': apikey
        },
        json: {
            "messageData": [{
                "channel": "whatsapp",
                "recipient": response_user.mobile_number,
                "type": "template",
                "templateId": 'greeting' // Replace With Your Template Name or use Template api to know your templates list
            }]

        }
    };

    request_method(options, function(error, response, body) {
        if (!error && response.statusCode == 202) {
            console.log('Greeting Message Successfully Send');
            res.status(200).send(response.body);
        } else {
            console.log(error);
            res.status(400).send(response);
        }
    });

});