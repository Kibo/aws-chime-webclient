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
	
	/*
	 * Get HTMLVideoElement from DOM
	 * 
	 * @param {Number} tileId
	 * @param {Boolean} isPresenterTile
	 * @return {HTMLVideoElement}
	 */
	getHTMLVideoElement( tileId, isPresenterTile=false ){
		let id = this.getConstant('ID_PREFIX_FOR_VIDEO_ELEMENT') + tileId
		let videoWrapper = document.getElementById(id)
		if( videoWrapper ){
			return videoWrapper.querySelector('video')
		}
						
		return this.buildVideoElement( id, isPresenterTile )		
	},
	
	/*
	 * Create DOM for VideoElement
	 * 
	 * @param {String} id - element wrapper ID
	 * @param {Boolean} isPresenterTile
	 * 
	 * @returns {HTMLVideoElement}
	 */
	buildVideoElement( id, isPresenterTile ){		
		let parentId = isPresenterTile ? 
				this.getConstant('ID_VIDEO_ELEMENT_PRESENTERS_CONTAINER') : 
				this.getConstant('ID_VIDEO_ELEMENT_TILES_CONTAINER')
		let parent = document.getElementById( parentId )
		
		let spaceWrapper = this.createSpaceWrapper(id, isPresenterTile)
		let responsiveWrapper = this.createResponsiveWrapper()
		let videoElement = this.createVideoElement()
		
		responsiveWrapper.append( videoElement )
		spaceWrapper.append( responsiveWrapper )
		parent.append( spaceWrapper )
														
		return videoElement			
	},
		
	/*
	 * Create a space wrapper for video element
	 * 
	 * @param {Strint} id - element ID
	 * @param {Boolean} isPresenterTile
	 * 
	 * @returns {Node} - DOM element with ID
	 */
	createSpaceWrapper(id, isPresenterTile){
		let wrapper = document.createElement("div")
		wrapper.id = id;
		
		if( isPresenterTile ){
			wrapper.classList.add("col");	
		}else{
			wrapper.classList.add("col-12", "col-sm-12","col-md-3");
		}
					
		return wrapper							
	},
	
	/*
	 * Create a responsive wrapper for video element
	 * 
	 * @returns {Node} - DOM element
	 */
	createResponsiveWrapper(){
		let wrapper = document.createElement("div")
		wrapper.classList.add("embed-responsive", "embed-responsive-16by9");						
		return wrapper							
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
	}		
}


export default Utils