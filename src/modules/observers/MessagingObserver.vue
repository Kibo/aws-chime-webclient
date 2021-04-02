<template>
	
</template>

<script>
import Utils from "../tools/Utils.js"

export default {
	emits: [],
	props: ['meetingSession'],	
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
			console.log("SYSTEM" + Utils.encodeUint8array( dataMessage.data ))	
		},
		
		/*
		 * Message Received handler
		 * 
		 * @param {Object} - dataMessage
		 * @see https://aws.github.io/amazon-chime-sdk-js/classes/datamessage.html
		 */
		chatMessageReceived( dataMessage ){
			console.log("CHAT" + Utils.encodeUint8array( dataMessage.data ))
		}
	}
}</script>