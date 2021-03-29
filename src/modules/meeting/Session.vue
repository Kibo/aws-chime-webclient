<template>
	
	<nav class="navbar sticky-top navbar-expand-sm navbar-light bg-light mb-2">
		<span class="navbar-brand d-none d-sm-block" >AWS Chime</span>

		<ul class="navbar-nav mr-auto">
			
			<li class="nav-item" 
			v-if="utils.getSetting('IS_AUDIO_INPUT_DEVICE', role)">
				<a class="nav-link" href="#" 
				v-bind:class="isAudio ? 'active' :''" 
				v-on:click.prevent="toggleAudio">
					<i class="fa fa-microphone" aria-hidden="true"></i> Voice
				</a>
			</li>
			
			<li class="nav-item" 
			v-if="utils.getSetting('IS_VIDEO_INPUT_DEVICE', role)">
				<a class="nav-link" href="#" 
				v-bind:class="isVideo ? 'active' :''" 
				v-on:click.prevent="toggleVideo">
					<i class="fa fa-video-camera" aria-hidden="true"></i> Video
				</a>
			</li>
			
			<li class="nav-item" 
			v-if="utils.getSetting('CAN_SHARE_CONTENT', role)">
				<a class="nav-link" href="#" 
				v-bind:class="isShare ? 'active' :''" 
				v-on:click.prevent="toggleShare">
					<i class="fa fa-share-alt" aria-hidden="true"></i> Share
				</a>
			</li>
			
			<li class="nav-item">
				<a class="nav-link" href="#" 
				v-on:click.prevent="plugDevices">
					<i class="fa fa-plug" aria-hidden="true"></i> Devices
				</a>
			</li>
			
			<li class="nav-item">
				<a class="nav-link" href="#" 
				v-on:click.prevent="leaveMeeting">
					<i class="fa fa-sign-out" aria-hidden="true"></i> Leave
				</a>
			</li>
			
		</ul>
			
		<span class="navbar-text">				
			<i class="fa fa-users" aria-hidden="true"></i> {{this.attendeePresenceMap.size}} | 
			<i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i> {{uplink}} | 
			<i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i> {{downlink}}
		</span>	
				
	</nav>
			
	<div class="row">
		
		<div class="col-12 col-sm-12 col-md-2" 
			v-bind:class="utils.getSetting('SHOW_LEFT_PANEL', role) ? '':'d-none'">
			<div v-bind:id="utils.getConstant('ID_VIDEO_ELEMENT_TILES_CONTAINER')"></div>	
		</div>	
					
		<div class="col">
			<div v-if="messages.length">
				<AlertMessage 
					v-for="(message, index) in messages" 
					v-bind:message="message" 
					v-on:dismiss="dismissAlert(index)" />
			</div>  
			
			<div v-bind:id="utils.getConstant('ID_VIDEO_ELEMENT_PRESENTERS_CONTAINER')" style="position:relative;"></div>								
		</div>
		
		<div class="col-12 col-sm-12 col-md-2"					
			v-bind:class="utils.getSetting('SHOW_RIGHT_PANEL', role) ? '':'d-none'">					
				<ModeratorPanel 
					v-if="utils.getSetting('SHOW_MODERATOR_PANEL', role)"
					v-bind:attendeePresenceMap="attendeePresenceMap"
					v-on:presenterChanged="presenterChanged" />
																		
				<ChatPanel 
					v-if="utils.getSetting('SHOW_CHAT_PANEL', role)" 
					v-bind:attendeePresenceMap="attendeePresenceMap" />			
		</div>
	</div>
		
</template>

<script>
import {
  MeetingSessionStatusCode
} from 'amazon-chime-sdk-js';
import AlertMessage from "../common/AlertMessage.vue"
import ModeratorPanel from "./ModeratorPanel.vue"
import ChatPanel from "./ChatPanel.vue"
import {Attendee, AttendeeMap} from "../common/Attendee.js"
import Utils from "../tools/Utils.js"

