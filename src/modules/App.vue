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
			v-bind:meetingSession="meetingSession" /> 
	</div>
		
	<audio style="display:none" 
		v-bind:id="utils.getConstant('ID_MEETING_AUDIO_ELEMENT')" ></audio>
</template>

<script>
import {
  AsyncScheduler,
  AudioInputDevice,
  AudioProfile,
  AudioVideoFacade,
  AudioVideoObserver,
  ClientMetricReport,
  ClientVideoStreamReceivingReport,
  ConsoleLogger,
  ContentShareObserver,
  DataMessage,
  DefaultActiveSpeakerPolicy,
  DefaultAudioMixController,
  DefaultBrowserBehavior,
  DefaultDeviceController,
  DefaultMeetingSession,
  DefaultModality,
  DefaultVideoTransformDevice,
  Device,
  DeviceChangeObserver,
  EventAttributes,
  EventName,
  Logger,
  LogLevel,
  MeetingSession,
  MeetingSessionConfiguration,
  MeetingSessionPOSTLogger,
  MeetingSessionStatus,
  MeetingSessionStatusCode,
  MeetingSessionVideoAvailability,
  MultiLogger,
  NoOpVideoFrameProcessor,
  RemovableAnalyserNode,
  SimulcastLayers,
  TimeoutScheduler,
  Versioning,
  VideoFrameProcessor,
  VideoInputDevice,
  VideoSource,
  VideoTileState,
  VoiceFocusDeviceTransformer,
  VoiceFocusPaths,
  VoiceFocusTransformDevice,
  isAudioTransformDevice,
} from 'amazon-chime-sdk-js';
import LoginForm from "./login/LoginForm.vue"
import DeviceConfigurator from "./configure/DeviceConfigurator.vue"
import Session from "./meeting/Session.vue"
import Utils from "./tools/Utils.js"

const logger = new ConsoleLogger('MeetingLogs', LogLevel.WARN);

export default {
  components: {
    LoginForm,
    DeviceConfigurator,
    Session
  },
  props: ['meeting'],       
  data() {
    return {
    	utils:Utils,
    	status:Utils.getConstant('APP_STATUS_LOGIN'),
    	meetingSession:null
    }
  },
  methods: {  	   
    /*
  	 * This handler is called after the LoginForm send a valid credentials from server.
  	 * 
  	 * @param {Object} - {meeting:{}, atendee:{}}
  	 */ 
    createMeetingSession( credentials){    	    	   
    	const deviceController = new DefaultDeviceController(logger, {enableWebAudio: true});
    	const configuration = new MeetingSessionConfiguration(credentials.meeting, credentials.attendee);
    	this.meetingSession = new DefaultMeetingSession(configuration, logger, deviceController); 
    	
    	this.status = Utils.getConstant('APP_STATUS_CONFIGURE')   	    	   
    },
    
    /*
     * This handler is called after a user click to a button 'Start a session'
     */
    startSession(){
    	console.log(" Start a session")
    	this.status = Utils.getConstant('APP_STATUS_SESSION')
    },
             
    getMeetingAudioElement(){
    	return window.document.getElementById( Utils.getConstant('ID_MEETING_AUDIO_ELEMENT'))
    }
  }
}
</script>

<style lang="stylus">

</style>
