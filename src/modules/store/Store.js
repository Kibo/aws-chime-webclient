import { createStore } from 'vuex'

const Store = createStore({
state () {
	return {
		videoInputDeviceId : null,
		audioInputDeviceId : null,
		audioOutputDeviceId : null,
		credentials: {}
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
    }
  }
})

export default Store