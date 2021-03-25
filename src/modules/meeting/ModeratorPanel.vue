<template>	
	<table class="table table-borderless table-sm table-striped">
		<tbody>			
			<tr v-for="attendee in attendeePresenceMap.values()" v-bind:key="attendee.attendeeId">
				<th>
					<a href="#" v-on:click.prevent="setPresenter( attendee.attendeeId )">
						<i class="fa" v-bind:class="attendee.hasRole(utils.getConstant('PRESENTER_ROLE_NAME')) ? 'fa-user-secret' :'fa-user'"></i> <small>{{attendee.externalUserId}}</small>						
					</a>
				</th>				
			</tr>
		</tbody>
	</table>	
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