<template>

	<nav class="navbar sticky-top navbar-expand-sm navbar-light bg-light mb-1">
		<span class="navbar-brand d-none d-sm-block" >{{$store.state.title}}</span>

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
				v-on:click.prevent="$emit('endSession')">
					<i class="fa fa-sign-out" aria-hidden="true"></i> Leave
				</a>
			</li>

		</ul>

		<span class="navbar-text">
			<i class="fa fa-users" aria-hidden="true"></i> {{this.attendeeManager.attendeePresenceMap.size}} |
			<i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i> {{uplink}} |
			<i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i> {{downlink}}
		</span>

	</nav>

	<div class="row">
		<div class="col">
			<div v-if="alerts.length && isAlertsAllowed">
				<AlertMessage
					v-for="(alert, index) in alerts"
					v-bind:alert="alert"
					v-bind:alerts="alerts" />
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col">
			<ModeratorPanel
				v-if="utils.getSetting('SHOW_MODERATOR_PANEL', role)"
				v-bind:attendeeManager="attendeeManager"
				v-on:setPresenter="setPresenter"
				v-on:unsetPresenter="unsetPresenter"
				v-on:detachAttendee="detachAttendee"
				v-on:unshareContent="unshareContent"
				v-on:fpsChanged="setFps"
				v-on:backgroundChanged="setCanvasBg"
				v-on:foregroundChanged="setCanvasFg"
				v-on:systemMessage="sendSystemMessage" />
		</div>
	</div>

	<div class="row">
		<div class="col">
			<VideoTileContainer
				v-bind:meetingSession="meetingSession"
				v-bind:attendeeManager="attendeeManager"
				v-bind:alerts="alerts"
				v-bind:role="role" />
		</div>
	</div>

	<div class="row mb-1">
		<div class="col text-center">
				<PDFNavbar
					v-on:sendSystemMessage="sendSystemMessage"
					v-on:pdfPageIndexChanged="setPdfPageIndex" />
		</div>
	</div>

	<div class="row">
		<div class="col">
			<ChatPanel
				v-if="utils.getSetting('SHOW_CHAT_PANEL', role)"
				v-bind:attendeeManager="attendeeManager"
				v-bind:chatMessages="chatMessages"
				v-on:sendChatMessage="sendChatMessage"
				v-on:showChatMessage="showChatMessage" />
		</div>
	</div>

	<AudioVideoObserver
		v-bind:meetingSession="meetingSession"
		v-bind:alerts="alerts"
		v-on:metricsDidReceive="metricsDidReceive"
		v-on:videoTileDidUpdate="videoTileDidUpdate"
	  v-on:videoTileWasRemoved="videoTileWasRemoved" />

	<AttendeePresenceObserver
		v-bind:meetingSession="meetingSession"
		v-bind:attendeeManager="attendeeManager" />

	<MessagingObserver
		v-bind:meetingSession="meetingSession"
		v-bind:attendeeManager="attendeeManager"
		v-on:setPresenter="setPresenter"
		v-on:unsetPresenter="unsetPresenter"
		v-on:setFps="setFps"
		v-on:detachAttendee="detachAttendee"
		v-on:unshareContent="unshareContent"
		v-on:setCanvasFg="setCanvasFg"
		v-on:setCanvasBg="setCanvasBg"
		v-on:setPdfPageIndex="setPdfPageIndex"
		v-on:showChatMessage="showChatMessage" />

</template>

<script>
import AlertMessage from "../common/AlertMessage.vue"
import ModeratorPanel from "./ModeratorPanel.vue"
import ChatPanel from "./ChatPanel.vue"
import PDFNavbar from "../pdf/PDFNavbar.vue"
import VideoTileContainer from "./VideoTileContainer.vue"
import ContentShareObserver from "../observers/ContentShareObserver.vue"
import AttendeePresenceObserver from "../observers/AttendeePresenceObserver.vue"
import AudioVideoObserver from "../observers/AudioVideoObserver.vue"
import MessagingObserver from "../observers/MessagingObserver.vue"

import {AttendeeManager} from "../common/Attendee.js"
import Utils from "../tools/Utils.js"

