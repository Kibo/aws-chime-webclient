<template>
	<LoginForm v-bind:meeting="meeting"/>
</template>

<script>
import LoginForm from "./LoginForm.vue"

export default {
  components: {
    LoginForm
  },

  data() {
    return {
         meeting:"12345" 
    }
  },

  methods: {
    getCredentials() {
    	console.log("get credentials")    	
    },
  }
}
</script>

<style lang="stylus">

</style>
