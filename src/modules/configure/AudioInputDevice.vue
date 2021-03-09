<template>		   
	<div class="row">
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
			AnalyserNode
		</div>
	</div>
</template>

<script>
import * as Constants from '../constants/Constants.js';

export default {	
	props: ['audioInputDevices', 'meetingSession'],
	emits: ['audioInputSelected'],
	data() {
			return {
				audioInputTestEnabled:false,
				analyserNode:null
			}
		},
		
	beforeUnmount(){
		this.stopTestAudioInput()
	},
					
	methods: {
		
		/*
		 * a user clicked to audio test button - handler
		 */
		startTestAudioInput(){
			this.audioOutputTestEnabled = false
			console.log("AudioInput")			
			this.analyserNode = this.meetingSession.audioVideo.createAnalyserNodeForAudioInput()
			
			
			this.audioOutputTestEnabled = true
		},
		
		stopTestAudioInput(){
			if( this.analyserNode ){
				this.analyserNode.removeOriginalInputs()	
			}
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