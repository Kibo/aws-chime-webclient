<template>
	
</template>

<script>
import Utils from "../tools/Utils.js"

export default {
	emits: ['contentShareDidStart', 'contentShareDidStop'],
	props: ['meetingSession'],	
	data() {
		return {
			logger:this.$store.state.logger					
		}
	}, 
	mounted() {				
		this.meetingSession.audioVideo.addContentShareObserver( this.getContentShareObserver() )			
	},
	beforeUnmount(){
		this.meetingSession.audioVideo.removeContentShareObserver( this.getContentShareObserver() )	
	},
	methods: {
		/*
		 * Content share observer
		 * 
		 * @see https://aws.github.io/amazon-chime-sdk-js/interfaces/contentshareobserver.html
		 */
		getContentShareObserver(){
			let contentShareObserver = {
				
				/*
				 * Called when a content share session is started.
				 */
				contentShareDidStart: () =>{
					this.logger.info("Content share session is started")
					this.$emit("contentShareDidStart")	
				},
				
				/*
				 * Called when a content share session is stopped.
				 */
				contentShareDidStop:()=>{													
					this.logger.info("Content share session is stopped")
					this.$emit("contentShareDidStop")
				}
			}
			
			return contentShareObserver
		}
	}
}
</script>