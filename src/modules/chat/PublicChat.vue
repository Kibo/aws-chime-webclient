<template>

</template>

<script>
import Utils from "../tools/Utils.js"
import { io } from "socket.io-client";

export default {
	components: {

	},
	emits: [],
	props: ['messages', 'room'],
	data() {
			return {
				utils:Utils,
        logger:this.$store.state.logger,
				socket:undefined
			}
	},
	mounted() {
		this.socket = io(Utils.getConstant('SOCKET_SERVER_URL') + '/observer');
		this.socket.on('connect', this.onConnect );
		this.socket.on('message', this.onMessage );
	},

	beforeUnmount(){
		this.socket.close()
	},

	methods:{
		/*
		* Socket.io - on connect handler
		*/
		onConnect(){
			this.socket.emit('room', this.room);
		},

		/*
		* Socket.io - on message handler
		*/
		onMessage( msg  ){
			let room = msg.split('|')[0]
			let client = msg.split('|')[1]
			let recipient = msg.split('|')[2]
			let text = msg.split('|')[3]

			let message = `${client}: ${text}`
			this.messages.push( {text:message, type:"alert-secondary"} )
		}
	}
}
</script>
