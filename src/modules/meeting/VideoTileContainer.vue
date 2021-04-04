<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 row-cols-xl-12">
      <VideoTile
        v-for="tileState in tileMap.values()"
        v-bind:key="tileState.tileId"
        v-bind:tileState="tileState"
        v-bind:meetingSession="meetingSession" />
  </div>

  <div class="row">
    <div class="col bg-dark">
      <PrezentationCanvas />
    </div>
  </div>
</template>

<script>
import Utils from "../tools/Utils.js"
import VideoTile from "./VideoTile.vue"
import PrezentationCanvas from "./PrezentationCanvas.vue"

export default {
  components: {
		VideoTile,
    PrezentationCanvas
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
