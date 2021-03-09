<template>
	<div v-if="isDeviceListReady">
					
		<h3>Audio input</h3>
		<div class="row">
			<div class="col-10">
				<div class="input-group">
					
					<div class="input-group-prepend">
    					<label class="input-group-text"><i class="fa fa-microphone" aria-hidden="true"></i></label>
  					</div>					
					<select v-model="selectedAudioInputDeviceId" v-on:change="audioInputSelected()" class="form-control">
						<option disabled value="">Please select one</option>
						<option v-for="(mediaDeviceInfo, index) in audioInputDevices" v-bind:value="mediaDeviceInfo.deviceId" >
							{{mediaDeviceInfo.label}}
						</option>
					</select>
				</div>				
			</div>
			<div class="col-2">
				<i class="fa fa-bar-chart" aria-hidden="true"></i>
			</div>
		</div>
		
		<AudioOutputDevice
					v-bind:audioOutputDevices="audioOutputDevices" 
					v-bind:meetingAudioElement="meetingAudioElement"  
					v-on:audio-output-selected="audioOutputSelected" />
		
		<VideoInputDevice
					v-bind:videoInputDevices="videoInputDevices"
					v-bind:meetingSession="meetingSession"
					v-on:video-input-selected="videoInputSelected" />																		
	</div>	
</template>

<script>
import * as Constants from '../constants/Constants.js'
import AudioOutputDevice from "./AudioOutputDevice.vue"
import VideoInputDevice from "./VideoInputDevice.vue"  

export default {	
	components: { 
		AudioOutputDevice,
		VideoInputDevice,	
	},
	props: ['meetingSession', 'meetingAudioElement'],
	data() {
			return {
				isDeviceListReady:false,
				
				audioInputDevices:null,
				audioOutputDevices:null,
				videoInputDevices:null,
				
				selectedAudioInputDeviceId:'',
				audioInputTestEnabled:false,														
			}
		},
		
	//@see https://stackoverflow.com/questions/53513538/is-async-await-available-in-vue-js-mounted	
	async mounted() {				
		this.audioInputDevices = await this.meetingSession.audioVideo.listAudioInputDevices();
		this.audioOutputDevices = await this.meetingSession.audioVideo.listAudioOutputDevices();
		this.videoInputDevices = await this.meetingSession.audioVideo.listVideoInputDevices();
					
		// TODO - remove observer after setting
		this.meetingSession.audioVideo.addDeviceChangeObserver( this.getDeviceChangeObserver() );
		
		this.isDeviceListReady = true;		
	},
	
	beforeUnmount(){
		this.meetingSession.audioVideo.removeDeviceChangeObserver( this.getDeviceChangeObserver() )
	},
	
	methods: {
		/*
		 * a user selected a device - change handler
		 */
		async audioInputSelected(){					
			try {
		      await this.meetingSession.audioVideo.chooseAudioInputDevice( this.selectedAudioInputDeviceId );		     
		    } catch (e) {
		      console.error(e)
		      return		      
		    }
		    
			this.audioInputTestEnabled = true		    									
		},
		
		/*
		 * a user selected a device - change handler
		 */
		async audioOutputSelected( selectedAudioOutputDeviceId ){											
			try {
		      await this.meetingSession.audioVideo.chooseAudioOutputDevice( selectedAudioOutputDeviceId );		      		     
		      this.meetingSession.audioVideo.bindAudioElement( this.meetingAudioElement )	     
		    } catch (e) {
		      console.error(e)
		      return		      
		    }		    								
		},
		
		/*
		 * a user selected a device - change handler
		 */
		async videoInputSelected( selectedVideoInputDeviceId ){										
			try {
		      await this.meetingSession.audioVideo.chooseVideoInputDevice( selectedVideoInputDeviceId );		     
		    } catch (e) {
		      console.error(e)
		      return		      
		    }		    		
		},
									
		getDeviceChangeObserver(){
			return {
				audioInputsChanged: freshAudioInputDeviceList => {					
					this.audioInputDevices = freshAudioInputDeviceList																														
					
					this.selectedAudioInputDeviceId = ''					
					this.audioInputTestEnabled = false																	 		
				},
				audioOutputsChanged: freshAudioOutputDeviceList => {
					this.audioOutputDevices = freshAudioOutputDeviceList
					
					this.selectedAudioOutputDeviceId = ''					
					this.audioOutputTestEnabled = false
				},
				videoInputsChanged: freshVideoInputDeviceList => {
					this.videoInputDevices = freshVideoInputDeviceList
					
					this.selectedVideoInputDeviceId = ''					
					this.videoInputTestEnabled = false
				}
			}
		} 
	}
}
</script>