<template>

  <div class="btn-group btn-group-sm mx-auto"
    v-if="isNavbarVisible">
    <button class="btn btn-success" v-on:click.prevent="toggle()">{{isVideoPlay ? 'Stop' : 'Play' }}</button>
  </div>

  <VideoPrezentation
    v-if="$store.state.moderatorSetting.video"
    v-bind:isVideoPlay="isVideoPlay"
    v-bind:src="$store.state.moderatorSetting.video" />

</template>

<script>
import Utils from "../tools/Utils.js"
import VideoPrezentation from "./VideoPrezentation.vue"

export default {
  components: {
    VideoPrezentation
  },
  emits:['sendSystemMessage', 'sharedVideoPlay'],
  props: ['isNavbarVisible', 'isVideoPlay'],
  data() {
    return {
    	utils:Utils,
    }
  },
  computed: {},
  watch: {},
  mounted() {},
	beforeUnmount(){},
  methods: {
    toggle(){
      let isPlay = this.isVideoPlay ? false : true
      this.$emit('sharedVideoPlay', isPlay)
      this.$emit('sendSystemMessage', Utils.getConstant('SYSTEM_COMMAND_SHARED_VIDEO_PLAY') + Utils.getConstant('COMMAND_DELIMITER') + isPlay)
    }
  }
}
</script>
