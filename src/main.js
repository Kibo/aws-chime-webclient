import { createApp } from 'vue'
import App from './modules/App.vue'
import { createStore } from 'vuex'
import * as Constant from './modules/constants/Constants.js';

const store = createStore({
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

// there is 'data-meeting' attribute in App root element
// @see server.js
const LOCAL_SERVER_MEETING_ID = document.querySelector(`#${Constant.ID_APP}`).dataset.meeting

const app = createApp(App, { meeting: LOCAL_SERVER_MEETING_ID });
app.use(store)
const vm = app.mount(`#${Constant.ID_APP}`)