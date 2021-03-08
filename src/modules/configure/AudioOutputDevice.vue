<template>
	<div class="input-group">
		<div class="input-group-prepend">
			<label class="input-group-text"><i class="fa fa-volume-off" aria-hidden="true"></i></label>
		</div>		
		<select v-on:change="userChangeDevice($event)" class="form-control">
			<option disabled value="">Please select one</option>
			<option v-for="mediaDeviceInfo in audioOutputDevices" v-bind:value="mediaDeviceInfo.deviceId" >
				{{mediaDeviceInfo.label}}
			</option>
		</select>
		
		<div class="input-group-append">
			<button v-on:click="startTestAudioOutput" v-bind:class="[audioOutputTestEnabled ? 'btn-success' : 'btn-outline-secondary'  ]" class="btn" type="button" v-bind:disabled="!audioOutputTestEnabled">Test</button>
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
		 */
		userChangeDevice( event ){				
			this.$emit('audioOutputSelected', event.target.value )
			
			this.audioOutputTestEnabled = true
		}			
	}
}
</script>