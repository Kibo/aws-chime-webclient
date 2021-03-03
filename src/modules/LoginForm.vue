<template>
	<div class="row mt-4">
		<div class="col-12 col-sm-12 col-md-6 offset-md-3">
			
			<div class="card ">
				<div class="card-header">Join the meeting</div>	
				<div class="card-body">
																	
					<form v-if="!isWorking" @submit.prevent="getCredentials">
												
						<div v-if="form.errors.length">						    						    													
							<AlertMessage v-for="(error, index) in form.errors" v-bind:message="error" v-on:dismiss="dismissAlert(index)" />																										  
						</div>
																								
						<div class="form-group">						
							<div class="input-group mb-2">
								<div class="input-group-prepend">
									<div class="input-group-text"><i class="fa fa-user" aria-hidden="true"></i></div>
								</div>
								<input type="text" v-model.trim="form.name" class="form-control" name="name" placeholder="Your name during the meeting." maxlength="100" autocomplete="off">
							</div>																							
						</div>
						<div class="form-group">
							<div class="input-group mb-2">
								<div class="input-group-prepend">
									<div class="input-group-text"><i class="fa fa-lock" aria-hidden="true"></i></div>
								</div>
								<input type="text" v-model.trim="form.pin" class="form-control" name="pin" placeholder="PIN to join the meeting." maxlength="100" autocomplete="off" >
							</div>																																		
						</div>
						
						<div>
							<button type="submit" class="btn btn-block btn-success">Join</button>						
						</div>																									
					</form>
													
					<HttpClient v-if="isWorking" v-bind:url="getURL(this.form)" v-on:server-response="serverResponse" ></HttpClient>
					
				</div>
			</div>	
		</div>
	</div>
</template>

<script>
	import AlertMessage from "./AlertMessage.vue"
	import HttpClient from "./HttpClient.vue"	
	import * as Constant from './Constants.js';
	const url = require('url');

	export default { components: { 
		AlertMessage,
		HttpClient
		},
		
		
		// there is data-meeting attribute in App root element
		//let meet = document.querySelector(`#${Constant.ID_APP}`).dataset.meeting
		//console.log( meet + "SSSSSSSSSSSSSSSS") 
										
		data() {
			return {
				isWorking: false,								
				form:{
					errors : [],
					name : null,
					pin : null,
					meeting:"abcdefg"
				}				
			}
		}, 
		methods: {
			dismissAlert(index){							
				this.form.errors.splice(index, 1);
			},					
			getCredentials(e) {										
				if (!this.form.name) {
					this.form.errors.push({
						text : 'Name required.',
						type:"alert-danger"
					});
					return
				}

				if (!this.form.pin) {
					this.form.errors.push({
						text : 'PIN required.',
						type:"alert-danger"
					});
					return
				}
																											
				this.isWorking = true;
				
				return
			},
			
			/**
			 * Compose a URL for server
			 * 
			 * @returns {String} - url
			 */
			getURL( formData ){								
				return new URL(`${formData.meeting}/${formData.pin}/${formData.name}`, Constant.CRENDTIALS_TO_MEETING_URL).toString();
			},
			
			serverResponse(response){
				this.isWorking = false;
											
				if( response.status != 200 ){
					this.form.errors.push({
						text : `Status: ${response.status}. ${response.statusText}`,
						type:"alert-danger"
					});
					return	
				}
				
				this.$emit('credentials', response.data)																		
			}
		}
	}
</script>