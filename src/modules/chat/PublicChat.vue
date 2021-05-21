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
			console.log( 'Connecting to room: ' + this.room )
		},

		/*
		* Socket.io - on message handler
		*/
		onMessage( msg  ){
			let messageObj = JSON.parse( msg )
			let message = `${messageObj.nickname}: ${messageObj.text}`
			this.messages.push( {text:message, type:"alert-secondary"} )
		}
	}
}
</script>
