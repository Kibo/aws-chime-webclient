<template>
		
	<div class="row">
		<div class="col-3 text-white text-left">
			
		</div>
				
		<div class="col text-center">
			
			<div class="btn-group" role="group">				
			  <button type="button" class="btn btn-sm text-uppercase"
			  	v-if="utils.getSetting('IS_AUDIO_INPUT_DEVICE', role)"
			  	v-bind:class="isAudio ? 'btn-success' :'btn-secondary'"
			  	v-on:click.prevent="toggleAudio"
			  ><i class="fa fa-microphone" aria-hidden="true"></i> Voice</button>
			  		
			  <button type="button" class="btn btn-sm text-uppercase"
			  	v-if="utils.getSetting('IS_VIDEO_INPUT_DEVICE', role)"  
			  	v-bind:class="isVideo ? 'btn-success' :'btn-secondary'"
			  	v-on:click="toggleVideo"
			   ><i class="fa fa-video-camera" aria-hidden="true"></i> Video</button>
			   			   
			  <button type="button" class="btn btn-sm text-uppercase"
			  	v-if="utils.getSetting('CAN_SHARE_CONTENT', role)"
				v-bind:class="isShare ? 'btn-success' :'btn-secondary'"
				v-on:click="toggleShare"
			  ><i class="fa fa-share-alt" aria-hidden="true"></i> Share</button>
			  
			  <button type="button" class="btn btn-sm btn-danger text-uppercase"
			  	v-on:click="leaveMeeting"			  
			  ><i class="fa fa-sign-out" aria-hidden="true"></i> Leave</button>
			</div>
						
		</div>
		
		<div class="col-3 text-white text-right">
			<span class="badge badge-secondary">				
				<i class="fa fa-users" aria-hidden="true"></i> {{this.attendeePresenceSet.size}} | 
				<i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i> {{uplink}} | 
				<i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i> {{downlink}}
			</span>			
		</div>		
	</div>
	
	<div class="row">
		<div class="col-2">
			<div v-bind:id="utils.getConstant('ID_VIDEO_ELEMENT_TILES_CONTAINER')"></div>	
		</div>
		
		<div class="col">
			<div v-bind:id="utils.getConstant('ID_VIDEO_ELEMENT_PRESENTERS_CONTAINER')"></div>
			
			<div v-if="messages.length">
				<AlertMessage 
					v-for="(message, index) in messages" 
					v-bind:message="message" 
					v-on:dismiss="dismissAlert(index)" />
			</div>
				
		</div>
	</div>
					
</template>

<script>
import {
  MeetingSessionStatusCode
} from 'amazon-chime-sdk-js';
import AlertMessage from "../common/AlertMessage.vue"
import Utils from "../tools/Utils.js"

