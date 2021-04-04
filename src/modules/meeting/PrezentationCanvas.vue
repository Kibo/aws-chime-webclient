<template>
  <canvas class="d-block mx-auto my-2"
    v-bind:id="utils.getConstant('ID_ELEMENT_FOR_PREZENTATION_CANVAS')"
    v-bind:width="utils.getSetting('VIDEO_INPUT_QUALITY_WIDTH')"
    v-bind:height="utils.getSetting('VIDEO_INPUT_QUALITY_HEIGHT')">
  </canvas>
</template>

<script>
import Utils from "../tools/Utils.js"

export default {
  components: {

	},
	emits: [],
	props: [],
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
