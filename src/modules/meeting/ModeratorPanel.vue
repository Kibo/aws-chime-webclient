<template>
	<div class="card mb-1">
		<div class="card-header">
			Moderator panel
		</div>
		<div class="card-body p-0">
			<table class="table table-borderless table-sm table-striped m-0">
				<tbody>
					<tr v-for="attendee in attendeeManager.attendeePresenceMap.values()" v-bind:key="attendee.attendeeId">
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
