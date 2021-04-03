<template>

	<nav class="navbar sticky-top navbar-expand-sm navbar-light bg-light mb-1">
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
			v-bind:class="{ 'd-none': !isLeftPanel()}">
			<div v-bind:id="utils.getConstant('ID_VIDEO_ELEMENT_TILES_CONTAINER')"></div>
		</div>

		<div class="col">
			<div v-if="alerts.length">
				<AlertMessage
					v-for="(alert, index) in alerts"
					v-bind:alert="alert"
					v-bind:alerts="alerts" />
			</div>

			<div v-bind:id="utils.getConstant('ID_VIDEO_ELEMENT_PRESENTERS_CONTAINER')" style="position:relative;"></div>
		</div>

		<div class="col-12 col-sm-12 col-md-2"
			v-bind:class="{'d-none':!isRightPanel()}" >
				<ModeratorPanel
					v-if="utils.getSetting('SHOW_MODERATOR_PANEL', role)"
					v-bind:attendeePresenceMap="attendeePresenceMap"
					v-on:systemMessage="sendSystemMessage" />

				<ChatPanel
					v-if="utils.getSetting('SHOW_CHAT_PANEL', role)"
					v-bind:attendeePresenceMap="attendeePresenceMap" />
		</div>
	</div>

	<AudioVideoObserver
		v-bind:meetingSession="meetingSession"
		v-bind:alerts="alerts"
		v-on:metricsDidReceive="metricsDidReceive" />

	<AttendeePresenceObserver
		v-bind:meetingSession="meetingSession"
		v-bind:attendeePresenceMap="attendeePresenceMap" />

	<MessagingObserver
		v-bind:meetingSession="meetingSession"
		v-bind:attendeePresenceMap="attendeePresenceMap" />

</template>

<script>
import AlertMessage from "../common/AlertMessage.vue"
import ModeratorPanel from "./ModeratorPanel.vue"
import ChatPanel from "./ChatPanel.vue"
import ContentShareObserver from "../observers/ContentShareObserver.vue"
import AttendeePresenceObserver from "../observers/AttendeePresenceObserver.vue"
import AudioVideoObserver from "../observers/AudioVideoObserver.vue"
import MessagingObserver from "../observers/MessagingObserver.vue"

import {AttendeeMap} from "../common/Attendee.js"
import Utils from "../tools/Utils.js"

export default {
	components: {
		AlertMessage,
		ModeratorPanel,
		ChatPanel,
		ContentShareObserver,
		AttendeePresenceObserver,
		AudioVideoObserver,
		MessagingObserver
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
				isShare:false,

				alerts : [],

				utils:Utils,

				uplink:0,
				downlink:0,

				//@see AttendeePresenceObserver
				attendeePresenceMap:new AttendeeMap()
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
				this.meetingSession.audioVideo.stopLocalVideoTile();
				this.meetingSession.audioVideo.removeLocalVideoTile();
				this.isVideo = false
			}
		},

		/*
		 * User click to Share button
		 */
		async toggleShare(){
			this.logger.info('toggleShare - handler')

			this.isShare = this.isShare ? false : true

			if( this.isShare ){
				await this.meetingSession.audioVideo.startContentShareFromScreenCapture();
			}else{
				await this.meetingSession.audioVideo.stopContentShare();
				this.isShare = false
			}

			return
		},

		/*
		 * User click to Leave button
		 */
		leaveMeeting(){
			this.logger.info('Leave meeting - handler')
			this.meetingSession.audioVideo.stop()
		},

		/*
		 * User click to Devices button
		 */
		plugDevices(){
			this.logger.info('a Attendee click to Configure Devices button.')
			this.$emit("configureDevices")
		},

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
			console.log('System message send')
			let liveTime = 60*1000
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
		/*
		 * Helper method for view template
		 *
		 * @returns{Boolean}
		 */
		isLeftPanel(){
			return Utils.getSetting('SHOW_VIDEO_TILES_CONTAINER', this.role)
		},

		/*
		 * Helper method for view template
		 *
		 * @returns{Boolean}
		 */
		isRightPanel(){
			return Utils.getSetting('SHOW_MODERATOR_PANEL', this.role) || Utils.getSetting('SHOW_CHAT_PANEL', this.role)
		}
	}
}
</script>
