<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 row-cols-xl-12"
    v-bind:class="{'hiddeVideoTile':isHideVideoTiles}">
      <VideoTile
        v-for="tileState in attendeeManager.tileMap.values()"
        v-bind:key="tileState.tileId"
        v-bind:tileState="tileState"
        v-bind:meetingSession="meetingSession"
        v-bind:attendeeManager="attendeeManager" />
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
	props: ['meetingSession', 'attendeeManager', 'alerts' ,'role'],
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
        frames:[],

        // redraw bg or fg
        redraw:false
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
      return 1000/ this.$store.state.moderatorSetting.fps
    },
    background(){
      return this.$store.state.moderatorSetting.background
    },
    foreground(){
      return this.$store.state.moderatorSetting.foreground
    },
    isForeground(){
      return this.$store.state.moderatorSetting.foreground ? true : false
    },
    countOfTiles(){
      return this.attendeeManager.tileMap.size
    },
    presenter(){
      return this.attendeeManager.getPresenter()
    },
    isHideVideoTiles(){
      return Utils.getSetting('SHOW_VIDEO_TILES_CONTAINER', this.role) == false
    }
  },
  watch: {
    background (newBg, oldBg) {
        this.drawImageFromURL( this.bgCtx, this.$store.state.moderatorSetting.background)
    },
    foreground (newFg, oldFg) {
      this.drawImageFromURL( this.fgCtx, this.$store.state.moderatorSetting.foreground)
    },
    countOfTiles (newBg, oldBg) {
        this.drawImageFromURL( this.bgCtx, this.$store.state.moderatorSetting.background)
    },
    presenter (newP, oldP) {
        this.drawImageFromURL( this.bgCtx, this.$store.state.moderatorSetting.background)
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

          if( this.isForeground ){
            if(this.redraw){
              // draw background from off-screen canvas
              this.drawImage( this.ctx, this.fgCanvas )
              this.logger.warn('Draw foreground image')
            }
          }else{
            this.update()
            this.draw()
          }

          this.clear()
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

        if( this.attendeeManager.isPresenter( tileState.boundAttendeeId ) && tileState.boundVideoElement){
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
        if( this.redraw ){
          // draw background from off-screen canvas
          this.drawImage( this.ctx, this.bgCanvas )
          this.logger.warn('Draw background image')
        }

        this.frames.forEach( frame => {

          this.ctx.fillStyle = 'white';
          let border = 5; //px
          this.ctx.fillRect(frame.dx-border, frame.dy-border, frame.dWidth+2*border, frame.dHeight+2*border);

          this.ctx.drawImage( frame.video, frame.dx, frame.dy, frame.dWidth, frame.dHeight )
        })
    },

    clear(){
      this.frames = []
      this.redraw = false
    },

    /*
    * Draw image from URL to canvas
    *
    * @param {CanvasContext} - ctx
    * @param {String} url - image url
    */
    drawImageFromURL(ctx, url){
      let img = new Image();
      img.onload = () => {
        /*
        if (img.width + img.height == 0) {
            img.onerror();
            return;
        }
        */
        this.drawImage( ctx, img )
        this.redraw = true
      }

      img.onerror = () => {
        ctx.fillStyle = "#343a40";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // TODO huh some bug in Chrome Version 89.0.4389.90 (Official Build) (64-bit) ?
        //ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if(url){
          this.alerts.push({
						text : 'Failed to load image: ' + url,
						type:"alert-danger"
					});
        }

        this.redraw = true
      }

      img.src = url;
    },

    /*
    * Draw img to contex
    *
    * @param {CanvasContext} - ctx
    * @param {Image} - img
    */
    drawImage( ctx, img ){
      ctx.drawImage(img,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      )
    }
	}
}
</script>
