<template>
	<div class="row mt-4">
		<div class="col-12 col-sm-12 col-md-6 offset-md-3">
			
			<div class="card ">
				<div class="card-header">Join the meeting</div>	
				<div class="card-body">				
					<form @submit.prevent="getCredentials">
												
						<div v-if="errors.length">						    						    													
							<AlertMessage v-for="(error, index) in errors" v-bind:message="error" v-on:dismiss="dismissAlert($event, index)" />																										  
						</div>
																								
						<div class="form-group">						
							<div class="input-group mb-2">
								<div class="input-group-prepend">
									<div class="input-group-text"><i class="fa fa-user" aria-hidden="true"></i></div>
								</div>
								<input type="text" v-model="credentials.name" class="form-control" name="name" placeholder="Your name during the meeting." maxlength="100" autocomplete="off">
							</div>																							
						</div>
						<div class="form-group">
							<div class="input-group mb-2">
								<div class="input-group-prepend">
									<div class="input-group-text"><i class="fa fa-lock" aria-hidden="true"></i></div>
								</div>
								<input type="text" v-model="credentials.pin" class="form-control" name="pin" placeholder="PIN to join the meeting." maxlength="100" autocomplete="off" >
							</div>																																		
						</div>
						
						<div>
							<button type="submit" class="btn btn-block btn-success">Join</button>						
						</div>															
					</form>
				</div>
			</div>
						
		</div>
	</div>
</template>

<script>
	import AlertMessage from "./AlertMessage.vue"

	export default { components: { 
		AlertMessage
		},
		props:['meeting'],
		data() {
			return {
				errors : [],				
				credentials:{
					name : null,
					pin : null,
					meeting:this.meeting
				}				
			}
		}, 
		methods: {
			dismissAlert(e, index){							
				this.errors.splice(index, 1);
			},					
			getCredentials(e) {
				console.log( "credentials" )
				
				this.errors = [];

				if (!this.credentials.name) {
					this.errors.push({
						text : 'Name required.',
						type:"alert-danger"
					});
					return
				}

				if (!this.credentials.pin) {
					this.errors.push({
						text : 'PIN required.',
						type:"alert-danger"
					});
					return
				}
																							
				console.log( this.credentials )
				//this.$emit('clicked', 'someValue')
				
				return true
			},
		}
	}
</script>