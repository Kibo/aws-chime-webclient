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
		if(!val){
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
		if(!val){
			throw new Error('No value for setting: ' + id)	
		} 
		return val
	}
}


export default Utils
