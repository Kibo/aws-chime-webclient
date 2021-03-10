<template>
	<div v-if="isDeviceListReady">
		<div class="row mt-4">
			<div class="col col-md-6 offset-md-3">					
				<div class="card ">
					<div class="card-header">Configure devices</div>	
						<div class="card-body">																				
							<AudioInputDevice
										v-bind:audioInputDevices="audioInputDevices" 
										v-bind:meetingSession="meetingSession"  
										v-on:audio-input-selected="audioInputSelected" />			
							
							<AudioOutputDevice
										v-bind:audioOutputDevices="audioOutputDevices" 
										v-bind:meetingAudioElement="meetingAudioElement"  
										v-on:audio-output-selected="audioOutputSelected" />
							
							<VideoInputDevice
										v-bind:videoInputDevices="videoInputDevices"
										v-bind:meetingSession="meetingSession"
										v-on:video-input-selected="videoInputSelected" />
					</div>
				</div>			
			</div>
		</div>
	</div>	
</template>

<script>
import * as Constants from '../constants/Constants.js'
import AudioInputDevice from "./AudioInputDevice.vue"
import AudioOutputDevice from "./AudioOutputDevice.vue"
import VideoInputDevice from "./VideoInputDevice.vue"  

export default {	
	components: {
		AudioInputDevice, 
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
		async audioInputSelected( selectedAudioInputDeviceId  ){					
			try {
		      await this.meetingSession.audioVideo.chooseAudioInputDevice( selectedAudioInputDeviceId );		     
		    } catch (e) {
		      console.error(e)
		      return		      
		    }		    				    							
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
				},
				audioOutputsChanged: freshAudioOutputDeviceList => {
					this.audioOutputDevices = freshAudioOutputDeviceList
					this.selectedAudioOutputDeviceId = ''					
				},
				videoInputsChanged: freshVideoInputDeviceList => {
					this.videoInputDevices = freshVideoInputDeviceList
					this.selectedVideoInputDeviceId = ''
				}
			}
		} 
	}
}
</script>