export default {
	components: {
		AlertMessage,
		ModeratorPanel,
		ChatPanel
	},
	emits: ['configureDevices'],
	props: ['meetingSession'],
	data() {
			return {
				logger:this.$store.state.logger,
				role: this.$store.getters.role,
				localAttendeeId: this.$store.getters.attendeeId,
				
				isAudio: this.isLocalAudio(),
				isVideo:false,
				
				// @see audioVideoObserver.videoAvailabilityDidChange() 
				// @see audioVideoObserver.videoSendDidBecomeUnavailable()
				isVideoAvailable:true,
				
				isShare:false,
				
				messages : [],
				
				utils:Utils,
											
				// index-tileId pairs
				indexMap:{},
				
				uplink:0,
				downlink:0,
											
				attendeePresenceMap:new AttendeeMap()
			}
	},
	
	mounted() {				
		this.meetingSession.audioVideo.addObserver( this.getSessionObserver() );		
		this.meetingSession.audioVideo.addContentShareObserver( this.getContentShareObserver() )
		this.meetingSession.audioVideo.realtimeSubscribeToAttendeeIdPresence( this.attendeePresenceChange )
									
		this.meetingSession.audioVideo.start()							
		this.muteLocalAudio()
							
		this.logger.info( this.showVideoInputQualitySettings() )		
	},
	
	beforeUnmount(){
		this.leaveMeeting()
	},
		
	methods:{
							
		/*
		 * User click to Audio button
		 */
		toggleAudio(){			
			this.logger.info('toggleAudio - handler')
								
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
			this.logger.info('toggleVideo - handler')
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
							this.acquireVideoElement( localTile.id(), this.isLocalAttendeePrezenter())
				 		);	
		      		}
		      				      				      	
		    	} catch (e) {		      		
		      		this.logger.error(e)
		      		return
		    	}
																							
			}else{
				this.stopLocalVideoTile()
			}			
		},
		
		/*
		 * User click to Share button
		 */
		async toggleShare(){			
			this.logger.info('toggleShare - handler')
			
			/*
			 * The attendee is added to the list if he has set a microphone.
			 *  
			 * @see this.attendeePresenceChange 
			 */
			let localAttendee = this.attendeePresenceMap.get(this.localAttendeeId)
			
			if(!localAttendee ){
				this.messages.push({text:"Set your microphone and camera first."})
				return
			}
						
			if(localAttendee 
				&& (!localAttendee.hasRole(this.utils.getConstant('ROLE_NAME_PRESENTER')))){
				this.messages.push({text:"Sorry, you are not a presenter."})
				return
			}
															
			this.isShare = this.isShare ? false : true
			
			if( this.isShare ){
				await this.meetingSession.audioVideo.startContentShareFromScreenCapture();	
			}else{
				this.stopContentShare()
			}
														
			return						
		},
		
		/*
		 * User click to Leave button
		 */
		leaveMeeting(){			
			this.logger.info('Leave meeting - handler')
			this.stopContentShare()
			this.meetingSession.audioVideo.stop()
			this.meetingSession.audioVideo.removeObserver( this.getSessionObserver() )						
			this.meetingSession.audioVideo.removeContentShareObserver( this.getContentShareObserver() )							
			this.meetingSession.audioVideo.realtimeUnsubscribeToAttendeeIdPresence( this.attendeePresenceChange )
			this.uplink = 0
			this.downlink = 0			
		},
		
		/*
		 * User click to Devices button
		 */
		plugDevices(){
			this.logger.info('a Attendee click to Configure Devices button.')
			this.$emit("configureDevices")
		},
		
		dismissAlert(index){							
			this.messages.splice(index, 1);				
		},
		
		/*
		 * Acquire HTML video element for tile binding
		 * 
		 * @param {Number} tileId
		 * @param {Boolean} isPresenterTile
		 * 
		 * @returns {Object} - HTMLVideoElement
		 */
		acquireVideoElement( tileId, isPresenterTile=false){		  	
			
			//TODO
			// max tile 16 + content tile
																		
			this.indexMap[tileId] = tileId;		      
			return Utils.getHTMLVideoElement( tileId, isPresenterTile, this.isLocalVideoTile( tileId ) )
			
			this.logger.info('Create video element with ID:#' + Utils.getConstant('ID_PREFIX_FOR_VIDEO_ELEMENT') + tileId)			
		},
		
		releaseVideoElement( tileId ){					
			this.meetingSession.audioVideo.unbindVideoElement(tileId)
			delete this.indexMap[tileId];
			Utils.removeElementById( Utils.getConstant('ID_PREFIX_FOR_VIDEO_ELEMENT') + tileId )
			
			this.logger.info('Release video element with ID:#' + Utils.getConstant('ID_PREFIX_FOR_VIDEO_ELEMENT') + tileId)
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
					this.logger.info('audioVideoObserver: audioVideoDidStart()')
				},
				
				/*
				 * Called when the session is connecting or reconnecting.
				 */
				audioVideoDidStartConnecting: reconnecting => {
				    if (reconnecting) {
				      // e.g. the WiFi connection is dropped.				      				     
				      this.logger.warn('audioVideoObserver: audioVideoDidStartConnecting()')				      
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
						this.logger.info('You left the session')
					} else {						
						this.logger.info('Stopped with a session status code: ', sessionStatusCode)	
					}										
				},
											
				/*
				 * Called when connection has changed to good from poor.
				 */
				connectionDidBecomeGood: () =>{					
					this.logger.info('audioVideoObserver: connectionDidBecomeGood()')	
				},
				
				/*
				 * Called when the connection has been poor for a while if meeting only uses audio.
				 */
				connectionDidBecomePoor: () =>{
					this.logger.warn('audioVideoObserver: connectionDidBecomePoor()')					
					this.messages.push({text:"Your connection is poor.", type:"alert-danger"})
				},
				
				/*
				 * Called when the connection has been poor if meeting uses video so that the observer can prompt the user about turning off video.
				 */
				connectionDidSuggestStopVideo: () =>{					
					this.logger.warn('audioVideoObserver: connectionDidSuggestStopVideo()')					
					this.messages.push({text:"It is recommended to turn off the video.", type:"alert-danger"})
				},
				
				/*
				 * Called when connection health has changed.
				 * 
				 * @param connectionHealthData
				 * @see https://aws.github.io/amazon-chime-sdk-js/classes/connectionhealthdata.html
				 */
				connectionHealthDidChange: connectionHealthData =>{					
					this.logger.info('audioVideoObserver: connectionHealthDidChange()')
				},
				
				/*
				 * Called when simulcast is enabled and simulcast uplink encoding layers get changed.
				 * 
				 * @param simulcastLayers
				 * @see https://aws.github.io/amazon-chime-sdk-js/enums/simulcastlayers.html
				 */
				encodingSimulcastLayersDidChange: simulcastLayers =>{					
					this.logger.info('audioVideoObserver: encodingSimulcastLayersDidChange()')
				},
				
				/*
				 * Called when total downlink video bandwidth estimation is less than required video bitrates.
				 * 
				 * @param {Number} estimatedBandwidth
				 * @param {Number} requiredBandwidth
				 */
				estimatedDownlinkBandwidthLessThanRequired: ( estimatedBandwidth, requiredBandwidth ) =>{					
					this.logger.warn('audioVideoObserver: estimatedDownlinkBandwidthLessThanRequired()')
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
					this.logger.info(`eventDidReceive: ${name}`)
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
					this.logger.info('audioVideoObserver: remoteVideoSourcesDidChange()')
				},
				
				/*
				 * Called when video availability has changed. 
				 * This information can be used to decide whether to switch the connection type to video and whether or 
				 * not to offer the option to start the local video tile.
				 * 
				 * @param availability - https://aws.github.io/amazon-chime-sdk-js/classes/meetingsessionvideoavailability.html
				 */
				videoAvailabilityDidChange: videoAvailability =>{																	
					if (videoAvailability.canStartLocalVideo) {						
						if( !this.isVideoAvailable ){
							this.isVideoAvailable = true
							this.messages.push({text:"You can start your video now."})
						}											
					} 
				},
				
				/*
				 * Called when one or more remote video streams do not meet expected average bitrate.
				 */
				videoNotReceivingEnoughData: receivingDataMap => {					
					this.logger.warn('audioVideoObserver: videoNotReceivingEnoughData()')
				},
				
				/*
				 * Called when available video receiving bandwidth changed to trigger video subscription if needed.
				 */
				videoReceiveBandwidthDidChange: ( newBandwidthKbps, oldBandwidthKbps ) => {					
					this.logger.info(`Receiving bandwidth changed from ${oldBandwidthKbps} to ${newBandwidthKbps}`)
				},
				
				/*
				 * Called when available video sending bandwidth changed.
				 */
				videoSendBandwidthDidChange: ( newBandwidthKbps, oldBandwidthKbps ) => {					
					this.logger.info(`Sending bandwidth changed from ${oldBandwidthKbps} to ${newBandwidthKbps}`)
				},
				
				/*				
				 *	Chime SDK allows a total of 16 simultaneous videos per meeting. 
				 *	If you try to share more video, this method will be called.
				 *	This can be used to trigger a message to the user about the situation.
				 * 
				 * @see 'videoAvailabilityDidChange' to find out when it becomes available.
				 */
				videoSendDidBecomeUnavailable: () =>{			
					this.isVideoAvailable = false
					this.messages.push({text:"Sorry, You cannot start your video now."})						
					this.logger.warn('You cannot start your video')					
				},
				
				/*
				 * Called when metric of video outbound traffic is received.
				 */
				videoSendHealthDidChange: (bitrateKbps, packetsPerSecond) =>{					
					this.logger.info(`Sending bitrate in kilobits per second: ${bitrateKbps} and ${packetsPerSecond}`)
				},
											
				/*
				* Called whenever a tile has been created or updated.
				* 
				* States:
				* @see https://aws.github.io/amazon-chime-sdk-js/classes/videotilestate.html
				*/				
				videoTileDidUpdate: tileState => {
																													
					// Ignore a tile without attendee ID
				 	if (!tileState.boundAttendeeId) {
						return;
				 	}
				 	
				 	//@see this.toggleVideo()
				 	if (tileState.localTile) {
						return;
				 	}
				 	
				 	let isPresenterTile = tileState.isContent ? true : false
				 	
				 	if(!isPresenterTile){				 		
				 		// broadcaster is not interested in attendee video tiles 
				 		if( !this.utils.getSetting('ATTACH_ATTENDEE_VIDEO_TILES', this.role) ){
				 			return
				 		}	
				 	} 
				 	
				 	this.meetingSession.audioVideo.bindVideoElement(
						tileState.tileId,
						this.acquireVideoElement(tileState.tileId, isPresenterTile)
				 	);				 					 
				},
				
				/*
				* Called whenever a tile has been removed.
				*/
				videoTileWasRemoved: tileId => {
					this.logger.info('audioVideoObserver: videoTileWasRemoved()')
					this.releaseVideoElement(tileId);
			  }
			}
			
			/*
			 * Remove unwanted callbacks from observer
			 */
			Utils.getSetting('AUDIO_VIDEO_OBSERVER_CALLBACKS_FOR_REMOVE', this.role).forEach(function( functionName ){
				
				if( audioVideoObserver[functionName] && typeof audioVideoObserver[functionName] === 'function' ){
					delete audioVideoObserver[functionName]
					this.logger.info('Callback ' + functionName + ' has been remove.')									
				}										
			})
			
			return audioVideoObserver;
		},
		
		/*
		 * Content share observer
		 * 
		 * @see https://aws.github.io/amazon-chime-sdk-js/interfaces/contentshareobserver.html
		 */
		getContentShareObserver(){
			let contentShareObserver = {
				
				/*
				 * Called when a content share session is started.
				 */
				contentShareDidStart: () =>{
					//TODO remove warn
					this.logger.warn("Content share session is started")	
				},
				
				/*
				 * Called when a content share session is stopped.
				 */
				contentShareDidStop:()=>{
					
					if( this.isLocalAttendeePrezenter() ){
						this.stopContentShare()
						this.logger.warn("Local share session is stopped")
					}
					
					//TODO remove warn
					this.logger.warn("Content share session is stopped")
				}
			}
			
			return contentShareObserver
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
																			
			// The attendee is added to the map if he has set a microphone.							
			if (present) {												
				let attendee = new Attendee(attendeeId)								
				attendee.externalUserId = externalUserId
				if( !attendee.isContent()){																								 		
					this.attendeePresenceMap.set(attendeeId, attendee);
				}										
			} else {
				this.attendeePresenceMap.delete(attendeeId);
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
			this.logger.info('Local audio muted.')
		},
		
		/*
		 * Unmmute local audio - helper method
		 */
		unmuteLocalAudio(){
			this.meetingSession.audioVideo.realtimeUnmuteLocalAudio()
			this.isAudio = true	
			this.logger.info('Local audio unmuted.')
		},
		
		/*
		 * Is local audio - helper method
		 * 
		 * @returns {Boolean}
		 */
		isLocalAudio(){
			return !this.meetingSession.audioVideo.realtimeIsLocalAudioMuted()
		},
		
		/*
		 * Is a local tile
		 * 
		 * @returns {Boolean}
		 */
		isLocalVideoTile( tileId ){
			let localTile = this.meetingSession.audioVideo.getLocalVideoTile()												
			return localTile && localTile.id() == tileId   
		},
		
		/*
		 * Stop local video tile - helper mepthod
		 */
		stopLocalVideoTile(){			
			let localTile = this.meetingSession.audioVideo.getLocalVideoTile()
			if( localTile ){
				this.meetingSession.audioVideo.stopLocalVideoTile();
				this.releaseVideoElement( localTile.id() )	
			}
			this.isVideo = false		
		},
		
		/*
		 * Stop content share - helper mepthod
		 */
		async stopContentShare(){			
			await this.meetingSession.audioVideo.stopContentShare();
			this.isShare = false	
		},
		
		/*
		 * Is the local attendee a presenter
		 */
		isLocalAttendeePrezenter(){
			let localAttendee = this.attendeePresenceMap.get( this.localAttendeeId )
			if( !localAttendee ){
				return false
			}	
			
			return localAttendee.hasRole(Utils.getConstant('ROLE_NAME_PRESENTER'))			
		},
		
		/*
		 * The presenter role changed - handler
		 * 
		 * the presenter role has been added or removed
		 * 
		 * @see ModeratorPanel.togglePresenter( attendeeId ) 
		 */
		presenterChanged( attendeeId ){
			let isLocalUser = this.localAttendeeId == attendeeId ? true : false
			
			if(!isLocalUser){
				return
			}
			
			if( this.isLocalAttendeePrezenter() ){
				this.messages.push({text:"You are a presenter now. Start your camera and share content."})					
			}
			
			this.stopLocalVideoTile()
			this.stopContentShare()								
		}				
	}	
}
</script>