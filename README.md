# AWS Chime Backbone webclient

<img align="right" src="https://raw.githubusercontent.com/Kibo/aws-chime-backbone-client/master/src/img/aws-chime-backbone-logo.png">

AWS Chime webclient in Backbone.js wrapper.

## Version
- 0.0.0 ( coding )

### Dependencies
- [Backbone.js (1.4.0)](https://backbonejs.org/)
	- [Underscore.js (>= 1.8.3)](https://underscorejs.org/)
	- [jQuery (>= 1.11.0)](https://jquery.com/)
	
### Tools
- [NPM](https://npmjs.org) - Node.js package manager.
- [Webpack](https://webpack.js.org/) - The JavaScript module bundler.

### Prerequisites
* Ensure you have AWS credentials configured in your ~/.aws folder for a role with a policy allowing chime:CreateMeeting, chime:DeleteMeeting, and chime:CreateAttendee.
* [Amazon Chime SDK Pricing](https://aws.amazon.com/chime/pricing/#Chime_SDK_)

### Before Build
- pls, see [.env](https://github.com/Kibo/aws-chime-backbone-client/blob/master/.env)
- pls, see [constants.js](https://github.com/Kibo/aws-chime-backbone-client/blob/master/src/modules/constants.js)
- pls, see [setting templates](https://github.com/Kibo/aws-chime-backbone-client/blob/master/src/settings). You can build a customized AWS Chime client.

### Build
```
$ git clone git@github.com:Kibo/aws-chime-backbone-client.git
$ cd aws-chime-backbone-client
$ npm install 
$ npm run build
```
### Running the browser demos with a local server

```
$ npm run start
```
Open http://localhost:3000 in your browser.
