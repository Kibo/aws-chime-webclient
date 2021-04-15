<template>
    <canvas class="d-block hiddeVideoTile"
      v-bind:id="utils.getConstant('ID_ELEMENT_FOR_PDF_CANVAS')"
      v-bind:width="utils.getSetting('VIDEO_INPUT_QUALITY_WIDTH')"
      v-bind:height="utils.getSetting('VIDEO_INPUT_QUALITY_HEIGHT')">
    </canvas>
</template>

<script>
import Utils from "../tools/Utils.js"
const pdfjs = require("pdfjs-dist/build/pdf.js");
const PdfjsWorker = require("pdfjs-dist/build/pdf.worker.js");
pdfjs.GlobalWorkerOptions.workerPort = new PdfjsWorker();

export default {
  components: {},
  props: ['src'],
  data() {
    return {
    	utils:Utils,

      pdf:undefined,
      totalPagesCount:0,

      canvas:null,
      ctx:null,
    }
  },
  computed: {
    currentPageIndex(){
      let idx = this.$store.state.moderatorSetting.pdfCurrentPageIndex

      if( idx > this.totalPagesCount - 1 ){
        this.$store.commit('moderatorSetting',{pdfCurrentPageIndex: this.totalPagesCount - 1})
        return
      }

      if( idx < 0 ){
        this.$store.commit('moderatorSetting',{pdfCurrentPageIndex:0})
        return
      }

      return this.$store.state.moderatorSetting.pdfCurrentPageIndex
    },

  },
  watch: {
    currentPageIndex ( idx ) {      
      this.render()
    }
  },
  mounted() {
    this.canvas = document.getElementById( Utils.getConstant('ID_ELEMENT_FOR_PDF_CANVAS') );
    this.ctx = this.canvas.getContext("2d");
    this.fetchPDF();
  },
	beforeUnmount(){
    this.pdf.destroy()
  },
  methods: {
    /*
    * Fetch PDF file fomr server
    */
    fetchPDF() {
      pdfjs.getDocument( this.src ).promise.then( doc =>{
        this.pdf = doc
        this.totalPagesCount = doc.numPages;

        this.render()
      })
    },

    /*
    * Render current page
    */
    render(){
      this.pdf.getPage( this.currentPageIndex + 1 ).then( page => {
        this.drawPage( page )
      })
    },

    /*
    * Draw page to canvas
    */
    drawPage( page ){
      let unscaledViewport = page.getViewport({scale:1});
      let scale = Math.min((this.canvas.height / unscaledViewport.height), (this.canvas.width / unscaledViewport.width));
      let viewport = page.getViewport({scale:scale});

      page.render({
          canvasContext: this.ctx,
          viewport: viewport
      });
    }
  }
}
</script>
