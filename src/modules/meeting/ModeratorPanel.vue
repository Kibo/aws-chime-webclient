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
															v-bind:class="attendee.hasRole(utils.getConstant('ROLE_NAME_PRESENTER')) ? 'btn-success' :'btn-outline-secondary'"
															v-on:click.prevent="presenterChanged(attendee.attendeeId)">presenter</button>
												</div>
										</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="col-12 col-sm-12 col-md-6">

						<div class="form-group">
							<label>Foreground</label>
							<div class="input-group input-group-sm mb-3">
									<div class="input-group-prepend">
	    							<span class="input-group-text">{{$store.state.canvasSetting.foreground ? $store.state.canvasSetting.foreground : 'Empty slot' }}</span>
	  							</div>
									<input type="text" class="form-control" placeholder="Image url | empty"
										v-model.trim="foreground" >
									<div class="input-group-append">
										<button class="btn btn-outline-secondary btn-sm" type="button"
											v-on:click.prevent="setForeground" >Set</button>
									</div>
							</div>
					  </div>

						<div class="form-group">
							<label>Background</label>
							<div class="input-group input-group-sm mb-3">
									<div class="input-group-prepend">
	    							<span class="input-group-text">{{$store.state.canvasSetting.background ? $store.state.canvasSetting.background : 'Empty slot'}}</span>
	  							</div>
									<input type="text" class="form-control" placeholder="Image url | empty"
										v-model.trim="background">
									<div class="input-group-append">
										<button class="btn btn-outline-secondary btn-sm" type="button"
											v-on:click.prevent="setBackground" >Set</button>
									</div>
							</div>
					  </div>

						<div class="form-group">
							<label>PDF</label>
							<div class="input-group input-group-sm mb-3">
									<div class="input-group-prepend">
	    							<span class="input-group-text">http://abc.cz/abc/cde/abc.pdf (TODO)</span>
	  							</div>
									<input type="text" class="form-control">
									<div class="input-group-append">
										<button class="btn btn-outline-secondary btn-sm" type="button" >Set</button>
									</div>
							</div>
					  </div>

						<div class="form-group">
							<label>Youtube</label>
							<div class="input-group input-group-sm mb-3">
									<div class="input-group-prepend">
	    							<span class="input-group-text">https://youtu.be/dsODRfCMRoM (TODO)</span>
	  							</div>
									<input type="text" class="form-control">
									<div class="input-group-append">
										<button class="btn btn-outline-secondary btn-sm" type="button" >Set</button>
									</div>
							</div>
					  </div>

						<div class="form-group">
							<label>Fps</label>
							<div class="input-group input-group-sm mb-3">
									<div class="input-group-prepend">
	    							<span class="input-group-text">Fps: {{$store.state.canvasSetting.fps}}</span>
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
				</div>
		</div>
	</div>
</template>

<script>
import Utils from "../tools/Utils.js"

export default {
	emits: ['setPresenter', 'unsetPresenter', 'systemMessage', 'fpsChanged', 'foregroundChanged', 'backgroundChanged'],
	props: ['attendeeManager'],
	data() {
			return {
				utils:Utils,
				logger:this.$store.state.logger,
				fps:15,
				foreground:"",
				background:""
			}
	},
	mounted() {},
	beforeUnmount(){},
	methods:{
			/*
			* Presenter changed - handler
			*
			* @param {Number} attendeeId
			*/
			presenterChanged( attendeeId ){
				let attendee = this.attendeeManager.attendeePresenceMap.get( attendeeId )
				let isPresenter = attendee.hasRole( Utils.getConstant('ROLE_NAME_PRESENTER'))

				if(isPresenter){
					this.$emit('unsetPresenter', attendeeId )
					this.$emit('systemMessage', Utils.getConstant('SYSTEM_COMMAND_UNSET_PRESENTER') + Utils.getConstant('COMMAND_DELIMITER') + attendeeId )

				}else{
					this.$emit('setPresenter', attendeeId )
					this.$emit('systemMessage', Utils.getConstant('SYSTEM_COMMAND_SET_PRESENTER') + Utils.getConstant('COMMAND_DELIMITER') + attendeeId )
				}
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

	}
}
</script>
