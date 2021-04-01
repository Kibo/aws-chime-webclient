<template>	
	<div class="card mb-1">
		<div class="card-header">
			Moderator panel
		</div>
		<div class="card-body p-0">
			<table class="table table-borderless table-sm table-striped m-0">
				<tbody>			
					<tr v-for="attendee in attendeePresenceMap.values()" v-bind:key="attendee.attendeeId">
						<th>
							<a href="#" v-on:click.prevent="togglePresenter( attendee.attendeeId )">
								<i class="fa" 
									v-bind:class="attendee.hasRole(utils.getConstant('ROLE_NAME_PRESENTER')) ? 'fa-user-secret' :'fa-user'">
								</i> <small>{{attendee.externalUserId}}</small>						
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
	emits: ['presenterChanged'],
	mounted() {},	
	beforeUnmount(){},
		
	methods:{
		togglePresenter( attendeeId ){
			let attedee = this.attendeePresenceMap.get( attendeeId )
			if( !attedee ){
				this.logger.error( 'There is not attendee with ID ' + attendeeId )
				return
			}
			
			if( attedee.hasRole( Utils.getConstant('ROLE_NAME_PRESENTER'))){
				attedee.removeRole( Utils.getConstant('ROLE_NAME_PRESENTER'))								
			}else{
				this.attendeePresenceMap.setPresenter( attendeeId )
				this.logger.info("Presenter se to: " + attendeeId)	
			}
			
			this.$emit('presenterChanged', attendeeId )	
		}
	}
}
</script>