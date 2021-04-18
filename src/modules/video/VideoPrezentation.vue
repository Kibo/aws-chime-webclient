<template>
  <video class="d-block hiddeVideoTile"
    preload="auto"
    crossOrigin="anonymous"
    playsinline
    v-bind:id="utils.getConstant('ID_ELEMENT_FOR_PREZENTATION_VIDEO')"
    v-bind:width="utils.getSetting('VIDEO_INPUT_QUALITY_WIDTH')"
    v-bind:height="utils.getSetting('VIDEO_INPUT_QUALITY_HEIGHT')"
    v-bind:src="src">
  </video>
</template>

<script>
import Utils from "../tools/Utils.js"

export default {
  components: {

  },
  emits:[],
  props: ['src', 'isVideoPlay'],
  data() {
    return {
    	utils:Utils,
      logger:this.$store.state.logger,
      video:undefined,
    }
  },
  computed: {

  },
  watch: {
    isVideoPlay ( value ) {
      if(value){
        this.play()
      }else{
        this.pause()
      }
    }
  },
  mounted() {
    this.video = document.getElementById( Utils.getConstant('ID_ELEMENT_FOR_PREZENTATION_VIDEO'))
  },
	beforeUnmount(){},
  methods: {
    async play(){
      try {
        await this.video.play();
      } catch(err) {
        this.logger.error(err)
      }
    },
    pause(){
      this.video.pause()
    }
  }
}
</script>
