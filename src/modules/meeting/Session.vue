<template>
	<div class="row">
		<div class="col">Prezentation</div>		
	</div>
	<div class="row">
		<template 
			v-for="n in utils.getSetting('NUMBER_OF_VIDEO_TILES')" 
			v-bind:id="n">			
			<div class="col">							
				<VideoTile v-bind:id="utils.getConstant('PREFIX_FOR_ID_VIDEO_ELEMENT') + (n-1)" />
			</div>
			<div class="w-100" v-if="n%4===0"></div>
		</template>				
	</div>	
</template>

<script>
import VideoTile from "./VideoTile.vue"
import Utils from "../tools/Utils.js"

export default {
	components: {
		VideoTile			
	},
	props: ['meetingSession'],
	data() {
			return {
				utils:Utils,
											
				// index-tileId pairs
				indexMap:{},
			}
	},
	
	mounted() {				
		this.meetingSession.audioVideo.addObserver( this.getSessionObserver() );	
		
		
		//meetingSession.audioVideo.start()
		// meetingSession.audioVideo.stop()
		//meetingSession.audioVideo.startLocalVideoTile();	
	},
	
	beforeUnmount(){
		this.meetingSession.audioVideo.removeObserver( this.getSessionObserver() )
	},
		
	methods:{
		
		acquireVideoElement( tileId ){
		  
		  // Return the same video element if already bound.
		  for (let i = 0; i < Utils.getSetting('NUMBER_OF_VIDEO_TILES'); i += 1) {
		    if (this.indexMap[i] === tileId) {
		      return this.getHTMLVideoElement(i)
		    }
		  }
		  
		  // Return the next available video element.
		  for (let i = 0; i < Utils.getSetting('NUMBER_OF_VIDEO_TILES'); i += 1) {
		    if (!this.indexMap.hasOwnProperty(i)) {
		      this.indexMap[i] = tileId;
		      return this.getHTMLVideoElement(i)
		    }
		  }
		  throw new Error('no video element is available');
		},
		
		releaseVideoElement( tileId ){
		  for (let i = 0; i < Utils.getSetting('NUMBER_OF_VIDEO_TILES'); i += 1) {
		    if (indexMap[i] === tileId) {
		      delete this.indexMap[i];
		      return;
		    }
		  }
		},
		
		/*
		 * Get HTMLVideoElement from DOM
		 * 
		 * @param {Number} idx, index 
		 * @return {HTMLVideoElement}
		 */
		getHTMLVideoElement( idx ){
			let id = Utils.getConstant('PREFIX_FOR_ID_VIDEO_ELEMENT') + idx
			let videoElement = window.document.getElementById( id )
			if( !videoElement ){
				throw new Error('No video element is available: ' + id);
			}
			return videoElement
		},
		
		/*
		 * Audio Video observer
		 * 
		 * @see https://aws.github.io/amazon-chime-sdk-js/interfaces/audiovideoobserver.html
		 */
		getSessionObserver(){
			return {
				
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
					console.log('eventDidReceive');
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
				videoAvailabilityDidChange: availability =>{
					console.log('videoAvailabilityDidChange');	
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
					console.log('videoTileDidUpdate');
				
					// Ignore a tile without attendee ID, a local tile (your video), and a content share.
				 	if (!tileState.boundAttendeeId || tileState.localTile || tileState.isContent) {
						return;
				 	}
				
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
					
					//TODO
					//To unbind a tile, call meetingSession.audioVideo.unbindVideoElement(tileId).
			  }
			}
		}					
	}	
}
</script>