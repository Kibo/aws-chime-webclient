import { createStore } from 'vuex'

const Store = createStore({
  state () {
    return {
 		videoInputDeviceId:null,
		audioInputDeviceId:null,
		audioOutputDeviceId:null,
    }
  },
   
  mutations: {  	
  	videoInputId(state, deviceId) {
      state.videoInputDeviceId = deviceId
   },
   
   audioInputId(state, deviceId) {
      state.audioInputDeviceId = deviceId
   },
    
    audioOutputId(state, deviceId) {
      state.audioOutputDeviceId = deviceId
    }    
  }    
})

export default Store