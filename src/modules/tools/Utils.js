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
	* Get HTML Video element
	*
	* @param {String}
	* @returns {HTML Video element | null}
	*/
	getVideoElement(tileId){
		if( !tileId ){
			return
		}
		let id = this.getConstant('ID_PREFIX_FOR_VIDEO_ELEMENT') + tileId
		return document.querySelector(`#${id} video`)
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
	},

	/*
	* Convert string to boolean
	*
	* @param {String | Boolean}
	* @returns {boolean}
	*/
	value2Boolean( value ){
		if(typeof value == 'boolean'){
			return value
		}

		if(typeof value == 'string'){
			return (value === 'true') ? true : false
		}

		throw new Error( "Unknown type of value: " + typeof value );
	}
}

export default Utils
