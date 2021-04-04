<template>
	<div class="card mb-1">
		<div class="card-header">
			Moderator panel
		</div>
		<div class="card-body p-0">
			<table class="table table-borderless table-sm table-striped m-0">
				<tbody>
					<tr v-for="attendee in attendeePresenceMap.values()" v-bind:key="attendee.attendeeId">
						<td v-if="!attendee.isContent()">
							<a href="#" v-on:click.prevent="presenterChanged(attendee.attendeeId)">
								<i class="fa"
									v-bind:class="attendee.hasRole(utils.getConstant('ROLE_NAME_PRESENTER')) ? 'fa-user-secret' :'fa-user'">
								</i> <small>{{utils.getAttendeeName(attendee.externalUserId)}}</small>
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import Utils from "../tools/Utils.js"

export default {
	emits: ['systemMessage'],
	props: ['attendeePresenceMap'],
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
				let attendee = this.attendeePresenceMap.get(attendeeId)
				let isPresenter = attendee.hasRole( Utils.getConstant('ROLE_NAME_PRESENTER'))

				if(isPresenter){
					this.attendeePresenceMap.unsetPresenter( attendeeId )
					this.$emit('systemMessage', Utils.getConstant('SYSTEM_COMMAND_UNSET_PRESENTER') + '#' + attendeeId )
				}else{
					this.attendeePresenceMap.setPresenter( attendeeId )
					this.$emit('systemMessage', Utils.getConstant('SYSTEM_COMMAND_SET_PRESENTER') + '#' + attendeeId )
				}
			}
	}
}
</script>
