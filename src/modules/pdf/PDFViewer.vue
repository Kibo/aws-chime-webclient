<template>
  PDF viewer
</template>

<script>
import Utils from "../tools/Utils.js"
import { PDFJS } from 'pdfjs-dist'

export default {
  components: {},
	emits: [],
	props: ['file'],
	data() {
			return {
				utils:Utils,
			  logger:this.$store.state.logger
			}
	},
	mounted() {
      PDFJS.getDocument( this.file )
  },
	beforeUnmount(){

  },
	methods:{

  }
}
</script>
