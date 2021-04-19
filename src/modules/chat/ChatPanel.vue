<template>
	<div class="card mb-1">
		<div class="card-header">
			Chat panel
		</div>
		<div class="card-body p-1">

			<div v-if="chatMessages.length">
				<AlertMessage
					v-for="(message, index) in chatMessages"
					v-bind:alert="message"
					v-bind:alerts="chatMessages" />
			</div>

			<div class="input-group mb-3">
				  <input v-model.trim="message" type="text" class="form-control" maxlength="256">
				  <div class="input-group-append">
				    <button v-on:click.prevent="sendMessage" class="btn btn-success" type="button">Send</button>
				  </div>
				</div>
		</div>
	</div>

	<PublicChat
		v-if="this.$store.state.moderatorSetting.isPublicChat"
		v-bind:messages="chatMessages"
		v-bind:room="$store.state.title" />

</template>

<script>
import Utils from "../tools/Utils.js"
import AlertMessage from "../common/AlertMessage.vue"
import PublicChat from "./PublicChat.vue"

export default {
	components: {
		AlertMessage,
		PublicChat
	},
	emits: ['sendChatMessage', 'showChatMessage'],
	props: ['attendeeManager', 'chatMessages'],
	data() {
			return {
				utils:Utils,
				externalUserId: this.$store.getters.externalUserId,
				logger:this.$store.state.logger,
				message:""
			}
	},
	mounted() {},
	beforeUnmount(){},

	methods:{
			sendMessage(){
				if(this.message){
					let message = Utils.getAttendeeName(this.externalUserId) + ": " + this.message
					this.$emit('showChatMessage', message )
					this.$emit('sendChatMessage', Utils.getConstant('CHAT_COMMAND_SEND_MESSAGE') + Utils.getConstant('COMMAND_DELIMITER') + message )
					this.message = ""
				}
			}
	}
}
</script>
