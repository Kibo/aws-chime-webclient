<template>	
	<div class="card">
		<div class="card-header">
			Moderator panel
		</div>
		<div class="card-body p-0">
			<table class="table table-borderless table-sm table-striped m-0">
				<tbody>			
					<tr v-for="attendee in attendeePresenceMap.values()" v-bind:key="attendee.attendeeId">
						<th>
							<a href="#" v-on:click.prevent="setPresenter( attendee.attendeeId )">
								<i class="fa" v-bind:class="attendee.hasRole(utils.getConstant('ROLE_NAME_PRESENTER')) ? 'fa-user-secret' :'fa-user'"></i> <small>{{attendee.externalUserId}}</small>						
							</a>
						</th>				
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import Utils from "../tools/Utils.js"

export default {
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
		setPresenter( attendeeId ){			
			this.attendeePresenceMap.setPresenter( attendeeId )
			this.logger.info("Presenter se to: " + attendeeId)
		}
	}
}
</script>