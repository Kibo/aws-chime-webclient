<template>

</template>

<script>
import Utils from "../tools/Utils.js"

export default {
	emits: [
		'setPresenter',
		'unsetPresenter',
		'showChatMessage',
		'setFps',
		'detachAttendee',
		'unshareContent',
		'setCanvasBg',
		'setCanvasFg'],
	props: ['meetingSession','attendeeManager'],
	data() {
		return {
			logger:this.$store.state.logger,
			role: this.$store.getters.role,
		}
	},
	mounted() {
		this.meetingSession.audioVideo.realtimeSubscribeToReceiveDataMessage(Utils.getConstant('MESSAGE_SYSTEM_TOPIC_NAME'), this.systemMessageReceived)

		if( Utils.getSetting('SHOW_CHAT_PANEL', this.role)  ){
			this.meetingSession.audioVideo.realtimeSubscribeToReceiveDataMessage(Utils.getConstant('MESSAGE_CHAT_TOPIC_NAME'), this.chatMessageReceived)
		}
	},
	beforeUnmount(){
		this.meetingSession.audioVideo.realtimeUnsubscribeFromReceiveDataMessage(Utils.getConstant('MESSAGE_SYSTEM_TOPIC_NAME'))
		this.meetingSession.audioVideo.realtimeUnsubscribeFromReceiveDataMessage(Utils.getConstant('MESSAGE_CHAT_TOPIC_NAME'))
	},
	methods: {

		/*
		 * Message Received handler
		 *
		 * @param {Object} - dataMessage
		 * @see https://aws.github.io/amazon-chime-sdk-js/classes/datamessage.html
		 */
		systemMessageReceived( dataMessage ){
					this.messageReceived( dataMessage )
		},

		/*
		 * Message Received handler
		 *
		 * @param {Object} - dataMessage
		 * @see https://aws.github.io/amazon-chime-sdk-js/classes/datamessage.html
		 */
		chatMessageReceived( dataMessage ){
			this.messageReceived( dataMessage )
		},

		/*
		* Decode message
		*/
		messageReceived( dataMessage ){
			let message = Utils.encodeUint8array( dataMessage.data )
			let tokens = message.split(Utils.getConstant('COMMAND_DELIMITER'))
			if( tokens.length != 2 ){
					this.logger.warn( 'Received data in bad format ' +  message)
			}

			let command = tokens[0]
			let value = tokens[1]

			switch (command) {
				case Utils.getConstant('SYSTEM_COMMAND_SET_PRESENTER'):
					this.$emit('setPresenter', value)
					break
				case Utils.getConstant('SYSTEM_COMMAND_UNSET_PRESENTER'):
					this.$emit('unsetPresenter', value)
					break
				case Utils.getConstant('CHAT_COMMAND_SEND_MESSAGE'):
					this.$emit('showChatMessage', value)
					break
				case Utils.getConstant('SYSTEM_COMMAND_SET_FPS'):
					this.$emit('setFps', value)
					break
				case Utils.getConstant('SYSTEM_COMMAND_DETACH_ATTENDEE'):
					this.$emit('detachAttendee', value)
					break
				case Utils.getConstant('SYSTEM_COMMAND_UNSHARE_CONTENT'):
					this.$emit('unshareContent', value)
					break
				case Utils.getConstant('SYSTEM_COMMAND_SET_CANVAS_FG'):
					this.$emit('setCanvasFg', value)
					break
				case Utils.getConstant('SYSTEM_COMMAND_SET_CANVAS_BG'):
					this.$emit('setCanvasBg', value)
					break
				default:
					this.logger.warn( 'Unknown command ' +  command)
			}
		}
	}
}</script>
