<template>
  <div class="btn-group btn-group-sm mx-auto">
    <button class="btn btn-secondary" v-on:click.prevent="PDFPrevPage()">Prev</button>
    <button class="btn btn-secondary" v-on:click.prevent="PDFNextPage()">Next</button>
  </div>
</template>

<script>
import Utils from "../tools/Utils.js"

export default {
  components: {},
  emits:['sendSystemMessage', 'pdfPageIndexChanged'],
  props: [],
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
      let idx = this.$store.state.moderatorSetting.pdfCurrentPageIndex - 1
      this.$emit('pdfPageIndexChanged', idx)
      this.$emit('sendSystemMessage', Utils.getConstant('SYSTEM_COMMAND_SET_PDF_PAGE_INDEX') + Utils.getConstant('COMMAND_DELIMITER') + idx)
    },

    PDFNextPage(){
      let idx = this.$store.state.moderatorSetting.pdfCurrentPageIndex + 1
      this.$emit('pdfPageIndexChanged', idx)
      this.$emit('sendSystemMessage', Utils.getConstant('SYSTEM_COMMAND_SET_PDF_PAGE_INDEX') + Utils.getConstant('COMMAND_DELIMITER') + idx)
    }
  }
}
</script>
