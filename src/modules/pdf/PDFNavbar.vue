<template>

  <div class="btn-group btn-group-sm mx-auto"
    v-if="isNavbarVisible">
    <button class="btn btn-secondary" v-on:click.prevent="PDFPrevPage()">Prev</button>
    <button class="btn btn-secondary" v-on:click.prevent="PDFNextPage()">Next</button>
  </div>

  <PDFDocument
    v-if="$store.state.moderatorSetting.pdf"
    v-bind:pageIndex="pageIndex"
    v-bind:src="$store.state.moderatorSetting.pdf" />
</template>

<script>
import Utils from "../tools/Utils.js"
import PDFDocument from "./PDFDocument.vue"

export default {
  components: {
    PDFDocument
  },
  emits:['sendSystemMessage', 'pdfPageIndexChanged'],
  props: ['pageIndex', 'isNavbarVisible'],
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
    PDFPrevPage(){
      let idx = parseInt(this.pageIndex, 10) - 1
      this.$emit('pdfPageIndexChanged', idx)
      this.$emit('sendSystemMessage', Utils.getConstant('SYSTEM_COMMAND_SET_PDF_PAGE_INDEX') + Utils.getConstant('COMMAND_DELIMITER') + idx)
    },

    PDFNextPage(){
      let idx = parseInt(this.pageIndex, 10) + 1
      this.$emit('pdfPageIndexChanged', idx)
      this.$emit('sendSystemMessage', Utils.getConstant('SYSTEM_COMMAND_SET_PDF_PAGE_INDEX') + Utils.getConstant('COMMAND_DELIMITER') + idx)
    }
  }
}
</script>
