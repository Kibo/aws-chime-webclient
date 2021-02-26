import * as setting from 'PATH_TO_SETTING_TEMPLATE'; //see .env
import * as templates from 'PATH_TO_VIEW_TEMPLATE'; //see .env
import * as Constant from './modules/constants.js';
import {render as renderEngine} from 'lit-html';

/* ## MODELS ########################################### */



/* ## VIEWS ########################################### */

var LoginView = Backbone.View.extend({
	el: `#${Constant.ID_APP}`,

	initialize: function(){
		this.render();
	},

	render: function(){  
		renderEngine(templates.myTemplate('AWS Chime client.'), this.el);
	}
});

var loginView = new LoginView();
