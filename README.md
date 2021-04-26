# AWS Chime webclient

<img align="right" src="https://raw.githubusercontent.com/Kibo/aws-chime-webclient/master/src/img/aws-chime-webclient-logo_300.png">

AWS Chime webclient using Vue.js.

## Version
- 0.9.0

- Log as moderator (You can change the role 'Presenter' in Moderator panel.)

### Dependencies
- [amazon-chime-sdk-js](https://github.com/aws/amazon-chime-sdk-js)
- [Vue.js](https://vuejs.org/)

### Tools
- [NPM](https://npmjs.org) - Node.js package manager.
- [Webpack](https://webpack.js.org/) - The JavaScript module bundler.

### Before Build
- see [Constants.js](https://github.com/Kibo/aws-chime-webclient/blob/master/src/modules/constants/Constants.js)
- see [Role settings](https://github.com/Kibo/aws-chime-webclient/blob/master/src/roles).

### Build
```
$ git clone git@github.com:Kibo/aws-chime-webclient.git
$ cd aws-chime-client
$ npm install
$ npm run build
```
### Running the browser demo with a local server
* Ensure you have AWS credentials configured in your ~/.aws folder for a role with a policy allowing chime:CreateMeeting, chime:DeleteMeeting, and chime:CreateAttendee.
* [Amazon Chime SDK Pricing](https://aws.amazon.com/chime/pricing/#Chime_SDK_)

```
$ npm run start
```
Open http://localhost:3000 in your browser.

Passwords (see PINS in [server.js](https://github.com/Kibo/aws-chime-webclient/blob/master/server.js)):
- "lektor"
- "moderator"
- "listener"
- "broadcaster"

### Roles
- moderator: can set presenter, set foreground, background, prezentation, fps, ...
- lektor: can share audio, video and content, can chat
- listener: can listen, can chat
- broadcaster: can listen

You can change that permision in [Role settings](https://github.com/Kibo/aws-chime-webclient/blob/master/src/roles). Or create your own roles.

### Test
```
$ npm run test
```

### Screens

<img src="https://raw.githubusercontent.com/Kibo/aws-chime-webclient/master/src/img/screens/login.jpg" alt="Configure">
<hr />
<img src="https://raw.githubusercontent.com/Kibo/aws-chime-webclient/master/src/img/screens/devices.jpg" alt="Session">
<hr />
<img src="https://raw.githubusercontent.com/Kibo/aws-chime-webclient/master/src/img/screens/pdf.jpg" alt="Session">
<hr />
<img src="https://raw.githubusercontent.com/Kibo/aws-chime-webclient/master/src/img/screens/video.jpg" alt="Session">
<hr />
