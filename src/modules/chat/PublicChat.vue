<template>


</template>

<script>
import Utils from "../tools/Utils.js"


export default {
	components: {

	},
	emits: [],
	props: ['messages', 'room'],
	data() {
			return {
				utils:Utils,
        logger:this.$store.state.logger
			}
	},
	mounted() {},
	beforeUnmount(){},

	methods:{

	}
}
</script>
