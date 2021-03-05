<template>
	<div>
		Loading ...		
	</div>
</template>

<script>
	import axios from 'axios'

	export default { 
		props:['url'],
		data() {
			return {
				response:null
			}
		},
		mounted() {
			axios
			.get(this.url, { 
				validateStatus: function (status) {
					return status >= 200 && status < 500;
				}
			})
			.then(response => {				
				this.response = response
											
			}).catch(error => {
				console.error( error )
				this.response = {status:500, message:error.message}					
				
			}).finally( () => {												
				this.$emit('serverResponse', this.response)
			}) 											
		}			
	}
</script>