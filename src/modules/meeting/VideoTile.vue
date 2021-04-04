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
	props: ['meetingSession', 'tileState'],
	data() {
			return {
				utils:Utils,
			  logger:this.$store.state.logger,
        isHidden:false,
        requestID:null,

        canvas:null,
        ctx:null,
        video:null,

        secondsPassed:0,
				oldTimeStamp:0,
				fps:0,
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
    this.meetingSession.audioVideo.unbindVideoElement(this.tileState.tileId)
    this.logger.warn('Release video element with ID:#' + this.getElementId())

    if( this.requestID ){
      this.getCancelAnimationFrame()( this.requestID );
    }
  },
	methods:{

    bindTileToCanvas(){
      this.canvas = document.getElementById( Utils.getConstant('ID_ELEMENT_FOR_PREZENTATION_CANVAS') );
      this.ctx = this.canvas.getContext("2d");
      this.video = document.getElementById( this.getElementId() );

      console.log(this.canvas.width)
      console.log(this.canvas.height)

      this.requestID = this.getRequestAnimationFrame()( this.animationLoop.bind( this ) );

      // hide this tile
      this.isHidden = true
    },

    animationLoop( timeStamp ){
			// Calculate the number of seconds passed since the last frame
    	this.secondsPassed = ( timeStamp - this.oldTimeStamp) / 1000;
    	this.oldTimeStamp = timeStamp;

    	// Calculate fps
    	this.fps = Math.round(1 / this.secondsPassed);

			this.draw()

			this.requestID = this.getRequestAnimationFrame()( this.animationLoop.bind( this ) );
		},

    draw(){
      this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height)
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
    },

    getRequestAnimationFrame(){
			return window.requestAnimationFrame
		},

		getCancelAnimationFrame(){
			return window.cancelAnimationFrame
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
