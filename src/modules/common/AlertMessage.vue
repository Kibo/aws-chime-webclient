<template>
	<div class="alert alert-dismissible fade show my-1" v-bind:class="alert && alert.type ? alert.type : 'alert-info' " role="alert">
		<small v-html="alert && alert.text"></small>
		<button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click.prevent="dismissAlert(alert)">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
</template>

<script>
export default {
	props: ['alert', 'alerts'],
	data() {
		return {

		}
	},
	methods: {
		dismissAlert( alert ){
			for(let idx = 0; idx < this.alerts.length; idx++ ){
				if(this.alerts[idx] === alert){
					this.alerts.splice(idx, 1);
				}
			}
		}
	}
}
</script>
