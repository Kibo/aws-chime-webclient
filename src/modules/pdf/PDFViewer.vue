<template>

</template>

<script>
import Utils from "../tools/Utils.js"
import { PDFJS } from 'pdfjs-dist'

export default {
  components: {},
	emits: [],
	props: [],
	data() {
			return {
				utils:Utils,
			  logger:this.$store.state.logger
        pathToPdfFile:'/assets/testa.pdf'
			}
	},
	mounted() {
      PDFJS.getDocument( pathToPdfFile )
  },
	beforeUnmount(){

  },
	methods:{

  }
}
</script>
