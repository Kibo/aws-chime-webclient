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
      <canvas class="d-block mx-auto my-2"
        v-bind:id="utils.getConstant('ID_ELEMENT_FOR_PREZENTATION_CANVAS')"
        v-bind:width="utils.getSetting('VIDEO_INPUT_QUALITY_WIDTH')"
        v-bind:height="utils.getSetting('VIDEO_INPUT_QUALITY_HEIGHT')">
      </canvas>
    </div>
  </div>
</template>

<script>
import Utils from "../tools/Utils.js"
import VideoTile from "./VideoTile.vue"

export default {
  components: {
		VideoTile
	},
	emits: [],
	props: ['meetingSession', 'tileMap'],
	data() {
			return {
				utils:Utils,
			  logger:this.$store.state.logger,

        requestID:null,

        canvas:null,
        ctx:null,

        secondsPassed:0,
				oldTimeStamp:0,
				fps:0,

        frames:[]
			}
	},
	mounted() {
    this.canvas = document.getElementById( Utils.getConstant('ID_ELEMENT_FOR_PREZENTATION_CANVAS') );
    this.ctx = this.canvas.getContext("2d");
    this.getRequestAnimationFrame()( this.animationLoop.bind( this ) );
  },
	beforeUnmount(){
    if( this.requestID ){
      this.getCancelAnimationFrame()( this.requestID );
    }
  },
	methods:{

    animationLoop( timeStamp ){
			// Calculate the number of seconds passed since the last frame
    	this.secondsPassed = ( timeStamp - this.oldTimeStamp) / 1000;
    	this.oldTimeStamp = timeStamp;

    	// Calculate fps
    	this.fps = Math.round(1 / this.secondsPassed);

      this.update()
			this.draw()
      this.clear()

			this.requestID = this.getRequestAnimationFrame()( this.animationLoop.bind( this ) );
		},

    update(){
      this.tileMap.forEach( tileState =>{
        if( tileState.isContent && tileState.boundVideoElement){
          this.frames.push({
            video:tileState.boundVideoElement,
            dx:0,
            dy:0,
            dWidth:Utils.getSetting('VIDEO_INPUT_QUALITY_WIDTH'),
            dHeight:Utils.getSetting('VIDEO_INPUT_QUALITY_HEIGHT'),
          })
        }
      })

      this.tileMap.forEach( tileState =>{
        if( tileState.isPresenter && tileState.boundVideoElement){
          this.frames.push({
            video:tileState.boundVideoElement,
            dx:0,
            dy:0,
            dWidth:Utils.getSetting('VIDEO_INPUT_QUALITY_WIDTH')/4,
            dHeight:Utils.getSetting('VIDEO_INPUT_QUALITY_HEIGHT')/4,
          })
        }
      })
    },

    draw(){
        this.frames.forEach( frame => {
          this.ctx.drawImage( frame.video, frame.dx, frame.dy, frame.dWidth, frame.dHeight )
        })
    },

    clear(){
      this.frames = []
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
