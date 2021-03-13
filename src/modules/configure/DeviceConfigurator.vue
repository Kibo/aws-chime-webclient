<template>
	<div v-if="isDeviceListReady">
		<div class="row mt-4">
			<div class="col col-md-6 offset-md-3">					
				<div class="card ">
					<div class="card-header">Configure devices</div>	
					<div class="card-body">
						<AudioOutputDevice
							v-bind:audioOutputDevices="audioOutputDevices" 
							v-bind:meetingAudioElement="meetingAudioElement"  
							v-on:audio-output-selected="audioOutputSelected" />
																																
						<AudioInputDevice
							v-if="isAudioInputDevice"
							v-bind:audioInputDevices="audioInputDevices" 
							v-bind:meetingSession="meetingSession"  
							v-on:audio-input-selected="audioInputSelected" />			
																		
						<VideoInputDevice
							v-if="isVideoInputDevice"
							v-bind:videoInputDevices="videoInputDevices"
							v-bind:meetingSession="meetingSession"
							v-on:video-input-selected="videoInputSelected" />													
					</div>
					
					<div class="card-footer">	
						<button class="btn btn-success btn-block" 												
								v-on:click.prevent="userWantStartSession()" >Start a session</button>
					</div>
				</div>			
			</div>
		</div>
	</div>	
</template>

<script>
import { AudioProfile } from 'amazon-chime-sdk-js'
import * as Constants from '../constants/Constants.js'
import AudioInputDevice from "./AudioInputDevice.vue"
import AudioOutputDevice from "./AudioOutputDevice.vue"
import VideoInputDevice from "./VideoInputDevice.vue"
/*
 * This "SETTING_PROFILE_NAME" will replace by value from .env
 * @see webpack.config.js
 */
import * as SettingProfile from "../../profiles/SETTING_PROFILE_NAME" 

export default {	
	components: {
		AudioInputDevice, 
		AudioOutputDevice,
		VideoInputDevice,	
	},
	emits: ['startSession'],	
	props: ['meetingSession', 'meetingAudioElement'],
	data() {
			return {
				isDeviceListReady:false,
				
				isBindAudioElement:false,
														
				isAudioInputDevice:true,
				isVideoInputDevice:true,
				
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
					
		this.meetingSession.audioVideo.addDeviceChangeObserver( this.getDeviceChangeObserver() );
		
		this.applyProfileSetting()
				     						
		this.isDeviceListReady = true;		
	},
	
	beforeUnmount(){
		this.meetingSession.audioVideo.removeDeviceChangeObserver( this.getDeviceChangeObserver() )
	},
	
	methods: {
		/*
		 * a user selected a device - change handler
		 */
		async audioInputSelected( selectedAudioInputDeviceId ){					
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
		      this.isBindAudioElement = true	          
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
		
		/*
		 * a user click to 'Start a session' button
		 */
		userWantStartSession(){
			
			if(!this.isBindAudioElement){				
				// Null specifies the default device.			
				this.audioOutputSelected(null)
			}
			
			this.$emit("startSession")
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
		},
		
		/*
		 * This setting depends on chosen setting template
		 * 
		 * @see .env 
		 * @see /src/profiles
		 */
		async applyProfileSetting(){
			
			if(!SettingProfile.IS_AUDIO_INPUT_DEVICE){
				this.audioInputSelected( null )
				this.isAudioInputDevice = false		
			}
			
			if(SettingProfile.IS_VIDEO_INPUT_DEVICE){
				/*
				 * Example:
				 * 360p - (640, 360, 15, 600)
				 * 540p - (960, 540, 15, 1400)
				 * 720p - (1280, 720, 15, 1400)
				 * 
				 * @see https://aws.github.io/amazon-chime-sdk-js/classes/defaultaudiovideofacade.html#choosevideoinputquality
				 */
				await this.meetingSession.audioVideo.chooseVideoInputQuality(
					SettingProfile.VIDEO_INPUT_QUALITY_WIDTH,
					SettingProfile.VIDEO_INPUT_QUALITY_HEIGHT,
					SettingProfile.VIDEO_INPUT_QUALITY_FRAMERATE,
					SettingProfile.VIDEO_INPUT_QUALITY_BANDWIDTH);
													
			}else{
				this.videoInputSelected( null )
				this.isVideoInputDevice = false
			}
						
			if(SettingProfile.FULLBAND_SPEECH_MONO_QUALITY){
				this.setFulbandSpeech()	
			}									
		},
			
		/*
		 * @see https://aws.github.io/amazon-chime-sdk-js/classes/audioprofile.html
		 */
		setFulbandSpeech(){
			this.meetingSession.audioVideo.setAudioProfile(AudioProfile.fullbandSpeechMono());
			this.meetingSession.audioVideo.setContentAudioProfile(AudioProfile.fullbandSpeechMono());	
		}					
	}
}
</script>