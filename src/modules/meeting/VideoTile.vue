<template>
  <div class="col mb-1" v-bind:class="{'hiddeVideoTile':isHidden}">
    <div class="card h-100 text-center">
    	  <video v-bind:id="getElementId()" class="card-img-top" />
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
	props: ['meetingSession', 'tileState', 'framesMap'],
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
						document.getElementById( this.getElementId()))

    if( this.tileState.isContent ){
        this.bindTileToCanvas()
    }

    this.logger.warn('Create video element with ID:#' + this.getElementId())
  },
	beforeUnmount(){
    this.framesMap.delete(this.tileState.tileId)
    this.meetingSession.audioVideo.unbindVideoElement(this.tileState.tileId)
    this.logger.warn('Release video element with ID:#' + this.getElementId())
  },
	methods:{

    bindTileToCanvas(){
      this.framesMap.set(this.tileState.tileId, {
        video:document.getElementById( this.getElementId()),
        dx:0,
        dy:0,
        dWidth:Utils.getSetting('VIDEO_INPUT_QUALITY_WIDTH'),
        dHeight:Utils.getSetting('VIDEO_INPUT_QUALITY_HEIGHT')
      })
      // hide this tile
      this.isHidden = true
    },

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
<style lang="stylus">

.hiddeVideoTile {
	position:fixed;
  top:0;
  left:0;
  width:1px;
  height:1px;
  overflow: hidden;
}
</style>
