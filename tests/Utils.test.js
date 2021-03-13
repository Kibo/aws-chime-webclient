import { mount, shallowMount } from '@vue/test-utils'
import Utils from "../src/modules/tools/Utils.js"
import * as Constant from '../src/modules/constants/Constants.js';
import * as SettingProfile from "../src/profiles/SETTING_PROFILE_NAME" 

test('Get value from SettingProfile', async () => {	
	expect(Utils.getSetting('NUMBER_OF_VIDEO_TILES' ))
	.toBe( SettingProfile.NUMBER_OF_VIDEO_TILES )		
})

test('no value in SettingProfile', async () => {		
	try {
    	expect(Utils.getSetting('abcde' ))
  	} catch (error) {  		
    	expect(error.toString()).toBe('Error: No value for setting: abcde');
  	}		
})

test('Get value from Constant', async () => {	
	expect(Utils.getConstant('PREFIX_FOR_ID_VIDEO_ELEMENT' ))
	.toBe( Constant.PREFIX_FOR_ID_VIDEO_ELEMENT )		
})

test('no value in Constant', async () => {		
	try {
    	expect(Utils.getConstant('abcde' ))
  	} catch (error) {  		
    	expect(error.toString()).toBe('Error: No value for constant: abcde');
  	}		
})