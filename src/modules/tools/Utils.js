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
	 * @param {Object} tileState
	 * @param {Boolean} isPresenterTile
	 * @return {HTMLVideoElement}
	 */
	getHTMLVideoElement( tileState, isPresenterTile=false){
		let id = this.getConstant('ID_PREFIX_FOR_VIDEO_ELEMENT') + tileState.tileId
		let videoWrapper = document.getElementById(id)
		if( videoWrapper ){
			return videoWrapper.querySelector('video')
		}

		return this.buildVideoElement( tileState, isPresenterTile)
	},

	/*
	 * Create DOM for VideoElement
	 *
	 * @param {Object} tileState
	 * @param {Boolean} isPresenterTile
	 *
	 * @returns {HTMLVideoElement}
	 */
	buildVideoElement( tileState, isPresenterTile=false){
		let parentId = isPresenterTile ?
				this.getConstant('ID_VIDEO_ELEMENT_PRESENTERS_CONTAINER') :
				this.getConstant('ID_VIDEO_ELEMENT_TILES_CONTAINER')
		let parent = document.getElementById( parentId )

		let responsiveWrapper = this.createResponsiveWrapper(tileState, isPresenterTile)
		let videoElement = this.createVideoElement( tileState, isPresenterTile )

		responsiveWrapper.append( videoElement )
		parent.append( responsiveWrapper )

		return videoElement
	},

	/*
	 * Create a responsive wrapper for video element
	 *
	 * @param {Object} tileState
	 * @param {Boolean} isPresenterTile
	 *
	 * @returns {Node} - DOM element
	 */
	createResponsiveWrapper(tileState, isPresenterTile){
		let wrapper = document.createElement("div")
		wrapper.id = this.getConstant('ID_PREFIX_FOR_VIDEO_ELEMENT') + tileState.tileId
		if(isPresenterTile){
			wrapper.classList.add("position-absolute");
		}else{
			wrapper.classList.add("img-thumbnail", "p-0", "mb-1", "bg-dark");
		}

		if( !tileState.isContent ){
			wrapper.classList.add("w-25");
		}

		return wrapper
	},

	/*
	 * Create a DOM HTML Video element
	 *
	 * @param {Object} tileState
	 * @param {Boolean} isPresenterTile
	 * @returns {HTMLVideoElement}
	 */
	createVideoElement( tileState, isPresenterTile ){
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
			while (element.firstChild) {
    			element.firstChild.remove()
			}
			element.remove()

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

	/*
	 * Decode uint8array data to String
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder
	 *
	 * @param {int8array} - array
	 */
	encodeUint8array( array ){
		return new TextDecoder().decode( array )
	}
}


export default Utils
