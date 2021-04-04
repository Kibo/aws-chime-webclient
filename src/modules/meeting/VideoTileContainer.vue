<template>

  <VideoTile
      v-for="tileState in tileMap.values()"
      v-bind:key="tileState.tileId"
      v-bind:tileState="tileState"
      v-bind:meetingSession="meetingSession" />

</template>

<script>
import Utils from "../tools/Utils.js"
import VideoTile from "./VideoTile.vue"

export default {
  components: {
		VideoTile
	},
	emits: [],
	props: ['meetingSession', 'attendeePresenceMap', 'tileMap'],
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
