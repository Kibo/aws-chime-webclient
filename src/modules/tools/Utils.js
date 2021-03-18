import * as Constants from '../constants/Constants.js'
/*
 * This "SETTING_PROFILE_NAME" will replace by value from .env
 * @see webpack.config.js
 */
import * as SettingProfile from "../../profiles/SETTING_PROFILE_NAME"

const Utils = {
	
	/*
	* Helper method for attaching Constants in View template.
	* 
	* @param {String} - Constant name. For instance: 'ID_APP'
	* @returns - Constant value.
	*/
	getConstant( id ){
		let val = Constants[id]
		if( typeof val === 'undefined' ){
			throw new Error('No value for constant: ' + id)	
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
		if( typeof val === 'undefined' ){
			throw new Error('No value for setting: ' + id)	
		} 
		return val
	},
	
	buildVideoElement( id, isContent ){		
		let parentId = isContent ? 
				this.getConstant('ID_VIDEO_ELEMENT_CONTAINER_SHARE') : 
				this.getConstant('ID_VIDEO_ELEMENT_CONTAINER_TILES')
		let parent = window.document.getElementById( parentId )
		
		let videoWrapper = this.createVideoElementWrapper( id, isContent )									
		let videoElement = this.createVideoElement()
			
		//TODO
		videoWrapper.querySelector('.embed-responsive').append( videoElement )
		
		parent.append( videoWrapper )
		
		return videoElement			
	},
	
	/*
	 * Remove element from DOM
	 * 
	 * @param {String} id - element ID
	 * @return {Boolean} - is deleted?
	 */
	removeElementById( id ){
		let element = document.getElementById(id)
		if(element){
			element.outerHTML = "";
			return true
			
		}else{
			return false
		}		 		
	},
	
	/*
	 * Create a DOM HTML Video element
	 * 
	 * @returns {HTMLVideoElement}
	 */
	createVideoElement(){		
		let videoElement = document.createElement("video")
		videoElement.classList.add("w-100", "h-100");
		return videoElement			
	},
	
	/*
	 * Create a responsive wrapper for video element
	 * 
	 * @param {Strint} id - element ID
	 * @param {Boolean} isContent - is share content?
	 * @returns {Node} - DOM element with ID
	 */
	createVideoElementWrapper(id, isContent){
		let wrapper = document.createElement("div")
		wrapper.id = id;
		if( isContent ){
			wrapper.classList.add("col");	
		}else{
			wrapper.classList.add("col-12", "col-sm-12","col-md-3");
		}
		
		let responsive = document.createElement("div")
		responsive.classList.add("embed-responsive", "embed-responsive-16by9");
		
		wrapper.append( responsive )
		
		return wrapper							
	}
		
}


export default Utils

// ### PRIVATE###################

