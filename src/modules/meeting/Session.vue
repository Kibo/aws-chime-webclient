<template>
	
	<div class="row">
		<div class="col">
			<div v-if="messages.length">
				<AlertMessage 
					v-for="(message, index) in messages" 
					v-bind:message="message" 
					v-on:dismiss="dismissAlert(index)" />
			</div>			
		</div>		
	</div>
	
	<div class="row">
		<div v-bind:id="utils.getConstant('ID_VIDEO_ELEMENT_CONTAINER_SHARE')"></div>						
	</div>
	
	<div class="row">
		<div v-bind:id="utils.getConstant('ID_VIDEO_ELEMENT_CONTAINER_TILES')"></div>
	</div>
	
	<div class="row my-2">
		<div class="col text-center">
			<div class="btn-group" role="group">
				
			  <button type="button" class="btn"
			  	v-if="utils.getSetting('IS_AUDIO_INPUT_DEVICE')"
			  	v-bind:class="isAudio ? 'btn-success' :'btn-secondary'"
			  	v-on:click="toggleAudio"
			  ><i class="fa fa-microphone" aria-hidden="true"></i> Voice</button>
			  		
			  <button type="button" class="btn btn-secondary"
			  	v-if="utils.getSetting('IS_VIDEO_INPUT_DEVICE')" 
			  	v-bind:class="isVideo ? 'btn-success' :'btn-secondary'"
			  	v-on:click="toggleVideo"
			   ><i class="fa fa-video-camera" aria-hidden="true"></i> Video</button>
			   			   
			  <button type="button" class="btn btn-secondary"
			  	v-if="utils.getSetting('CAN_SHARE_CONTENT')"
				v-bind:class="isShare ? 'btn-success' :'btn-secondary'"
				v-on:click="toggleShare"
			  ><i class="fa fa-share-alt" aria-hidden="true"></i> Share</button>
			  
			  <button type="button" class="btn btn-danger"
			  	v-on:click="leaveMeeting"			  
			  ><i class="fa fa-sign-out" aria-hidden="true"></i> Leave</button>
			</div>	
		</div>		
	</div>
		
</template>

<script>
import {
  MeetingSessionStatusCode
} from 'amazon-chime-sdk-js';
import AlertMessage from "../common/AlertMessage.vue"
import VideoTile from "./VideoTile.vue"
import Utils from "../tools/Utils.js"

