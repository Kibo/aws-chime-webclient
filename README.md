# AWS Chime Backbone webclient

<img align="right" src="https://raw.githubusercontent.com/Kibo/aws-chime-backbone-client/master/src/img/aws-chime-backbone-logo.png">

AWS Chime webclient in Backbone.js wrapper.

## Version
- 0.0.0 ( coding )

### Dependencies
- [amazon-chime-sdk-js (2.5.0)](https://github.com/aws/amazon-chime-sdk-js)
- [Backbone.js (1.4.0)](https://backbonejs.org/)
	- [Underscore.js (1.10.2)](https://underscorejs.org/)
	- [jQuery (3.5.1)](https://jquery.com/)
- [Bootstrap (4.0.0)](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

### Tools
- [NPM](https://npmjs.org) - Node.js package manager.
- [Grunt](http://gruntjs.com/) - The JavaScript Task Runner.

### Prerequisites
* Ensure you have AWS credentials configured in your ~/.aws folder for a role with a policy allowing chime:CreateMeeting, chime:DeleteMeeting, and chime:CreateAttendee.
* [Amazon Chime SDK Pricing](https://aws.amazon.com/chime/pricing/#Chime_SDK_)

### Before Build
- pls, see [build.config.js](https://github.com/Kibo/aws-chime-backbone-client/blob/master/build.config.js).

### Build
```
$ git clone git@github.com:Kibo/aws-chime-backbone-client.git
$ cd aws-chime-backbone-client
$ npm install 
$ grunt build
```
### Running the browser demos with a local server

1. Navigate to the demo folder: cd demo
2. Start the demo application: npm run start.
3. Open http://localhost:3000 in your browser.
