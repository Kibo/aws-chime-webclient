# AWS Chime webclient

<img align="right" src="https://raw.githubusercontent.com/Kibo/aws-chime-webclient/master/src/img/aws-chime-webclient-logo_300.png">

AWS Chime webclient using Vue.js.

## Version
- 0.2.0 ( coding )

### Dependencies
- [amazon-chime-sdk-js](https://github.com/aws/amazon-chime-sdk-js)
- [Vue.js](https://vuejs.org/) 
	
### Tools
- [NPM](https://npmjs.org) - Node.js package manager.
- [Webpack](https://webpack.js.org/) - The JavaScript module bundler.

### Before Build
- pls, see [.env](https://github.com/Kibo/aws-chime-webclient/blob/master/.env)
- pls, see [Constants.js](https://github.com/Kibo/aws-chime-webclient/blob/master/src/modules/Constants.js)
- pls, see [profile templates](https://github.com/Kibo/aws-chime-webclient/blob/master/src/profiles). You can build a customized AWS Chime client.

### Build
```
$ git clone git@github.com:Kibo/aws-chime-webclient.git
$ cd aws-chime-client
$ npm install 
$ npm run build
```
### Running the browser demos with a local server
* Ensure you have AWS credentials configured in your ~/.aws folder for a role with a policy allowing chime:CreateMeeting, chime:DeleteMeeting, and chime:CreateAttendee.
* [Amazon Chime SDK Pricing](https://aws.amazon.com/chime/pricing/#Chime_SDK_)

```
$ npm run start
```
Open http://localhost:3000 in your browser.

### Test
```
$ npm run test
```

### Screens

Configure
<img src="https://raw.githubusercontent.com/Kibo/aws-chime-webclient/src/img/screens/configure.png" alt="Configure">


