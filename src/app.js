import * as setting from 'PATH_TO_SETTING_TEMPLATE'; //see .env
import * as Constant from './modules/constants.js';
import {
	ConsoleLogger,
	DefaultDeviceController,
	DefaultMeetingSession,
	LogLevel,
	MeetingSessionConfiguration,
} from 'amazon-chime-sdk-js';


/* ## UTILS ########################################### */


/* ## TEMPLATES ########################################### */
const tplLogin = require('PATH_TO_VIEW_TEMPLATES/login.ejs')
const tplAlert = require('PATH_TO_VIEW_TEMPLATES/alert.ejs')


/* ## MODELS ########################################### */
/**
 * Creates a new AlertMessage.
 * @class
 */
let AlerMessage = Backbone.Model.extend({
	defaults: {			
		type:'info',
		text:''		
	}			
});

/**
 * Creates a new Meeting.
 * @class
 */
let Meeting = Backbone.Model.extend({
	defaults: {			
		logLevel:LogLevel.INFO,		
	},
	
	initialize: function(){
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

/* ## COLLECTIONS ########################################### */
let AlertMessageCollection = Backbone.Collection.extend({
	model: AlerMessage
});



/* ## VIEWS ########################################### */
let AlertMessagesView = Backbone.View.extend({
	className:"cz-kibo-meeting-chime-client-alert-root",
	
	add:function( message ){
		this.collection.add( message )	
	},
	
	render: function(){
		console.log("#################################RENDER")  
		console.log( this.$el )
		this.$el.html( tplAlert({messages: this.collection}));
		return this;	
	}
});

let LoginView = Backbone.View.extend({
	el: `#${Constant.ID_APP}`,

	initialize: function(){					
		this.render();			
	},
	
	events:{
		"click #cz-kibo-meeting-chime-client-form-login button[name='btn-join']": "fetchCredentialsFromServer"					
	},
	
	/*
	 * 
	 * @returns{Object} - server response
	 */
	fetchCredentialsFromServer:function(e){
		e && e.preventDefault();
					
		let meeting = this.$el.attr('data-meeting')
		let name = $("#cz-kibo-meeting-chime-client-form-login input[name='name']").val()
		let pin = $("#cz-kibo-meeting-chime-client-form-login input[name='pin']").val()
		
		console.log( meeting )
		console.log( name )
		console.log( pin )	
		
		alertsView.add({message:'abc', type:'warning'})
		alertsView.render()					
	},

	render: function(){  
		this.$el.html( tplLogin({name:'AWS Chime client'}));
		return this;	
	}
});

/* ## LOGIC ########################################### */
let alertsView = new AlertMessagesView({collection: new AlertMessageCollection()})
let loginView = new LoginView();


		


