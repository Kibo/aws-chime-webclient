<template>	
	<div class="card">
		<div class="card-header">
			Chat panel
		</div>
		<div class="card-body p-1">
			TODO
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
		
	}
}
</script>