export default {
	components: {
		VideoTile,
		AlertMessage
	},
	props: ['meetingSession'],
	data() {
			return {
				isAudio:false,
				isVideo:false,
				isShare:false,
				messages : [],
				
				utils:Utils,
											
				// index-tileId pairs
				indexMap:{},
			}
	},
	
	mounted() {				
		this.meetingSession.audioVideo.addObserver( this.getSessionObserver() );
		this.meetingSession.audioVideo.start()
				
		console.log( this.showVideoInputQualitySettings() )			
	},
	
	beforeUnmount(){
		this.leaveMeeting()
	},
		
	methods:{
		
		/*
		 * User click to Audio button
		 */
		toggleAudio(){
			console.log('toggleAudio')
			this.isAudio = this.isAudio ? false : true	
		},
		
		/*
		 * User click to Audio button
		 */
		async toggleVideo(){
			console.log('toggleVideo')
			this.isVideo = this.isVideo ? false : true
			
			if( this.isVideo ){
				
				try {
		      		await this.meetingSession.audioVideo.chooseVideoInputDevice( this.$store.state.videoInputDeviceId );
		      		this.meetingSession.audioVideo.startLocalVideoTile();		      		      		      		      		 
		    	} catch (e) {
		      		console.error(e)
		      		return
		    	}
																							
			}else{
				this.meetingSession.audioVideo.stopLocalVideoTile();
			}			
		},
		
		/*
		 * User click to Share button
		 */
		toggleShare(){
			console.log('toggleShare')
			this.isShare = this.isShare ? false : true	
		},
		
		/*
		 * User click to Leave button
		 */
		leaveMeeting(){
			console.log('Leave meeting')
			this.meetingSession.audioVideo.stop()
			this.meetingSession.audioVideo.removeObserver( this.getSessionObserver() )
		},
		
		dismissAlert(index){							
			this.messages.splice(index, 1);				
		},
		
		/*
		 * Acquire HTML video element for tile binding
		 * 
		 * @param {Number} tileId
		 * @param {Boolean} isContent - is share content?
		 * 
		 * @returns {Object} - HTMLVideoElement
		 */
		acquireVideoElement( tileId, isContent=false){
		  
		  // Return the same video element if already bound.
		  for (let i = 0; i < Utils.getSetting('NUMBER_OF_VIDEO_TILES'); i += 1) {
		    if (this.indexMap[i] === tileId) {
		      return this.getHTMLVideoElement( tileId, isContent )
		    }
		  }
		  
		  // Return the next available video element.
		  for (let i = 0; i < Utils.getSetting('NUMBER_OF_VIDEO_TILES'); i += 1) {
		    if (!this.indexMap.hasOwnProperty(i)) {
		      this.indexMap[i] = tileId;
		      return this.getHTMLVideoElement( tileId, isContent )
		    }
		  }
		  throw new Error('no video element is available');
		},
		
		releaseVideoElement( tileId ){
		  for (let i = 0; i < Utils.getSetting('NUMBER_OF_VIDEO_TILES'); i += 1) {
		    if (this.indexMap[i] === tileId) {
		      this.meetingSession.audioVideo.unbindVideoElement(tileId)
		      
		      let success = Utils.removeElementById( Utils.getConstant('PREFIX_FOR_ID_VIDEO_ELEMENT') + tileId )
		      
		      if(success){
		      	console.log( 'Remove Video Element' )
		      }else{
		      	console.log( 'Error - Remove Video Element' )
		      }
		      		      		      		    
		      delete this.indexMap[i];		      
		      return;
		    }
		  }
		},
		
		/*
		 * Get HTMLVideoElement from DOM
		 * 
		 * @param {Number} tileId
		 * @param {Boolean} isContent - is share content?
		 * @return {HTMLVideoElement}
		 */
		getHTMLVideoElement( tileId, isContent ){					
			let id = Utils.getConstant('PREFIX_FOR_ID_VIDEO_ELEMENT') + tileId			
			let videoWrapper = window.document.getElementById( id )
			if( videoWrapper ){
				return videoWrapper.querySelector("video")
			}
																																			
			return Utils.buildVideoElement( id, isContent )
		},
		
		/*
		 * Audio Video observer
		 * 
		 * @see https://aws.github.io/amazon-chime-sdk-js/interfaces/audiovideoobserver.html
		 */
		getSessionObserver(){
			let audioVideoObserver = {
				
				/*
				 * Called when the session has started.
				 */
				audioVideoDidStart: () => {				
				    console.log('audioVideoDidStart');	
				},
				
				/*
				 * Called when the session is connecting or reconnecting.
				 */
				audioVideoDidStartConnecting: reconnecting => {
				    if (reconnecting) {
				      // e.g. the WiFi connection is dropped.
				      console.log('Attempting to reconnect');
				    }
				},
											
				/*
				 * Called when the session has stopped from a started state with the reason provided in the status.
				 * 
				 * @param sessionStatus - https://aws.github.io/amazon-chime-sdk-js/classes/meetingsessionstatus.html
				 */
				audioVideoDidStop: sessionStatus => {					
					const sessionStatusCode = sessionStatus.statusCode();
					if (sessionStatusCode === MeetingSessionStatusCode.Left) {
					/*
						- You called meetingSession.audioVideo.stop().
						- When closing a browser window or page, Chime SDK attempts to leave the session.
					*/
						console.log('You left the session');
					} else {
						console.log('Stopped with a session status code: ', sessionStatusCode);
					}										
				},
											
				/*
				 * Called when connection has changed to good from poor.
				 */
				connectionDidBecomeGood: () =>{
					console.log('connectionDidBecomeGood');	
				},
				
				/*
				 * Called when the connection has been poor for a while if meeting only uses audio.
				 */
				connectionDidBecomePoor: () =>{
					console.log('connectionDidBecomePoor');	
					console.log('Your connection is poor');	
				},
				
				/*
				 * Called when the connection has been poor if meeting uses video so that the observer can prompt the user about turning off video.
				 */
				connectionDidSuggestStopVideo: () =>{
					console.log('connectionDidSuggestStopVideo');	
					console.log('Recommend turning off your video');
				},
				
				/*
				 * Called when connection health has changed.
				 * 
				 * @param connectionHealthData
				 * @see https://aws.github.io/amazon-chime-sdk-js/classes/connectionhealthdata.html
				 */
				connectionHealthDidChange: connectionHealthData =>{
					console.log('connectionHealthDidChange');	
				},
				
				/*
				 * Called when simulcast is enabled and simulcast uplink encoding layers get changed.
				 * 
				 * @param simulcastLayers
				 * @see https://aws.github.io/amazon-chime-sdk-js/enums/simulcastlayers.html
				 */
				encodingSimulcastLayersDidChange: simulcastLayers =>{
					console.log('encodingSimulcastLayersDidChange');
				},
				
				/*
				 * Called when total downlink video bandwidth estimation is less than required video bitrates.
				 * 
				 * @param {Number} estimatedBandwidth
				 * @param {Number} requiredBandwidth
				 */
				estimatedDownlinkBandwidthLessThanRequired: ( estimatedBandwidth, requiredBandwidth ) =>{
					console.log('estimatedDownlinkBandwidthLessThanRequired');	
				},
				
				/*
				 * Called when specific events occur during the meeting and includes attributes of the event. 
				 * This can be used to create analytics around meeting metric.
				 * 
				 * @param name - https://aws.github.io/amazon-chime-sdk-js/globals.html#eventname
				 * @param attributes - https://aws.github.io/amazon-chime-sdk-js/interfaces/eventattributes.html
				 * 
				 */
				eventDidReceive: (name, attributes) =>{
					console.log(`eventDidReceive: ${name}`);
				},
				
				/*
				 * Called when the media stats are available.
				 * 
				 * @param clientMetricReport - https://aws.github.io/amazon-chime-sdk-js/interfaces/clientmetricreport.html
				 */
				metricsDidReceive: clientMetricReport =>{
					console.log('metricsDidReceive');
				},
				
				/*
				 * Called when the remote video sending sources get changed.
				 */
				remoteVideoSourcesDidChange: videoSources => {
					console.log('remoteVideoSourcesDidChange');
				},
				
				/*
				 * Called when video availability has changed. 
				 * This information can be used to decide whether to switch the connection type to video and whether or 
				 * not to offer the option to start the local video tile.
				 * 
				 * @param availability - https://aws.github.io/amazon-chime-sdk-js/classes/meetingsessionvideoavailability.html
				 */
				videoAvailabilityDidChange: videoAvailability =>{
					console.log('videoAvailabilityDidChange');	
										
					// TODO it depends on Profile.NUMBER_OF_VIDEO_TILES
					if (videoAvailability.canStartLocalVideo) {
						console.log('You can share your video');
					} else {
						console.log('You cannot share your video');
					}
				},
				
				/*
				 * Called when one or more remote video streams do not meet expected average bitrate.
				 */
				videoNotReceivingEnoughData: receivingDataMap => {
					console.log('videoNotReceivingEnoughData');
				},
				
				/*
				 * Called when available video receiving bandwidth changed to trigger video subscription if needed.
				 */
				videoReceiveBandwidthDidChange: ( newBandwidthKbps, oldBandwidthKbps ) => {
					console.log('videoReceiveBandwidthDidChange');
					console.log(`Receiving bandwidth changed from ${oldBandwidthKbps} to ${newBandwidthKbps}`);
				},
				
				/*
				 * Called when available video sending bandwidth changed.
				 */
				videoSendBandwidthDidChange: ( newBandwidthKbps, oldBandwidthKbps ) => {
					console.log('videoSendBandwidthDidChange');
					console.log(`Sending bandwidth changed from ${oldBandwidthKbps} to ${newBandwidthKbps}`);
				},
				
				/*				
				 *	Chime SDK allows a total of 16 simultaneous videos per meeting. 
				 *	If you try to share more video, this method will be called.
				 *	This can be used to trigger a message to the user about the situation.
				 * 
				 * @see 'videoAvailabilityDidChange' to find out when it becomes available.
				 */
				videoSendDidBecomeUnavailable: () =>{
					console.log('videoSendDidBecomeUnavailable');
					console.log('You cannot share your video');
				},
				
				/*
				 * Called when metric of video outbound traffic is received.
				 */
				videoSendHealthDidChange: (bitrateKbps, packetsPerSecond) =>{
					console.log('videoSendHealthDidChange');
					console.log(`Sending bitrate in kilobits per second: ${bitrateKbps} and ${packetsPerSecond}`);
				},
											
				/*
				* Called whenever a tile has been created or updated.
				* 
				* States:
				* @see https://aws.github.io/amazon-chime-sdk-js/classes/videotilestate.html
				*/				
				videoTileDidUpdate: tileState => {																
					// Ignore a tile without attendee ID, a local tile (your video), and a content share.
				 	if (!tileState.boundAttendeeId || tileState.isContent) {
						return;
				 	}
				 	
				 	console.log('videoTileDidUpdate');
				 								
					this.meetingSession.audioVideo.bindVideoElement(
						tileState.tileId,
						this.acquireVideoElement(tileState.tileId)
				 	);
				},
				
				/*
				* Called whenever a tile has been removed.
				*/
				videoTileWasRemoved: tileId => {
					console.log('videoTileWasRemoved');
					this.releaseVideoElement(tileId);
			  }
			}
			
			/*
			 * Remove unwanted callbacks from observer
			 */
			Utils.getSetting('AUDIO_VIDEO_OBSERVER_CALLBACKS_FOR_REMOVE').forEach(function( functionName ){
				
				if( audioVideoObserver[functionName] && typeof audioVideoObserver[functionName] === 'function' ){
					console.log( 'Callback ' + functionName + ' has been remove.')
					delete audioVideoObserver[functionName]									
				}										
			})
			
			return audioVideoObserver;
		},
		
		showVideoInputQualitySettings(){
			let setting = this.meetingSession.audioVideo.getVideoInputQualitySettings()
			return `VideoQuality: width: ${setting.videoWidth}, height: ${setting.videoHeight}, fps: ${setting.videoFrameRate}, , bandWidth: ${setting.videoMaxBandwidthKbps} Kbps`
		}								
	}	
}
</script>