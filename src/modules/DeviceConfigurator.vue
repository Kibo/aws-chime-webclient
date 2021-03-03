<template>
	Hej
	
	<div v-if="isDeviceListReady">
		<ul>
			
		</ul>
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
				videoInputDevices:null
				
			}
		},
		
	//@see https://stackoverflow.com/questions/53513538/is-async-await-available-in-vue-js-mounted	
	async mounted() {				
		this.audioInputDevices = await this.meetingSession.audioVideo.listAudioInputDevices();
		this.audioOutputDevices = await this.meetingSession.audioVideo.listAudioOutputDevices();
		this.videoInputDevices = await this.meetingSession.audioVideo.listVideoInputDevices();
		
		this.isDeviceListReady = true;		
	},
	
	methods: { 
	
	}
}
</script>