export default {
	components: {
		VideoTileContainer,
		AlertMessage,
		ModeratorPanel,
		ChatPanel,
		ContentShareObserver,
		AttendeePresenceObserver,
		AudioVideoObserver,
		MessagingObserver,
		PDFNavbar
	},
	emits: ['configureDevices', 'endSession'],
	props: ['meetingSession'],
	data() {
			return {
				utils:Utils,
				logger:this.$store.state.logger,
				role: this.$store.getters.role,
				localAttendeeId: this.$store.getters.attendeeId,

				isAudio: this.isLocalAudio(),
				isVideo:false,
				isShare:false,

				alerts : [],

				chatMessages:[],

				uplink:0,
				downlink:0,

				attendeeManager:new AttendeeManager()
			}
	},

	mounted() {
		this.meetingSession.audioVideo.start()
		this.muteLocalAudio()

		this.logger.info( this.showVideoInputQualitySettings() )
	},

	beforeUnmount(){
		this.leaveMeeting()
	},
	computed: {
		isAlertsAllowed(){
			return Utils.getSetting('SUPRESS_ATERTS_DURING_MEETING', this.role) == false
		}
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
		    	} catch (e) {
		      		this.logger.error(e)
		      		return
		    	}

			}else{
					this.stopLocalVideo()
			}
		},

		stopLocalVideo(){
			this.meetingSession.audioVideo.stopLocalVideoTile();
			this.meetingSession.audioVideo.removeLocalVideoTile();
			this.isVideo = false
		},

		/*
		 * User click to Share button
		 */
		async toggleShare(){
			this.logger.info('toggleShare - handler')

			this.isShare = this.isShare ? false : true

			try{
				if( this.isShare ){

					// Share PDF
					if(this.$store.state.moderatorSetting.pdf){
							let canvas = document.getElementById(Utils.getConstant('ID_ELEMENT_FOR_PDF_CANVAS'))

							if(!canvas){
								this.logger.warn("PDF Canvas not found. #ID" + Utils.getConstant('ID_ELEMENT_FOR_PDF_CANVAS'))
							}
							await this.meetingSession.audioVideo.startContentShare( canvas.captureStream() );

					}else{
						// Share screen
						await this.meetingSession.audioVideo.startContentShareFromScreenCapture();
					}

				}else{
					this.stopSharing()
				}
			}catch(e){
						this.logger.warn(e)
			}

			return
		},

		async stopSharing(){
			await this.meetingSession.audioVideo.stopContentShare();
			this.isShare = false
		},

		/*
		 * User click to Leave button
		 */
		leaveMeeting(){
			this.stopLocalVideo()
			this.stopSharing()
			this.meetingSession.audioVideo.stop()
			this.logger.warn('a user leave the session')
		},

		/*
		 * User click to Devices button
		 */
		plugDevices(){
			this.logger.info('a Attendee click to Configure Devices button.')
			this.$emit("configureDevices")
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
		 * Show chat message
		 * @param {String} - message
		 */
		showChatMessage( message ){
			if(message){
				this.chatMessages.push({text:message, type:"alert-info"})
			}
		},

		/*
		 * Send chat message
		 * @param {String} - message
		 */
		sendChatMessage(message){
			let liveTime = 5*60*1000
			this.sendMessage(Utils.getConstant('MESSAGE_CHAT_TOPIC_NAME'), message, liveTime)
		},

		/*
		 * Send system message
		 * @param {String} - message
		 */
		sendSystemMessage(message){
			let liveTime = 5*60*1000
			this.sendMessage(Utils.getConstant('MESSAGE_SYSTEM_TOPIC_NAME'), message, liveTime)
		},

		/*
		 * Send realtime message
		 * @param {String} topic
		 * @param {String} message
		 * @param {Number} livetime in ms
		 *
		 * @see https://aws.github.io/amazon-chime-sdk-js/interfaces/audiovideofacade.html#realtimesenddatamessage
		 */
		sendMessage(topic, message, livetime){
			try{
				this.meetingSession.audioVideo.realtimeSendDataMessage(topic, message, livetime)
			}catch(e){
				this.logger.error(e)
			}
		},

		// ###################################
		// ## Handlers from ModeratorPanel
		// ###################################

		/*
		* set Presente  - handler
		*
		* @params {String} - attendeeId
		*/
		setPresenter( attendeeId ){
			this.attendeeManager.setPresenter( attendeeId )
		},

		/*
		* unset Presente - handler
		*
		* @params {String} - attendeeId
		*/
		unsetPresenter( attendeeId ){
			this.attendeeManager.unsetPresenter()
		},

		setFps(value){
			this.$store.commit('moderatorSetting', {fps:value})
		},

		/*
		* Detach attendee from meeting - handler
		*
		* @params {String} - attendeeId
		*/
		detachAttendee( attendeeId ){
				if( attendeeId == this.localAttendeeId ){
					this.logger.warn("Moderator detach attendee from the session. AtendeeId: " + attendeeId)
					this.$emit('endSession')
				}
		},

		/*
		* Stop sharing content - handler
		*
		* @params {String} - attendeeId
		*/
		unshareContent( attendeeId ){
			if( attendeeId == this.localAttendeeId ){
				this.logger.warn("Moderator stoped sharing content for attendee: " + attendeeId)
				this.stopSharing()
			}
		},

		setCanvasFg(url){
			this.$store.commit('moderatorSetting', {foreground:url})
		},

		setCanvasBg(url){
			this.$store.commit('moderatorSetting', {background:url})
		},

		setPdfPageIndex( idx ){
			this.$store.commit('moderatorSetting', {pdfCurrentPageIndex:idx})
			console.log('set ' + idx)
			console.log('store ' + JSON.stringify(this.$store.state.moderatorSetting))
    },

		// ###################################
		// ## Handlers from audioVideoObserver
		// ###################################

		/*
		 * @param {Object} - report
		 * @see AudioVideoObserver
		 */
		metricsDidReceive( report ){
			if(!report){
				return
			}

			this.downlink = report.down
			this.uplink = report.up
		},

		/*
		* Called whenever a tile has been created or updated.
		*
		* @param {Object} - tileState
		* @see AudioVideoObserver
		* @see https://aws.github.io/amazon-chime-sdk-js/classes/videotilestate.html
		*/
		videoTileDidUpdate( tileState ){

			//TODO AudioVideoObserver @see isVideoAvailable

			this.attendeeManager.tileMap.set(tileState.tileId, tileState);
			if( this.attendeeManager.isPresenter( tileState.boundAttendeeId )){
					// attendeeManager.setPresenter(id) resolve the hide/show state
					this.attendeeManager.setPresenter( tileState.boundAttendeeId )
			}
		},

		/*
		* Called whenever a tile has been removed.
		*
		* @see AudioVideoObserver
		*/
		videoTileWasRemoved( tileId ){
			this.attendeeManager.tileMap.delete( tileId );
		}
	}
}
</script>
