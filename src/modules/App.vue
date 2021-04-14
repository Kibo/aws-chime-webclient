<template>

	<div v-if="status === utils.getConstant( 'APP_STATUS_LOGIN' )">
		<LoginForm
			v-bind:meeting="meeting"
			v-on:credentials="createMeetingSession" />
	</div>

	<div v-if="status === utils.getConstant( 'APP_STATUS_CONFIGURE' )">
		<DeviceConfigurator
			v-bind:meetingSession="meetingSession"
			v-bind:meetingAudioElement="getMeetingAudioElement()"
			v-on:start-session="startSession()" />
	</div>

	<div v-if="status === utils.getConstant( 'APP_STATUS_SESSION' )">
		<Session
			v-bind:meetingSession="meetingSession"
			v-on:configure-devices="configureDevices()"
			v-on:endSession="login" />
	</div>

	<audio style="display:none"
		v-bind:id="utils.getConstant('ID_MEETING_AUDIO_ELEMENT')" ></audio>

</template>

<script>
import {
  DefaultDeviceController,
  DefaultMeetingSession,
  MeetingSessionConfiguration
} from 'amazon-chime-sdk-js';
import LoginForm from "./login/LoginForm.vue"
import DeviceConfigurator from "./configure/DeviceConfigurator.vue"
import Session from "./meeting/Session.vue"
import Utils from "./tools/Utils.js"

export default {
  components: {
    LoginForm,
    DeviceConfigurator,
    Session
  },
  props: ['meeting', 'title'],
  data() {
    return {
    	utils:Utils,
    	status:Utils.getConstant('APP_STATUS_LOGIN'),
    	meetingSession:null,
    	logger:this.$store.state.logger
    }
  },
	mounted(){
		this.title ? this.$store.commit('title', this.title) : this.$store.commit('title', "AWS Chime")
	},
  methods: {
    /*
  	 * This handler is called after the LoginForm send a valid credentials from server.
  	 *
  	 * @param {Object} - {meeting:{}, atendee:{}}
  	 */
    createMeetingSession( credentials){
    	this.$store.commit('credentials', credentials)

    	const deviceController = new DefaultDeviceController(this.logger, {enableWebAudio: true});
    	const configuration = new MeetingSessionConfiguration(credentials.meeting, credentials.attendee);
    	this.meetingSession = new DefaultMeetingSession(configuration, this.logger, deviceController);

    	this.status = Utils.getConstant('APP_STATUS_CONFIGURE')
    },

		/*
     * This handler is called after a user click to a button 'new Login'
     */
    login(){
    	this.status = Utils.getConstant('APP_STATUS_LOGIN')
    },

    /*
     * This handler is called after a user click to a button 'Configure Devices' in running session
     */
    configureDevices(){
    	this.status = Utils.getConstant('APP_STATUS_CONFIGURE')
    },

    /*
     * This handler is called after a user click to a button 'Start a session'
     */
    startSession(){
    	this.status = Utils.getConstant('APP_STATUS_SESSION')
    },

    getMeetingAudioElement(){
    	return window.document.getElementById( Utils.getConstant('ID_MEETING_AUDIO_ELEMENT'))
    }
  }
}
</script>

<style lang="stylus">
html {
  height: 100%;
}
body {
	min-height: 100%;
	background: rgb(63,181,30);
	background: linear-gradient(180deg, rgba(63,181,30,1) 20%, rgba(14,117,0,1) 80%);
}

.hiddeVideoTile {
	position:fixed;
  top:0;
  left:0;
  width:1px;
  height:1px;
  overflow: hidden;
}
</style>
