<template>			
	<div class="embed-responsive embed-responsive-16by9">
		<video v-bind:id="id" class="w-100 h-100" ></video>
	</div>
</template>

<script>
export default {
	props: ['id'],	
}
</script>