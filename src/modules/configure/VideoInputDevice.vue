<template>	
	<div class="row">
		<div class="col mt-4">
			<h3>Video input</h3>			
			<div class="input-group">
				<div class="input-group-prepend">
					<label class="input-group-text"><i class="fa fa-video-camera" aria-hidden="true"></i></label>
				</div>		
				<select v-on:change="userChangeDevice($event)" class="form-control">
					<option value="">Please select one</option>
					<option v-for="mediaDeviceInfo in videoInputDevices" v-bind:value="mediaDeviceInfo.deviceId" >
						{{mediaDeviceInfo.label}}
					</option>
				</select>
				
				<div class="input-group-append">
					<button v-on:click="startVideoPreview" v-bind:class="[videoInputTestEnabled ? 'btn-success' : 'btn-outline-secondary'  ]" class="btn" type="button" v-bind:disabled="!videoInputTestEnabled">Test</button>
				</div>
			</div>					
		</div>							
	</div>	
		
	<div class="row">			
		<div class="col mt-2">
			<div class="embed-responsive embed-responsive-16by9">
				<video v-bind:id="getConstant('ID_VIDEO_ELEMENT_FOR_PREVIEW')" class="w-100 h-100" ></video>
			</div>	
		</div>					
	</div>
</template>

<script>
import * as Constants from '../constants/Constants.js';

export default {	
	props: ['videoInputDevices', 'meetingSession'],
	emits: ['videoInputSelected'],
	data() {
			return {
				videoInputTestEnabled:false
			}
		},
	
	mounted() {	
		this.$watch('videoInputDevices', (newVal, oldVal) => {			
			// set 'Please select one' option
			let event = {target:{value:''}}
			this.userChangeDevice( event )
    	})	
	},
		
	beforeUnmount(){
		this.stopVideoPreview()
	},
				
	methods: {
		/*
		 * a user clicked to audio test button - handler
		 */
		startVideoPreview(){
			this.videoInputTestEnabled = false							
			this.meetingSession.audioVideo.startVideoPreviewForVideoInput( this.getHTMLElementForVideoPreview() )			
		},
		
		stopVideoPreview(){
			this.meetingSession.audioVideo.stopVideoPreviewForVideoInput( this.getHTMLElementForVideoPreview() )	
		},
		
		/*
		 * a user selected a device
		 * emit selected device to a parent
		 * 
		 * @see https://aws.github.io/amazon-chime-sdk-js/interfaces/audiovideofacade.html#choosevideoinputdevice
		 */
		userChangeDevice( event ){
			// null indicate no device
			let deviceId = event.target.value == '' ? null : event.target.value 																						
			this.$emit('videoInputSelected', deviceId )
			this.stopVideoPreview()
			this.videoInputTestEnabled = deviceId ? true : false 																		
		},
		
		/*
		 * Helper method for attaching Constants in View template.
		 * 
		 * @param {String} - Constant name. For instance: 'ID_APP'
		 * @returns - Constant value.
		 */
		getConstant( id ){
			return Constants[id]
		},
		
		getHTMLElementForVideoPreview(){
			return window.document.getElementById( Constants.ID_VIDEO_ELEMENT_FOR_PREVIEW ) 
		}						
	}
}
</script>