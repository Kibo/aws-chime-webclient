<template>
	<div class="row mt-4">
		<div class="col col-md-6 offset-md-3">

			<div class="card">
				<div class="card-header bg-info text-light">Join the meeting: {{title}}</div>
				<div class="card-body">

					<div v-if="isWorking">
						<HttpClient v-bind:url="getURL(this.form)" v-on:server-response="serverResponse" ></HttpClient>
					</div>
					<div v-else>
						<form @submit.prevent="getCredentials">

							<div v-if="alerts.length">
								<AlertMessage
									v-for="(alert, index) in alerts"
									v-bind:alert="alert"
									v-bind:alerts="alerts" />
							</div>

							<div class="form-group">
								<div class="input-group mb-2">
									<div class="input-group-prepend">
										<div class="input-group-text bg-info text-light"><i class="fa fa-user" aria-hidden="true"></i></div>
									</div>
									<input type="text" v-model.trim="form.name" class="form-control" name="name" placeholder="Your name during the meeting." maxlength="100" autocomplete="off">
								</div>
							</div>
							<div class="form-group">
								<div class="input-group mb-2">
									<div class="input-group-prepend">
										<div class="input-group-text bg-info text-light"><i class="fa fa-lock" aria-hidden="true"></i></div>
									</div>
									<input type="text" v-model.trim="form.pin" class="form-control" name="pin" placeholder="PIN to join the meeting." maxlength="100" autocomplete="off" >
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
	</div>
</template>

<script>
	import AlertMessage from "../common/AlertMessage.vue"
	import HttpClient from "./HttpClient.vue"
	import * as Constant from '../constants/Constants.js';
	const url = require('url');

	export default { components: {
		AlertMessage,
		HttpClient
		},
		props: ['meeting', 'title'],
		emits: ['credentials'],
		data() {
			return {
				isWorking: false,
				alerts:[],
				form:{
					name : null,
					pin : null,
					meeting:this.meeting
				}
			}
		},
		methods: {

			/*
			 * This handler is called after a user fill a login form and click to 'Login' button.
			 */
			getCredentials(e) {


				if (!this.form.name) {
					this.alerts.push({
						text : 'Name required.',
						type:"alert-danger"
					});
					return
				}

				if (!this.form.pin) {
					this.alerts.push({
						text : 'PIN required.',
						type:"alert-danger"
					});
					return
				}

				// this start a HttpClient in view template to fetch a JSON from local server
				this.isWorking = true;

				return
			},

			/**
			 * Compose a URL to get a credentials from local server.
			 *
			 * Format:  Constant.CRENDTIALS_TO_MEETING_URL + /${meeting}/${pin}/${userName}
			 * @see server.js
			 *
			 * @returns {String} - url
			 */
			getURL( formData ){
				return new URL(`${formData.meeting}/${formData.pin}/${formData.name}`, Constant.CRENDTIALS_TO_MEETING_URL).toString();
			},

			/*
			 * This handler is called after the HttpClient returns a response from the local server.
			 */
			serverResponse(response){
				this.isWorking = false;

				if( response.status != 200 ){
					this.alerts.push({
						text : `Status: ${response.status}. ${response.statusText}`,
						type:"alert-danger"
					});
					return
				}

				if(!(response.data && response.data.meeting && response.data.meeting.MeetingId)){
					throw new Error("There is not MeetingId.")
				}

				if(!(response.data && response.data.attendee && response.data.attendee.AttendeeId)){
					throw new Error("There is not AttendeeId.")
				}

				this.$emit('credentials', response.data)
			}
		}
	}
</script>
