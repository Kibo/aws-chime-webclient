<template>
	<div class="card mb-1">
		<div class="card-header">
			Moderator panel
		</div>
		<div class="card-body p-1">

				<div class="row">
					<div class="col-12 col-sm-12 col-md-6">
						<table class="table table-borderless table-sm table-striped m-0">
							<tbody v-for="attendee in attendeeManager.attendeePresenceMap.values()" v-bind:key="attendee.attendeeId">
								<tr v-if="!attendee.isContent()">
										<td>
											<i class="fa fa-user">
											</i> {{utils.getAttendeeName(attendee.externalUserId)}}
										</td>
										<td>{{attendee.attendeeId}}</td>
										<td class="text-right">
												<div class="btn-group btn-group-sm" role="group">
														<button type="button" class="btn btn-sm"
															v-bind:class="attendeeManager.isPresenter( attendee.attendeeId ) ? 'btn-success' :'btn-outline-secondary'"
															v-on:click.prevent="presenterChanged(attendee.attendeeId)">presenter</button>
														<button type="button" class="btn btn-sm"
															v-bind:class="attendeeManager.shareContent( attendee.attendeeId ) ? 'btn-danger' :'btn-outline-secondary'"
																v-on:click.prevent="unshare(attendee.attendeeId)" >stop sharing</button>
														<button type="button" class="btn btn-sm btn-outline-danger"
															v-on:click.prevent="detachAttendee(attendee.attendeeId)">detach</button>
												</div>
										</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="col-12 col-sm-12 col-md-6">

						<div class="row">
								<div class="col-12 col-sm-12 col-md-6">
										<div class="form-group">
											<label>Foreground</label>
											<div class="input-group input-group-sm mb-3">
													<div class="input-group-prepend">
														<span class="input-group-text">{{$store.state.moderatorSetting.foreground ? $store.state.moderatorSetting.foreground : 'Empty slot' }}</span>
													</div>
													<input type="text" class="form-control" placeholder="Image url | empty"
														v-model.trim="foreground" >
													<div class="input-group-append">
														<button class="btn btn-outline-secondary btn-sm" type="button"
															v-on:click.prevent="setForeground" >Set</button>
													</div>
											</div>
										</div>
								</div>
								<div class="col-12 col-sm-12 col-md-6">
										<div class="form-group">
											<label>Background</label>
											<div class="input-group input-group-sm mb-3">
													<div class="input-group-prepend">
														<span class="input-group-text">{{$store.state.moderatorSetting.background ? $store.state.moderatorSetting.background : 'Empty slot'}}</span>
													</div>
													<input type="text" class="form-control" placeholder="Image url | empty"
														v-model.trim="background">
													<div class="input-group-append">
														<button class="btn btn-outline-secondary btn-sm" type="button"
															v-on:click.prevent="setBackground" >Set</button>
													</div>
											</div>
										</div>
								</div>
						</div>

						<div class="row">
								<div class="col-12 col-sm-12 col-md-6">
										<div class="form-group">
											<label>PDF</label>
											<div class="input-group input-group-sm mb-3">
													<div class="input-group-prepend">
														<span class="input-group-text">{{$store.state.moderatorSetting.pdf ? $store.state.moderatorSetting.pdf : 'Empty slot'}}</span>
													</div>
													<input type="text" class="form-control" placeholder="PDF url | empty"
														v-model.trim="pdf">
													<div class="input-group-append">
														<button class="btn btn-outline-secondary btn-sm" type="button"
															v-on:click.prevent="setPdf" >Set</button>
													</div>
											</div>
										</div>
								</div>
								<div class="col-12 col-sm-12 col-md-6">
										<div class="form-group">
											<label>Video</label>
											<div class="input-group input-group-sm mb-3">
													<div class="input-group-prepend">
														<span class="input-group-text">{{$store.state.moderatorSetting.video ? $store.state.moderatorSetting.video : 'Empty slot'}}</span>
													</div>
													<input type="text" class="form-control" placeholder="Video url | empty"
														v-model.trim="video">
													<div class="input-group-append">
														<button class="btn btn-outline-secondary btn-sm" type="button"
															v-on:click.prevent="setVideo">Set</button>
													</div>
											</div>
										</div>
								</div>
						</div>

						<div class="row">
								<div class="col-12 col-sm-12 col-md-6">
										<div class="form-group">
											<label>Fps</label>
											<div class="input-group input-group-sm mb-3">
													<div class="input-group-prepend">
														<span class="input-group-text">Fps: {{$store.state.moderatorSetting.fps}}</span>
													</div>
													<input type="number" step="1" min="1" max="60" class="form-control" placeholder="Number: 1 - 60"
														v-model.trim="fps" >
													<div class="input-group-append">
														<button class="btn btn-outline-secondary btn-sm" type="button"
															v-on:click.prevent="setFps" >Set</button>
													</div>
											</div>
										</div>
								</div>
								<div class="col-12 col-sm-12 col-md-6">
										<div class="form-group form-check">
											<label class="form-check-label" >
													<input type="checkbox" class="form-check-input"
													v-model="isPublicChat" v-on:change="togglePublicChat()"> is public chat
											</label>
											<small class="form-text text-muted">Allow people from all over the world send message to this session chat. Dangerous!.</small>
										</div>
								</div>
						</div>
					</div>
				</div>
		</div>
	</div>
