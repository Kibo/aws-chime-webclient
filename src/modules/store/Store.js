import { createStore } from 'vuex'
import Utils from "../tools/Utils.js"
import {ConsoleLogger,LogLevel} from 'amazon-chime-sdk-js';
const logger = new ConsoleLogger('MeetingLogs', LogLevel.WARN);

const Store = createStore({
state () {
	return {
		logger:logger,
		title : null,
		videoInputDeviceId : null,
		audioInputDeviceId : null,
		audioOutputDeviceId : null,
		credentials: {},
		moderatorSetting:{
			fps:Utils.getConstant('PREZENTATION_CANVAS_FPS'),
			background:"",
			foreground:"",
			pdf:"",
			video:"",
			isPublicChat:false
		},
	}
}, mutations: {
	title(state, title){
		state.title = title
	},

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

	moderatorSetting(state, moderatorSetting) {
		if( moderatorSetting.fps ){
				let min = 1
				let max = 60
				state.moderatorSetting.fps = Math.min( Math.max(parseInt( moderatorSetting.fps ), min), max);
		}

		if( typeof moderatorSetting.background === 'string' ){
				state.moderatorSetting.background = moderatorSetting.background
		}

		if( typeof moderatorSetting.foreground === 'string' ){
				state.moderatorSetting.foreground = moderatorSetting.foreground
		}

		if( typeof moderatorSetting.pdf === 'string' ){
				state.moderatorSetting.pdf = moderatorSetting.pdf
		}

		if( typeof moderatorSetting.video === 'string' ){
				state.moderatorSetting.video = moderatorSetting.video
		}

		if( typeof moderatorSetting.isPublicChat === 'boolean' ){
				state.moderatorSetting.isPublicChat = moderatorSetting.isPublicChat
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
