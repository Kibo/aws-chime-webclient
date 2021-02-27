import * as setting from 'PATH_TO_SETTING_TEMPLATE'; //see .env
import * as Constant from './modules/constants.js';

const tplLogin = require('PATH_TO_VIEW_TEMPLATES/login.ejs')



/* ## MODELS ########################################### */



/* ## VIEWS ########################################### */


var LoginView = Backbone.View.extend({
	el: `#${Constant.ID_APP}`,

	initialize: function(){
		this.render();
	},

	render: function(){  
		this.$el.html( tplLogin({name:'AWS Chime client'}));	
	}
});

var loginView = new LoginView();
var test = '123'


