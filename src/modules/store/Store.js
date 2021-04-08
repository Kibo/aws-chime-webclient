import { createStore } from 'vuex'
import Utils from "../tools/Utils.js"
import {ConsoleLogger,LogLevel} from 'amazon-chime-sdk-js';
const logger = new ConsoleLogger('MeetingLogs', LogLevel.WARN);

const Store = createStore({
state () {
	return {
		videoInputDeviceId : null,
		audioInputDeviceId : null,
		audioOutputDeviceId : null,
		credentials: {},
		logger:logger,
		canvasSetting:{
			fps:Utils.getConstant('PREZENTATION_CANVAS_FPS'),
			background:"/assets/bg_1280x720_blue.jpg",
			foreground:""
		}
	}
}, mutations: {
	credentials(state, credentials){
		state.credentials = credentials
	},

	videoInputId(state, deviceId) {
		state.videoInputDeviceId = deviceId
	},

	audioInputId(state, deviceId) {
		state.audioInputDeviceId = deviceId
	},

	audioOutputId(state, deviceId) {
		state.audioOutputDeviceId = deviceId
	},

	canvasSetting(state, canvasSetting) {
		if( canvasSetting.fps ){
				let min = 1
				let max = 60
				state.canvasSetting.fps = Math.min( Math.max(parseInt( canvasSetting.fps ), min), max);
		}

		if( typeof canvasSetting.background === 'string' ){
				state.canvasSetting.background = canvasSetting.background
		}

		if( typeof canvasSetting.foreground === 'string' ){
				state.canvasSetting.foreground = canvasSetting.foreground
		}
	}
},
getters: {
    role(state) {
      return state.credentials.role
    },

    attendeeId(state) {
			if(state.credentials.attendee){
					return state.credentials.attendee.AttendeeId
			}

    },
		externalUserId(state) {
			if(state.credentials.attendee){
					return state.credentials.attendee.ExternalUserId
			}
		}
  }
})

export default Store
