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
