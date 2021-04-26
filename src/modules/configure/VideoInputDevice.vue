<template>
	<div class="row mt-4">
		<div class="col">
			<h3>Video input</h3>
			<div class="input-group">
				<div class="input-group-prepend">
					<label class="input-group-text bg-info text-light"><i class="fa fa-video-camera" aria-hidden="true"></i></label>
				</div>
				<select v-on:change="userChangeDevice($event)" class="form-control">
					<option value="">Please select one</option>
					<option v-for="mediaDeviceInfo in videoInputDevices" v-bind:value="mediaDeviceInfo.deviceId" >
						{{mediaDeviceInfo.label}}
					</option>
				</select>

				<div class="input-group-append">
					<button v-on:click="startVideoPreview" v-bind:class="[videoInputTestEnabled ? 'btn-success' : 'btn-outline-secondary']" class="btn" type="button" v-bind:disabled="!videoInputTestEnabled">Test</button>
				</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col mt-2">
			<div class="embed-responsive embed-responsive-16by9"
				v-bind:class="[showVideoPreview ? '' : 'd-none']">
				<video v-bind:id="utils.getConstant('ID_VIDEO_ELEMENT_FOR_PREVIEW')" class="w-100 h-100" ></video>
			</div>
		</div>
	</div>
</template>

<script>
import * as Constants from '../constants/Constants.js';
import Utils from "../tools/Utils.js"

export default {
	props: ['videoInputDevices', 'meetingSession'],
	emits: ['videoInputSelected'],
	data() {
			return {
				utils:Utils,
				videoInputTestEnabled:false,
				showVideoPreview:false
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
			this.meetingSession.audioVideo.startVideoPreviewForVideoInput( this.getHTMLElementForVideoPreview() )
			this.videoInputTestEnabled = false
			this.showVideoPreview = true
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
			this.stopVideoPreview()
			this.$emit('videoInputSelected', deviceId )
			this.videoInputTestEnabled = deviceId ? true : false
			this.showVideoPreview = false
		},

		getHTMLElementForVideoPreview(){
			return window.document.getElementById( Constants.ID_VIDEO_ELEMENT_FOR_PREVIEW )
		}
	}
}
</script>
