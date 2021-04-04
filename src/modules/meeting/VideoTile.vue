<template>

  <div class="card mb-1 w-25">
		  <video v-bind:id="getElementId()" class="w-100" />
		<div class="card-body p-0">
      {{getAttendeeName()}}
		</div>
	</div>

</template>

<script>
import Utils from "../tools/Utils.js"

export default {
  components: {

	},
	emits: [],
	props: ['meetingSession', 'tileState'],
	data() {
			return {
				utils:Utils,
			  logger:this.$store.state.logger,
			}
	},
	mounted() {
    this.meetingSession.audioVideo.bindVideoElement(
						this.tileState.tileId,
						document.getElementById( this.getElementId()))

    this.logger.warn('Create video element with ID:#' + this.getElementId())
  },
	beforeUnmount(){
    this.meetingSession.audioVideo.unbindVideoElement(this.tileState.tileId)
    this.logger.warn('Release video element with ID:#' + this.getElementId())
  },
	methods:{

    /*
    * Get DOM ID of this video element
    *
    * @returns {String}
    */
    getElementId(){
      return Utils.getConstant('ID_PREFIX_FOR_VIDEO_ELEMENT') + this.tileState.tileId
    },

    /*
    * Get Attendee name
    *
    * @param {String} externalUserId
    * @returns {String}
    */
    getAttendeeName(){
      let attendeeName = Utils.getAttendeeName(this.tileState.boundExternalUserId)
      if( this.tileState.isContent ){
        attendeeName += '#content'
      }

      return attendeeName
    }

	}
}
</script>
