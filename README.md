# Zoko Whatsapp Api
Zoko Whatsapp API

## Installation

Use the package manager [npm](https://nodejs.org/en/) to install Zoko Whatsapp.

Replace "ENTER YOUR API KEY HERE" to you zoko api key

Initially you have to send a template message to any new number using zoko api otherwise text or image api will not work.

Image Api Only works when user reply on your message, and you can send message after 24 hrs when user replied.

```bash
git clone https://github.com/bhupeshkhandelwal/zoko-whatsapp_api.git
```

```bash
npm install
```

```bash
npm start
```

## Usage

```url
For Getting Templates list

http://localhost:3013/templates

For Creating Webhook

http://localhost:3013/create-webhook?webhook=http://localhost:3013/whatsapp-message

For Sending Text Message 

http://localhost:3013/send-whatsapp-text-message?mobile_number=91XXXXXXXX&textmessage=HelloTest

For Sending Greeting Message 

http://localhost:3013/send-whatsapp-greeting-message?mobile_number=91XXXXXXXX

For Sending Image Message 

http://localhost:3013/send-whatsapp-image-message?mobile_number=91XXXXXXXX&image_caption=Test Image&image=http://localhost/image/dummyimage.png

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GNU](https://www.gnu.org/licenses/gpl-3.0.en.html)