export default {
	components: {
		AlertMessage
	},
	props: ['meetingSession'],
	data() {
			return {
				role: this.$store.getters.role,
				
				isAudio: this.isLocalAudio(),
				isVideo:false,
				isShare:false,
				messages : [],
				
				utils:Utils,
											
				// index-tileId pairs
				indexMap:{},
				
				uplink:0,
				downlink:0,
				
				attendeePresenceSet:new Set()
			}
	},
	
	mounted() {				
		this.meetingSession.audioVideo.addObserver( this.getSessionObserver() );
		this.meetingSession.audioVideo.realtimeSubscribeToAttendeeIdPresence( this.attendeePresenceChange )
									
		this.meetingSession.audioVideo.start()							
		this.muteLocalAudio()
		
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
								
			if( this.isLocalAudio() ){
				this.muteLocalAudio()
				this.isAudio = false							
			}else{
				this.unmuteLocalAudio()
				this.isAudio = true
			}					
		},
		
		/*
		 * User click to Audio button
		 * 
		 * it starts and stops local video tile here
		 */
		async toggleVideo(){
			console.log('toggleVideo')
			this.isVideo = this.isVideo ? false : true
			
			if( this.isVideo ){
				
				try {
					// TODO					
		      		await this.meetingSession.audioVideo.chooseVideoInputDevice( this.$store.state.videoInputDeviceId );
		      		
		      		this.meetingSession.audioVideo.startLocalVideoTile();	
		      		
		      		let localTile = this.meetingSession.audioVideo.getLocalVideoTile()
		      		if( localTile ){
		      			this.meetingSession.audioVideo.bindVideoElement(
							localTile.id(),
							this.acquireVideoElement( localTile.id() )
				 		);	
		      		}		      		
		      			      		      		      		      		 
		    	} catch (e) {
		      		console.error(e)
		      		return
		    	}
																							
			}else{
				let localTile = this.meetingSession.audioVideo.getLocalVideoTile()
				if( localTile ){
					this.meetingSession.audioVideo.stopLocalVideoTile();
					this.releaseVideoElement( localTile.id() )	
				}														
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
			this.meetingSession.audioVideo.realtimeUnsubscribeToAttendeeIdPresence( this.attendeePresenceChange )			
		},
		
		dismissAlert(index){							
			this.messages.splice(index, 1);				
		},
		
		/*
		 * Acquire HTML video element for tile binding
		 * 
		 * @param {Number} tileId
		 * @param {Boolean} isMainTile 
		 * 
		 * @returns {Object} - HTMLVideoElement
		 */
		acquireVideoElement( tileId ){		  		  		
		  // Return the same video element if already bound.
		  for (let i = 0; i < Utils.getConstant('NUMBER_OF_VIDEO_TILES'); i += 1) {
		    if (this.indexMap[i] === tileId) {
		      return Utils.getHTMLVideoElement( tileId )
		    }
		  }
		  
		  // Return the next available video element.
		  for (let i = 0; i < Utils.getConstant('NUMBER_OF_VIDEO_TILES'); i += 1) {		  			  			  			  		
		    if (!this.indexMap.hasOwnProperty(i)) {
		      this.indexMap[i] = tileId;		      
		      return Utils.getHTMLVideoElement( tileId )
		    }
		  }
		  throw new Error('no video element is available');
		},
		
		releaseVideoElement( tileId ){
		  for (let i = 0; i < Utils.getConstant('NUMBER_OF_VIDEO_TILES'); i += 1) {
		    if (this.indexMap[i] === tileId) {
		      this.meetingSession.audioVideo.unbindVideoElement(tileId)		      		     		      		      		      		      		      		      		      		
		      delete this.indexMap[i];
		      Utils.removeElementById( Utils.getConstant('ID_PREFIX_FOR_VIDEO_ELEMENT') + tileId )		      
		      return;
		    }
		  }
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
					//console.log('audioVideoDidStart');	
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
					//console.log('connectionDidBecomeGood');	
				},
				
				/*
				 * Called when the connection has been poor for a while if meeting only uses audio.
				 */
				connectionDidBecomePoor: () =>{
					console.log('connectionDidBecomePoor');						
					this.messages.push({text:"Your connection is poor"})
				},
				
				/*
				 * Called when the connection has been poor if meeting uses video so that the observer can prompt the user about turning off video.
				 */
				connectionDidSuggestStopVideo: () =>{
					console.log('connectionDidSuggestStopVideo');						
					this.messages.push({text:"It is recommended to turn off the video.", type:"alert-danger"})
				},
				
				/*
				 * Called when connection health has changed.
				 * 
				 * @param connectionHealthData
				 * @see https://aws.github.io/amazon-chime-sdk-js/classes/connectionhealthdata.html
				 */
				connectionHealthDidChange: connectionHealthData =>{
					//console.log('connectionHealthDidChange');	
				},
				
				/*
				 * Called when simulcast is enabled and simulcast uplink encoding layers get changed.
				 * 
				 * @param simulcastLayers
				 * @see https://aws.github.io/amazon-chime-sdk-js/enums/simulcastlayers.html
				 */
				encodingSimulcastLayersDidChange: simulcastLayers =>{
					//console.log('encodingSimulcastLayersDidChange');
				},
				
				/*
				 * Called when total downlink video bandwidth estimation is less than required video bitrates.
				 * 
				 * @param {Number} estimatedBandwidth
				 * @param {Number} requiredBandwidth
				 */
				estimatedDownlinkBandwidthLessThanRequired: ( estimatedBandwidth, requiredBandwidth ) =>{
					//console.log('estimatedDownlinkBandwidthLessThanRequired');	
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
					//console.log(`eventDidReceive: ${name}`);
				},
				
				/*
				 * Called when the media stats are available.
				 * 
				 * @param clientMetricReport 
				 * @see https://aws.github.io/amazon-chime-sdk-js/interfaces/clientmetricreport.html
				 */
				metricsDidReceive: clientMetricReport =>{									
					const metricReport = clientMetricReport.getObservableMetrics()
					
					if (typeof metricReport.availableSendBandwidth === 'number' 
						&& !isNaN(metricReport.availableSendBandwidth)){
							this.uplink = Math.floor(metricReport.availableSendBandwidth / 1000)
				    	
				    }else if(typeof metricReport.availableOutgoingBitrate === 'number' 
				    	&& !isNaN(metricReport.availableOutgoingBitrate)){
				    	this.uplink = Math.floor(metricReport.availableOutgoingBitrate / 1000)
				    }
				    
				    if (typeof metricReport.availableReceiveBandwidth === 'number' 
				    	&& !isNaN(metricReport.availableReceiveBandwidth)){
							this.downlink = Math.floor(metricReport.availableReceiveBandwidth / 1000)
				    	
				    }else if(typeof metricReport.availableIncomingBitrate === 'number' 
				    	&& !isNaN(metricReport.availableIncomingBitrate)){
				    	this.downlink = Math.floor(metricReport.availableIncomingBitrate / 1000)
				    }																					
				},
				
				/*
				 * Called when the remote video sending sources get changed.
				 */
				remoteVideoSourcesDidChange: videoSources => {
					//console.log('remoteVideoSourcesDidChange');
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
										
					// TODO it depends on Constant.NUMBER_OF_VIDEO_TILES
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
					//console.log('videoNotReceivingEnoughData');
				},
				
				/*
				 * Called when available video receiving bandwidth changed to trigger video subscription if needed.
				 */
				videoReceiveBandwidthDidChange: ( newBandwidthKbps, oldBandwidthKbps ) => {
					//console.log('videoReceiveBandwidthDidChange');
					//console.log(`Receiving bandwidth changed from ${oldBandwidthKbps} to ${newBandwidthKbps}`);
				},
				
				/*
				 * Called when available video sending bandwidth changed.
				 */
				videoSendBandwidthDidChange: ( newBandwidthKbps, oldBandwidthKbps ) => {
					//console.log('videoSendBandwidthDidChange');
					//console.log(`Sending bandwidth changed from ${oldBandwidthKbps} to ${newBandwidthKbps}`);
				},
				
				/*				
				 *	Chime SDK allows a total of 16 simultaneous videos per meeting. 
				 *	If you try to share more video, this method will be called.
				 *	This can be used to trigger a message to the user about the situation.
				 * 
				 * @see 'videoAvailabilityDidChange' to find out when it becomes available.
				 */
				videoSendDidBecomeUnavailable: () =>{
					//console.log('videoSendDidBecomeUnavailable');
					//console.log('You cannot share your video');
				},
				
				/*
				 * Called when metric of video outbound traffic is received.
				 */
				videoSendHealthDidChange: (bitrateKbps, packetsPerSecond) =>{
					//console.log('videoSendHealthDidChange');
					//console.log(`Sending bitrate in kilobits per second: ${bitrateKbps} and ${packetsPerSecond}`);
				},
											
				/*
				* Called whenever a tile has been created or updated.
				* 
				* States:
				* @see https://aws.github.io/amazon-chime-sdk-js/classes/videotilestate.html
				*/				
				videoTileDidUpdate: tileState => {																
					// Ignore a tile without attendee ID, a local tile (your video), and a content share.
				 	if (!tileState.boundAttendeeId || tileState.localTile || tileState.isContent) {
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
			Utils.getSetting('AUDIO_VIDEO_OBSERVER_CALLBACKS_FOR_REMOVE', this.role).forEach(function( functionName ){
				
				if( audioVideoObserver[functionName] && typeof audioVideoObserver[functionName] === 'function' ){
					console.log( 'Callback ' + functionName + ' has been remove.')
					delete audioVideoObserver[functionName]									
				}										
			})
			
			return audioVideoObserver;
		},
		
		/*
		 * Attendee presence change - handler
		 * 
		 * @param {String} attendeeId
		 * @param {Boolean} present
		 * @param {String} externalUserId (optional)
		 * @param {Boolean} dropped (optional)
		 * @param {RealtimeAttendeePositionInFrame | Null} posInFrame (optional)
		 * 
		 * @see https://aws.github.io/amazon-chime-sdk-js/interfaces/audiovideofacade.html#realtimesubscribetoattendeeidpresence
		 */
		attendeePresenceChange(attendeeId, present, externalUserId, dropped, posInFrame){
			if (present) {
				this.attendeePresenceSet.add(attendeeId);
			} else {
				this.attendeePresenceSet.delete(attendeeId);
			}																
		},
		
		/*
		 * Show video quality setting - helper method
		 */
		showVideoInputQualitySettings(){
			let setting = this.meetingSession.audioVideo.getVideoInputQualitySettings()
			return `VideoQuality: width: ${setting.videoWidth}, height: ${setting.videoHeight}, fps: ${setting.videoFrameRate}, bandWidth: ${setting.videoMaxBandwidthKbps} Kbps`
		},
		
		/*
		 * Mute local audio - helper method
		 */
		muteLocalAudio(){
			this.meetingSession.audioVideo.realtimeMuteLocalAudio()
			this.isAudio = false
		},
		
		/*
		 * Unmmute local audio - helper method
		 */
		unmuteLocalAudio(){
			this.meetingSession.audioVideo.realtimeUnmuteLocalAudio()
			this.isAudio = true	
		},
		
		/*
		 * Is local audio - helper method
		 * 
		 * @returns {Boolean}
		 */
		isLocalAudio(){
			return !this.meetingSession.audioVideo.realtimeIsLocalAudioMuted()
		}												
	}	
}
</script>