<template>
	<div class="alert alert-dismissible fade show" v-bind:class="message && message.type ? message.type : 'alert-info' " role="alert">
		{{ message && message.text }}
		<button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click.prevent="$emit('dismiss')">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
</template>

<script>
export default {
	props: ['message'],	
}
</script>