<template>
	<div v-if="isDeviceListReady">
					
		<h3>Audio input</h3>
		<div class="row">
			<div class="col-10">
				<div class="input-group">
					
					<div class="input-group-prepend">
    					<label class="input-group-text"><i class="fa fa-microphone" aria-hidden="true"></i></label>
  					</div>					
					<select v-model="selectedAudioInputDeviceId" v-on:change="audioInputSelected()" class="form-control">
						<option disabled value="">Please select one</option>
						<option v-for="(mediaDeviceInfo, index) in audioInputDevices" v-bind:value="mediaDeviceInfo.deviceId" >
							{{mediaDeviceInfo.label}}
						</option>
					</select>
				</div>				
			</div>
			<div class="col-2">
				<i class="fa fa-bar-chart" aria-hidden="true"></i>
			</div>
		</div>
					
		<h3>Audio output</h3>
		<div class="row">
			<div class="col">
				<div class="input-group">
					<div class="input-group-prepend">
    					<label class="input-group-text"><i class="fa fa-volume-off" aria-hidden="true"></i></label>
  					</div>		
					<select v-model="selectedAudioOutputDeviceId" v-on:change="audioOutputSelected()" class="form-control">
						<option disabled value="">Please select one</option>
						<option v-for="(mediaDeviceInfo, index) in audioOutputDevices" v-bind:value="mediaDeviceInfo.deviceId" >
							{{mediaDeviceInfo.label}}
						</option>
					</select>
					
					<div class="input-group-append">
    					<button v-on:click="startTestAudioOutput" v-bind:class="[audioOutputTestEnabled ? 'btn-success' : 'btn-outline-secondary'  ]" class="btn" type="button" v-bind:disabled="!audioOutputTestEnabled">Test</button>
  					</div>					
				</div>										
			</div>			
		</div>
								
		<h3>Video input</h3>
		<div class="row">
			<div class="col">
				<div class="input-group">
					<div class="input-group-prepend">
    					<label class="input-group-text"><i class="fa fa-video-camera" aria-hidden="true"></i></label>
  					</div>	
					<select v-model="selectedVideoInputDeviceId" v-on:change="videoInputSelected()" class="form-control">
						<option disabled value="">Please select one</option>
						<option v-for="(mediaDeviceInfo, index) in videoInputDevices" v-bind:value="mediaDeviceInfo.deviceId" >
							{{mediaDeviceInfo.label}}
						</option>
					</select>
					
					<div class="input-group-append">
    					<button v-on:click="startTestVideoInput" v-bind:class="[videoInputTestEnabled ? 'btn-success' : 'btn-outline-secondary'  ]" class="btn" type="button" v-bind:disabled="!videoInputTestEnabled">Test</button>
  					</div>
					
				</div>
			</div>			
		</div>
						
		<video id="video-preview" class="w-100 h-100" style="max-width:137px;max-height:82px;border-radius:8px"></video>
		
	</div>	
</template>

<script>

export default {	
	props: ['meetingSession', 'meetingAudioElement'],
	data() {
			return {
				isDeviceListReady:false,
				
				audioInputDevices:null,
				audioOutputDevices:null,
				videoInputDevices:null,
				
				selectedAudioInputDeviceId:'',
				selectedAudioOutputDeviceId:'',
				selectedVideoInputDeviceId:'',
				
				audioInputTestEnabled:false,
				audioOutputTestEnabled:false,
				videoInputTestEnabled:false,											
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
		async audioInputSelected(){					
			try {
		      await this.meetingSession.audioVideo.chooseAudioInputDevice( this.selectedAudioInputDeviceId );		     
		    } catch (e) {
		      console.error(e)
		      return		      
		    }
		    
			this.audioInputTestEnabled = true		    									
		},
		
		/*
		 * a user selected a device - change handler
		 */
		async audioOutputSelected(){
			try {
		      await this.meetingSession.audioVideo.chooseAudioOutputDevice( this.selectedAudioOutputDeviceId );		     
		    } catch (e) {
		      console.error(e)
		      return		      
		    }
		    					
			this.audioOutputTestEnabled = true
		},
		
		/*
		 * a user selected a device - change handler
		 */
		async videoInputSelected(){
			try {
		      await this.meetingSession.audioVideo.chooseVideoInputDevice( this.selectedVideoInputDeviceId );		     
		    } catch (e) {
		      console.error(e)
		      return		      
		    }
		    
			this.videoInputTestEnabled = true
		},
		
		/*
		 * a user clicked to audio test button - handler
		 */
		startTestAudioOutput(){
			this.audioOutputTestEnabled = false
			this.meetingSession.audioVideo.bindAudioElement( this.meetingAudioElement )
			
									
		},
		
		/*
		 * Audio player stop play test sound
		 */
		stopTestAudioOutput(){				
			this.audioOutputTestEnabled = true	
		},
		
		/*
		 * a user clicked to video test button - handler
		 */
		startTestVideoInput(){
			console.log('testVideo')
		},
				
		getDeviceChangeObserver(){
			return {
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
	}
}
</script>