</template>

<script>
import Utils from "../tools/Utils.js"

export default {
	components: {

	},
	emits: [
		'setPresenter',
		'unsetPresenter',
		'systemMessage',
		'fpsChanged',
		'foregroundChanged',
		'backgroundChanged',
		'detachAttendee',
		'unshareContent',
		'isPublicChat'],
	props: ['attendeeManager'],
	data() {
			return {
				utils:Utils,
				logger:this.$store.state.logger,
				fps:15,
				foreground:"",
				background:"",
				pdf:"",
				video:"",
				isPublicChat:false,
			}
	},
	mounted() {
		this.fps = this.$store.state.moderatorSetting.fps
		this.foreground = this.$store.state.moderatorSetting.foreground
		this.backgound = this.$store.state.moderatorSetting.background
		this.pdf = this.$store.state.moderatorSetting.pdf
		this.video = this.$store.state.moderatorSetting.video
		this.isPublicChat = this.$store.state.moderatorSetting.isPublicChat
	},
	beforeUnmount(){},
	methods:{
			/*
			* Presenter changed - handler
			*
			* @param {String} attendeeId
			*/
			presenterChanged( attendeeId ){

				if( this.attendeeManager.isPresenter( attendeeId ) ){
					this.$emit('unsetPresenter', attendeeId )
					this.$emit('systemMessage', Utils.getConstant('SYSTEM_COMMAND_UNSET_PRESENTER') + Utils.getConstant('COMMAND_DELIMITER') + attendeeId )

				}else{
					this.$emit('setPresenter', attendeeId )
					this.$emit('systemMessage', Utils.getConstant('SYSTEM_COMMAND_SET_PRESENTER') + Utils.getConstant('COMMAND_DELIMITER') + attendeeId )
				}
			},

			/*
			* Detach attendee - handler
			*
			* @param {String} attendeeId
			*/
			detachAttendee( attendeeId ){
				this.$emit('detachAttendee', attendeeId )
				this.$emit('systemMessage', Utils.getConstant('SYSTEM_COMMAND_DETACH_ATTENDEE') + Utils.getConstant('COMMAND_DELIMITER') + attendeeId )
			},

			/*
			* Stop sharing content - handler
			*
			* @param {String} attendeeId
			*/
			unshare( attendeeId ){
				this.$emit('unshareContent', attendeeId )
				this.$emit('systemMessage', Utils.getConstant('SYSTEM_COMMAND_UNSHARE_CONTENT') + Utils.getConstant('COMMAND_DELIMITER') + attendeeId )
			},
			/*
			* Fps changed - handler
			*/
			setFps(){
				this.$emit('fpsChanged', this.fps )
				this.$emit('systemMessage', Utils.getConstant('SYSTEM_COMMAND_SET_FPS') + Utils.getConstant('COMMAND_DELIMITER') + this.fps )
			},

			/*
			* Background changed - handler
			*/
			setBackground(){
				this.$emit('backgroundChanged', this.background )
				this.$emit('systemMessage', Utils.getConstant('SYSTEM_COMMAND_SET_CANVAS_BG') + Utils.getConstant('COMMAND_DELIMITER') + this.background )
			},

			/*
			* Foreground changed - handler
			*/
			setForeground(){
				this.$emit('foregroundChanged', this.foreground )
				this.$emit('systemMessage', Utils.getConstant('SYSTEM_COMMAND_SET_CANVAS_FG') + Utils.getConstant('COMMAND_DELIMITER') + this.foreground )
			},

			/*
			* PDF url changed - handler
			*/
			setPdf(){
				this.$store.commit("moderatorSetting", {pdf:this.pdf})
			},

			/*
			* Video URL changed - handler
			*/
			setVideo(){
				this.$store.commit("moderatorSetting", {video:this.video})
			},

			/*
			* Public chat statuch changed - handler
			*/
			togglePublicChat(){
				this.$emit('isPublicChat', this.isPublicChat )
				this.$emit('systemMessage', Utils.getConstant('CHAT_COMMAND_IS_PUBLIC_CHAT') + Utils.getConstant('COMMAND_DELIMITER') + this.isPublicChat )
			},
	}
}
</script>
