<template>
	<div class="card mb-1">
		<div class="card-header">
			Moderator panel
		</div>
		<div class="card-body p-1">

				<div class="row">
					<div class="col-12 col-sm-12 col-md-6">
						<table class="table table-borderless table-sm table-striped m-0">
							<thead>
									<tr>
											<th>Name</th>
											<th>ID</th>
											<th>&nbsp;</th>
									</tr>
							</thead>
							<tbody v-for="attendee in attendeeManager.attendeePresenceMap.values()" v-bind:key="attendee.attendeeId">
								<tr v-if="!attendee.isContent()">
										<td>
											<i class="fa"
												v-bind:class="attendee.hasRole(utils.getConstant('ROLE_NAME_PRESENTER')) ? 'fa-user-secret' :'fa-user'">
											</i> <small>{{utils.getAttendeeName(attendee.externalUserId)}}</small>
										</td>
										<td>{{attendee.attendeeId}}</td>
										<td class="text-right">
												<div class="btn-group btn-group-sm" role="group">
														<button type="button" class="btn btn-secondary btn-sm"
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
	    							<span class="input-group-text">http://abc.cz/abc/cde/b.jpg (TODO)</span>
	  							</div>
									<input type="text" class="form-control">
									<div class="input-group-append">
										<button class="btn btn-outline-secondary btn-sm" type="button" >Set</button>
									</div>
							</div>
					  </div>

						<div class="form-group">
							<label>Background</label>
							<div class="input-group input-group-sm mb-3">
									<div class="input-group-prepend">
	    							<span class="input-group-text">http://abc.cz/abc/cde/a.jpg (TODO)</span>
	  							</div>
									<input type="text" class="form-control">
									<div class="input-group-append">
										<button class="btn btn-outline-secondary btn-sm" type="button" >Set</button>
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
	    							<span class="input-group-text">15 (TODO)</span>
	  							</div>
									<input type="text" class="form-control">
									<div class="input-group-append">
										<button class="btn btn-outline-secondary btn-sm" type="button" >Set</button>
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
	emits: ['presenterChanged'],
	props: ['attendeeManager'],
	data() {
			return {
				utils:Utils,
				logger:this.$store.state.logger,
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
				this.$emit('presenterChanged', attendeeId )
			}
	}
}
</script>
