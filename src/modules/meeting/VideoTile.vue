<template>
  <div class="col mb-1"
    v-bind:class="{'hiddeVideoTile':isHidden}"
    v-bind:id="getElementId()">
    <div class="card h-100 text-center">
    	  <video class="card-img-top" />
    	<div class="card-body">
        <p class="card-text">{{getAttendeeName()}}</p>
    	</div>
    </div>
  </div>
</template>

<script>
import Utils from "../tools/Utils.js"

export default {
  components: {

	},
	emits: [],
	props: ['meetingSession', 'tileState', 'attendeeManager'],
	data() {
			return {
				utils:Utils,
			  logger:this.$store.state.logger,
        isHidden:false
			}
	},
	mounted() {
    this.meetingSession.audioVideo.bindVideoElement(
						this.tileState.tileId,
            Utils.getVideoElement( this.tileState.tileId ))

    if( this.tileState.isContent ){
      this.isHidden = true
    }

    if(this.attendeeManager.isPresenter( this.tileState.boundAttendeeId )){
      this.isHidden = true
    }

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
