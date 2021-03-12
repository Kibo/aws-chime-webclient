<template>		   
		<div class="row">
			<div class="col">
				<h3>Audio output</h3>
				
				<div class="input-group">
					<div class="input-group-prepend">
						<label class="input-group-text"><i class="fa fa-volume-off" aria-hidden="true"></i></label>
					</div>		
					<select v-on:change="userChangeDevice($event)" class="form-control">
						<option value="">Please select one</option>
						<option v-for="mediaDeviceInfo in audioOutputDevices" v-bind:value="mediaDeviceInfo.deviceId" >
							{{mediaDeviceInfo.label}}
						</option>
					</select>
					
					<div class="input-group-append">
						<button v-on:click="startTestAudioOutput" v-bind:class="[audioOutputTestEnabled ? 'btn-success' : 'btn-outline-secondary'  ]" class="btn" type="button" v-bind:disabled="!audioOutputTestEnabled">Test</button>
					</div>
				</div>										
			</div>			
		</div>	
</template>

<script>
import * as Constants from '../constants/Constants.js';

export default {	
	props: ['audioOutputDevices', 'meetingAudioElement'],
	emits: ['audioOutputSelected'],
	data() {
			return {
				audioOutputTestEnabled:false,
			}
		},
		
	mounted() {	
		this.$watch('audioOutputDevices', (newVal, oldVal) => {			
			// set 'Please select one' option
			let event = {target:{value:''}}
			this.userChangeDevice( event )
    	})	
	},	
				
	methods: {
		/*
		 * a user clicked to audio test button - handler
		 */
		startTestAudioOutput(){
			this.audioOutputTestEnabled = false
						
			this.meetingAudioElement.src = Constants.AUDIO_TEST_SOUND_URL
			this.meetingAudioElement.play
						
			// stop audio after 3 sec.
			let that = this;
			setTimeout(function () {		    	
		    	that.meetingAudioElement.pause();
				that.meetingAudioElement.currentTime = 0;	
				that.meetingAudioElement.src = ''	    		    
		    	that.audioOutputTestEnabled = true		    			       
		    }, 3000);
		},
		
		/*
		 * a user selected a device
		 * emit selected device to a parent
		 * 
		 * @see https://aws.github.io/amazon-chime-sdk-js/interfaces/audiovideofacade.html#chooseaudiooutputdevice
		 */
		userChangeDevice( event ){
			// null indicate default device
			let deviceId = event.target.value == '' ? null : event.target.value
			this.$emit('audioOutputSelected', deviceId )
			this.audioOutputTestEnabled = deviceId ? true : false
		}			
	}
}
</script>