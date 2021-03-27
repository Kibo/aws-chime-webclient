import * as Constants from '../constants/Constants.js'
import SettingManager from './SettingManager.js'

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
	* @param {String} key.
	* @param {String} role, role name
	* 
	* @returns value
	*/
	getSetting( key, role ){			
							
		if( SettingManager[role] && 
			typeof SettingManager[role][key] !== 'undefined' ){
			return SettingManager[role][key]
		}
				
		if(SettingManager['default'] && 
		typeof SettingManager['default'][key] !== 'undefined'){
			return SettingManager['default'][key]
		}
				
		throw new Error('No default value for key: ' + key)
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
		
		
		let responsiveWrapper = this.createResponsiveWrapper(id)
		let videoElement = this.createVideoElement()
		
		responsiveWrapper.append( videoElement )		
		parent.append( responsiveWrapper )
														
		return videoElement			
	},
			
	/*
	 * Create a responsive wrapper for video element
	 * 
	 * @param {Strint} id - element ID
	 * @returns {Node} - DOM element
	 */
	createResponsiveWrapper(id){
		let wrapper = document.createElement("div")
		if(id){
			wrapper.id = id;	
		}		
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
	},
	
	/*
	 * Get attendee name
	 * 
	 * @param {String} externalUserId
	 * @returns {String}
	 */
	getAttendeeName( externalUserId ){
		if( !externalUserId ){
			return 'Unknown'
		}
		
		let parts = externalUserId.split('#')					
		return parts[1] ? parts[1] : 'Unknown' 			
	},
			
}


export default Utils