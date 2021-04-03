<template>

</template>

<script>
import Utils from "../tools/Utils.js"

export default {
	emits: [],
	props: ['meetingSession','attendeePresenceMap'],
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
				let message = Utils.encodeUint8array( dataMessage.data )
				let tokens = message.split('#')
				if( tokens.length != 2 ){
						this.logger.warn( 'Received data in bad format ' +  message)
				}

				let command = tokens[0]
				let text = tokens[1]

				switch (command) {
					case Utils.getConstant('SYSTEM_COMMAND_SET_PRESENTER'):
						this.setPresenter( text )
						break;
					case Utils.getConstant('SYSTEM_COMMAND_UNSET_PRESENTER'):
						this.unsetPresenter( text )
						break;

					default:
						this.logger.warn( 'Unknown command ' +  command)
				}
		},

		/*
		 * Message Received handler
		 *
		 * @param {Object} - dataMessage
		 * @see https://aws.github.io/amazon-chime-sdk-js/classes/datamessage.html
		 */
		chatMessageReceived( dataMessage ){
			console.log("CHAT" + Utils.encodeUint8array( dataMessage.data ))
		},

		setPresenter( attendeeId ){
				this.attendeePresenceMap.setPresenter( attendeeId )
		},

		unsetPresenter(attendeeId){
				this.attendeePresenceMap.unsetPresenter()
		}
	}
}</script>
