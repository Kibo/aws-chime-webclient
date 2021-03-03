<template>
	<div v-if="status === getConstant( 'APP_STATUS_LOGIN' )">
		<LoginForm v-on:credentials="setCredentials"  />
	</div>
	
	<div v-if="status === getConstant( 'APP_STATUS_CONFIGURE' )">
		configure
	</div>
	
	
</template>

<script>
import LoginForm from "./LoginForm.vue"
import * as Constants from './Constants.js';

export default {
  components: {
    LoginForm
  },
         
  data() {
    return {
    	status:Constants.APP_STATUS_LOGIN
    }
  },

  methods: {
  	/*
  	 * This handler is called after the LoginForm send a valid credentials from server.
  	 * 
  	 * @param {Object} - {meeting:{}, atendee:{}}
  	 */  	  
    setCredentials( credentials ){    	
    	console.log( credentials )
    	this.status = Constants.APP_STATUS_CONFIGURE
    },
    
    /*
     * Helper method for attaching Constants in View template.
     * 
     * @param {String} - Constant name. For instance: 'ID_APP'
     * @returns - Constant value.
     */
    getConstant( id ){
    	return Constants[id]
    }
  }
}
</script>

<style lang="stylus">

</style>
