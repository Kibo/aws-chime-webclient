<template>
	<div class="row">
		<div class="col">Prezentation</div>		
	</div>
	<div class="row">
		<template 
			v-for="n in getSetting('NUMBER_OF_VIDEO_TILES')" 
			v-bind:id="n">			
			<div class="col">
				<VideoTile v-bind:id="getConstant('PREFIX_FOR_ID_VIDEO_ELEMENT') + (n-1)" />
			</div>
			<div class="w-100" v-if="n%4===0"></div>
		</template>				
	</div>	
</template>

<script>
import VideoTile from "./VideoTile.vue"
import * as Constants from '../constants/Constants.js'
/*
 * This "SETTING_PROFILE_NAME" will replace by value from .env
 * @see webpack.config.js
 */
import * as SettingProfile from "../../profiles/SETTING_PROFILE_NAME" 

export default {
	components: {
		VideoTile			
	},
	props: ['meetingSession'],
	data() {
			return {							
				// index-tileId pairs
				indexMap:{},
			}
	},
	
	mounted() {				
			
	},
	
	beforeUnmount(){
	
	},
		
	methods:{
		
		acquireVideoElement( tileId ){
		  
		  // Return the same video element if already bound.
		  for (let i = 0; i < SettingProfile.NUMBER_OF_VIDEO_TILES; i += 1) {
		    if (this.indexMap[i] === tileId) {
		      return this.getHTMLVideoElement(i)
		    }
		  }
		  
		  // Return the next available video element.
		  for (let i = 0; i < SettingProfile.NUMBER_OF_VIDEO_TILES; i += 1) {
		    if (!this.indexMap.hasOwnProperty(i)) {
		      this.indexMap[i] = tileId;
		      return this.getHTMLVideoElement(i)
		    }
		  }
		  throw new Error('no video element is available');
		},
		
		releaseVideoElement( tileId ){
		  for (let i = 0; i < SettingProfile.NUMBER_OF_VIDEO_TILES; i += 1) {
		    if (indexMap[i] === tileId) {
		      delete this.indexMap[i];
		      return;
		    }
		  }
		},
		
		/*
		 * Get HTMLVideoElement from DOM
		 * 
		 * @param {Number} idx, index 
		 * @return {HTMLVideoElement}
		 */
		getHTMLVideoElement( idx ){
			let id = Constants.PREFIX_FOR_ID_VIDEO_ELEMENT + idx
			let videoElement = window.document.getElementById( id )
			if( !videoElement ){
				throw new Error('No video element is available: ' + id);
			}
			return videoElement
		},
		
		/*
		* Helper method for attaching Constants in View template.
		* 
		* @param {String} - Constant name. For instance: 'ID_APP'
		* @returns - Constant value.
		*/
		getConstant( id ){
			let val = Constants[id]
			if(!val){
				throw new Error('No value for contant: ' + id)	
			} 
			return val 
		},
		
		/*
		* Helper method for attaching SettingProfile in View template.
		* 
		* @param {String} - SettingProfile name.
		* @returns - SettingProfile value.
		*/
		getSetting( id ){
			let val = SettingProfile[id] 
			if(!val){
				throw new Error('No value for setting: ' + id)	
			} 
			return val
		}
	}	
}
</script>