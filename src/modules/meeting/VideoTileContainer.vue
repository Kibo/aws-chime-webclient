<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 row-cols-xl-12">
      <VideoTile
        v-for="tileState in attendeeManager.tileMap.values()"
        v-bind:key="tileState.tileId"
        v-bind:tileState="tileState"
        v-bind:meetingSession="meetingSession" />
  </div>

  <div class="row">
    <div class="col bg-dark mb-1">
      <canvas class="d-block mx-auto my-2 bg-chime"
        v-bind:id="utils.getConstant('ID_ELEMENT_FOR_PREZENTATION_CANVAS')"
        v-bind:width="utils.getConstant('PREZENTATION_CANVAS_WIDTH')"
        v-bind:height="utils.getConstant('PREZENTATION_CANVAS_HEIGHT')">
      </canvas>
    </div>
  </div>
</template>

<script>
import Utils from "../tools/Utils.js"
import VideoTile from "./VideoTile.vue"

let time = null
let frame = -1

export default {
  components: {
		VideoTile
	},
	emits: [],
	props: ['meetingSession', 'attendeeManager'],
	data() {
			return {
				utils:Utils,
			  logger:this.$store.state.logger,

        canvas:null,
        ctx:null,

        // Background
        bgCanvas:null,
        bgCtx:null,

        // Foreground
        fgCanvas:null,
        fgCtx:null,

        requestID:null,
        frames:[]
			}
	},
	mounted() {
    this.canvas = document.getElementById( Utils.getConstant('ID_ELEMENT_FOR_PREZENTATION_CANVAS') );
    this.bgCanvas = new OffscreenCanvas(this.canvas.width, this.canvas.height)
    this.fgCanvas = new OffscreenCanvas(this.canvas.width, this.canvas.height)

    this.ctx = this.canvas.getContext("2d");
    this.bgCtx = this.bgCanvas.getContext('2d');
    this.fgCtx = this.fgCanvas.getContext('2d');

    window.requestAnimationFrame( this.animationLoop );
  },
	beforeUnmount(){
    if( this.requestID ){
      window.cancelAnimationFrame( this.requestID );
    }
  },
  computed: {
    delay(){
      frame = -1
      return 1000/ this.$store.state.canvasSetting.fps
    },
    background(){
      this.drawImage( this.bgCtx, this.$store.state.canvasSetting.background )
      return this.bgCanvas
    },
    foreground(){
      this.drawImage( this.fgCtx, this.$store.state.canvasSetting.foreground )
      return this.fgCanvas
    },
    isForeground(){
      return this.$store.state.canvasSetting.foreground ? true : false
    }

  },
	methods:{

    animationLoop( timeStamp ){
      if (time === null){
        time = timeStamp
      }

      let seg = Math.floor((timeStamp - time) / this.delay)
      if (seg > frame) {
          frame = seg;

          if(this.isForeground){
            this.drawForeground()
          }else{
            this.update()
            this.draw()
            this.clear()
          }
      }

			this.requestID = window.requestAnimationFrame( this.animationLoop );
		},

    update(){
      let isContent = false
      this.attendeeManager.tileMap.forEach( tileState =>{
        if( tileState.isContent && tileState.boundVideoElement){
          isContent = true
          this.frames.push({
            video:tileState.boundVideoElement,
            dx: Utils.getConstant('PREZENTATION_CANVAS_WIDTH') - (Utils.getSetting('VIDEO_INPUT_QUALITY_WIDTH') + Utils.getConstant('PREZENTATION_CANVAS_PADDING_RIGHT')),
            dy:Utils.getConstant('PREZENTATION_CANVAS_PADDING_TOP'),
            dWidth:Utils.getSetting('VIDEO_INPUT_QUALITY_WIDTH'),
            dHeight:Utils.getSetting('VIDEO_INPUT_QUALITY_HEIGHT'),
          })
        }
      })

      this.attendeeManager.tileMap.forEach( tileState => {
        const resizeRatio = 4

        if( tileState.isPresenter && tileState.boundVideoElement){
          let dx = isContent
            ? Utils.getConstant('PREZENTATION_CANVAS_PADDING_LEFT')
            : Utils.getConstant('PREZENTATION_CANVAS_WIDTH') - (Utils.getSetting('VIDEO_INPUT_QUALITY_WIDTH') + Utils.getConstant('PREZENTATION_CANVAS_PADDING_RIGHT'))

          let dy = isContent
            ? Utils.getConstant('PREZENTATION_CANVAS_HEIGHT') - (Utils.getSetting('VIDEO_INPUT_QUALITY_HEIGHT')/resizeRatio + Utils.getConstant('PREZENTATION_CANVAS_PADDING_BOTTOM'))
            : Utils.getConstant('PREZENTATION_CANVAS_PADDING_TOP')

          let dWidth = isContent
            ? Utils.getSetting('VIDEO_INPUT_QUALITY_WIDTH')/resizeRatio
            : Utils.getSetting('VIDEO_INPUT_QUALITY_WIDTH')

          let dHeight = isContent
              ? Utils.getSetting('VIDEO_INPUT_QUALITY_HEIGHT')/resizeRatio
              : Utils.getSetting('VIDEO_INPUT_QUALITY_HEIGHT')

          this.frames.push({
            video:tileState.boundVideoElement,
            dx:dx,
            dy:dy,
            dWidth: dWidth,
            dHeight: dHeight
          })
        }
      })
    },

    draw(){
        // draw from off-screen canvas
        this.ctx.drawImage(
          this.background,
          0,
          0,
          this.canvas.width,
          this.canvas.height
        )

        this.frames.forEach( frame => {

          this.ctx.fillStyle = 'white';
          let border = 5; //px
          this.ctx.fillRect(frame.dx-border, frame.dy-border, frame.dWidth+2*border, frame.dHeight+2*border);

          this.ctx.drawImage( frame.video, frame.dx, frame.dy, frame.dWidth, frame.dHeight )
        })
    },

    drawForeground(){
      this.ctx.drawImage(
        this.foreground,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      )
    },

    clear(){
      this.frames = []
    },

    /*
    * Draw image to canvas
    *
    * @param {CanvasContext} - ctx
    * @param {String} url - image url
    */
    drawImage(ctx, url){
      if(!url){
        return
      }

      let img = new Image();
      img.onload = () => {
        ctx.drawImage(img,
          0,
          0,
          this.canvas.width,
          this.canvas.height
        )
      };
      img.src = url;
      console.log( "draw " + url)
    }
	}
}
</script>
