<template>		   
	<div class="row mt-4">
		<div class="col">
			<h3>Audio input</h3>
			
			<div class="input-group">
				<div class="input-group-prepend">
					<label class="input-group-text"><i class="fa fa-microphone" aria-hidden="true"></i></label>
				</div>		
				<select v-on:change="userChangeDevice($event)" class="form-control">
					<option value="">Please select one</option>
					<option v-for="mediaDeviceInfo in audioInputDevices" v-bind:value="mediaDeviceInfo.deviceId" >
						{{mediaDeviceInfo.label}}
					</option>
				</select>
				
				<div class="input-group-append">
					<button v-on:click="startTestAudioInput" v-bind:class="[audioInputTestEnabled ? 'btn-success' : 'btn-outline-secondary'  ]" class="btn" type="button" v-bind:disabled="!audioInputTestEnabled">Test</button>
				</div>
			</div>
		</div>
	</div>
		
	<div class="row">			
		<div class="col mt-2">
			<div v-if="isOsciloscope">
				<AudioOscilloscope v-bind:analyserNode="analyserNode" />
			</div>
		</div>
	</div>
</template>

<script>
import * as Constants from '../constants/Constants.js';
import AudioOscilloscope from "./AudioOscilloscope.vue"  

export default {
	components: {
		AudioOscilloscope
	},	
	props: ['audioInputDevices', 'meetingSession'],
	emits: ['audioInputSelected'],
	data() {
			return {
				audioInputTestEnabled:false,
				analyserNode:null,
				isOsciloscope:false
			}
		},
	
	mounted() {	
		this.$watch('audioInputDevices', (newVal, oldVal) => {			
			// set 'Please select one' option
			let event = {target:{value:''}}
			this.userChangeDevice( event )
    	})	
	},
		
	beforeUnmount(){
		this.stopTestAudioInput()
	},
					
	methods: {
		
		/*
		 * a user clicked to audio test button - handler
		 */
		startTestAudioInput(){
			this.audioInputTestEnabled = false												
			this.analyserNode = this.meetingSession.audioVideo.createAnalyserNodeForAudioInput()
								
			if (!this.analyserNode) {
      			return;
    		}
    		
    		this.isOsciloscope = true    		     		    		        		        		    											
		},
		
		stopTestAudioInput(){
			if( this.analyserNode ){
				this.analyserNode.disconnect();
      			this.analyserNode.removeOriginalInputs();
      			this.analyserNode = undefined;										
			}
			
			this.isOsciloscope = false
		},
						
		/*
		 * a user selected a device
		 * emit selected device to a parent
		 * 
		 * @see https://aws.github.io/amazon-chime-sdk-js/interfaces/audiovideofacade.html#chooseaudioinputdevice
		 */
		userChangeDevice( event ){
			// null indicate default device
			let deviceId = event.target.value == '' ? null : event.target.value
			this.$emit('audioInputSelected', deviceId )
			this.stopTestAudioInput()
			this.audioInputTestEnabled = deviceId ? true : false
		}		
	}
}
</script>