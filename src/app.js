import * as setting from 'PATH_TO_SETTING_TEMPLATE'; //see .env
import * as Constant from './modules/constants.js';
import {
	ConsoleLogger,
	DefaultDeviceController,
	DefaultMeetingSession,
	LogLevel,
	MeetingSessionConfiguration,
} from 'amazon-chime-sdk-js';

/* ## TEMPLATES ########################################### */
const tplLogin = require('PATH_TO_VIEW_TEMPLATES/login.ejs')



/* ## MODELS ########################################### */

/**
 * Creates a new Meeting.
 * @class
 */
let Meeting = Backbone.Model.extend({
	defaults: {			
		logLevel:LogLevel.INFO,		
	},
	
	initialize: () => {
		this.set('logger', new ConsoleLogger('MeetingLogs', this.get('logLevel')) );					
	},
		
	/*
	 * Create the MeetingSession
	 * 
	 * @param {Object} meetingResponse - server response from chime.createMeeting.
	 * @param {Object} attendeeResponse - server response from chime.createAttendee.
	 * 
	 * @returns {chime.DefaultMeetingSession}
	 */
	createMeetingSession:( meetingResponse, attendeeResponse ) => {
		return new DefaultMeetingSession(
				new MeetingSessionConfiguration( meetingResponse, attendeeResponse), 
				this.logger, 
				new DefaultDeviceController(this.logger))				
	}
								
});

/* ## VIEWS ########################################### */

let LoginView = Backbone.View.extend({
	el: `#${Constant.ID_APP}`,

	initialize: function(){					
		this.render();			
	},
	
	events:{
		"click #form-login button[name='btn-join']": "fetchCredentialsFromServer"					
	},
	
	/*
	 * 
	 * @returns{Object} - server response
	 */
	fetchCredentialsFromServer:function(e){
		e && e.preventDefault();
					
		let meeting = this.$el.attr('data-meeting')
		let name = $("#form-login input[name='name']").val()
		let pin = $("#form-login input[name='pin']").val()
		
		console.log( meeting )
		console.log( name )
		console.log( pin )
	},

	render: function(){  
		this.$el.html( tplLogin({name:'AWS Chime client'}));
		return this;	
	}
});

let loginView = new LoginView();



