import { createStore } from 'vuex'
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
	}
},
getters: {
    role(state) {
      return state.credentials.role
    },
    
    attendeeId(state) {
      return state.credentials.attendee.AttendeeId
    }
  }
})

export default Store