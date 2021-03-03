<template>
	<LoginForm v-on:credentials="setCredentials"  />
</template>

<script>
import LoginForm from "./LoginForm.vue"
import * as Constant from './Constants.js';

export default {
  components: {
    LoginForm
  },
		
  data() {
    return {
    	
    }
  },

  methods: {  	  
    setCredentials( credentials ){
    	console.log( credentials )
    },
  }
}
</script>

<style lang="stylus">

</style>
