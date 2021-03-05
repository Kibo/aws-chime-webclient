<template>
	<div v-if="status === getConstant( 'APP_STATUS_LOGIN' )">
		<LoginForm v-bind:meeting="meeting" v-on:credentials="createMeetingSession" />
	</div>
	
	<div v-if="status === getConstant( 'APP_STATUS_CONFIGURE' )">
		<DeviceConfigurator v-bind:meetingSession="meetingSession" /> 
	</div>
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
import * as Constants from './constants/Constants.js';

const logger = new ConsoleLogger('MeetingLogs', LogLevel.INFO);

export default {
  components: {
    LoginForm,
    DeviceConfigurator
  },
  props: ['meeting'],       
  data() {
    return {
    	status:Constants.APP_STATUS_LOGIN,
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
    	
    	this.status = Constants.APP_STATUS_CONFIGURE   	    	   
    },
    
    /*
     * Helper method for attaching Constants in View template.
     * 
     * @param {String} - Constant name. For instance: 'ID_APP'
     * @returns - Constant value.
     */
    getConstant( id ){
    	return Constants[id]
    }
  }
}
</script>

<style lang="stylus">

</style>
