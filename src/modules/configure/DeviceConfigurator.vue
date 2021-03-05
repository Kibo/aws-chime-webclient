<template>
	<div v-if="isDeviceListReady">
		
		<h3>Audio input</h3>
		<div class="form-group">
			<select v-model="selectedAudioInputDeviceId" class="form-control">
				<option disabled value="">Please select one</option>
				<option v-for="(mediaDeviceInfo, index) in audioInputDevices" v-bind:value="mediaDeviceInfo.deviceId" >
					{{mediaDeviceInfo.label}}
				</option>
			</select>
		</div>
		
		<h3>Audio output</h3>
		<div class="form-group">		
			<select v-model="selectedAudioOutputDeviceId" class="form-control">
				<option disabled value="">Please select one</option>
				<option v-for="(mediaDeviceInfo, index) in audioOutputDevices" v-bind:value="mediaDeviceInfo.deviceId" >
					{{mediaDeviceInfo.label}}
				</option>
			</select>
		</div>
				
		<h3>Video input</h3>
		<div class="form-group">
			<select v-model="selectedVideoInputDeviceId" class="form-control">
				<option disabled value="">Please select one</option>
				<option v-for="(mediaDeviceInfo, index) in videoInputDevices" v-bind:value="mediaDeviceInfo.deviceId" >
					{{mediaDeviceInfo.label}}
				</option>
			</select>
		</div>
		
	</div>	
</template>

<script>

export default {	
	props: ['meetingSession'],
	data() {
			return {
				isDeviceListReady:false,
				
				audioInputDevices:null,
				audioOutputDevices:null,
				videoInputDevices:null,
				
				selectedAudioInputDeviceId:'',
				selectedAudioOutputDeviceId:'',
				selectedVideoInputDeviceId:''									
			}
		},
		
	//@see https://stackoverflow.com/questions/53513538/is-async-await-available-in-vue-js-mounted	
	async mounted() {				
		this.audioInputDevices = await this.meetingSession.audioVideo.listAudioInputDevices();
		this.audioOutputDevices = await this.meetingSession.audioVideo.listAudioOutputDevices();
		this.videoInputDevices = await this.meetingSession.audioVideo.listVideoInputDevices();
					
		
		// TODO - remove observer after setting
		this.meetingSession.audioVideo.addDeviceChangeObserver( this.$options.deviceChangeObserver );
		
		
		console.log("########" + this.$options.deviceChangeObserver )
				
		this.isDeviceListReady = true;		
	},
	
	methods: { 
	
	},
	
	deviceChangeObserver:{
		audioInputsChanged: freshAudioInputDeviceList => {
			this.audioInputDevices = freshAudioInputDeviceList 
		},
		audioOutputsChanged: freshAudioOutputDeviceList => {
			this.audioOutputDevices = freshAudioOutputDeviceList
		},
		videoInputsChanged: freshVideoInputDeviceList => {
			this.videoInputDevices = freshVideoInputDeviceList
		}
	}
}
</script>