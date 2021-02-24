# Express bootstrap

- Express 4
- MongoDB/Mongoose
- Less CSS pre-processor
- EJS templates
- I18n
- Passport
- GruntJS

### Tool Prerequisites

- [NPM](https://npmjs.org) - Node.js package manager.
- [Grunt](http://gruntjs.com/) - The JavaScript Task Runner.
- [Genghis](http://genghisapp.com/) - The single-file MongoDB admin app.

## Install
```
  $ git clone git@bitbucket.org:Kibo/express-bootstrap.git
  $ cd express-bootstrap
  $ npm install 
  $ grunt
```

### Directory structure
```
-app/
  |__config/
  |__controllers/
  |__helper/
  |__locales/
  |__models/
  |__mailer/
  |__views/
  |__routes/

-public/
  |__css/ (all files will generate from Grunt)
  |__js/
  |__less/
  |__fonts/
  |__img/
  favicon.ico
  
-grunfile.js
-package.json
-server.js
```