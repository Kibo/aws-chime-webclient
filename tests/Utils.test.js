import { mount, shallowMount } from '@vue/test-utils'
import Utils from "../src/modules/tools/Utils.js"
import * as Constant from '../src/modules/constants/Constants.js';

import DefaultSetting from '../src/roles/default.js';
import LektorSetting from '../src/roles/default.js';

test('Get value from Setting - default', async () => {	
	expect(Utils.getSetting('CAN_SHARE_CONTENT' ))
	.toBe( false )		
})

test('Get value from Setting - role', async () => {	
	expect(Utils.getSetting('CAN_SHARE_CONTENT', 'lektor' ))
	.toBe( true )		
})

test('no value in SettingProfile', async () => {		
	try {
    	expect(Utils.getSetting('abcde' ))
  	} catch (error) {  		
    	expect(error.toString()).toBe('Error: No default value for key: abcde');
  	}		
})

test('Get value from Constant', async () => {	
	expect(Utils.getConstant('ID_PREFIX_FOR_VIDEO_ELEMENT' ))
	.toBe( Constant.ID_PREFIX_FOR_VIDEO_ELEMENT )		
})

test('no value in Constant', async () => {		
	try {
    	expect(Utils.getConstant('abcde' ))
  	} catch (error) {  		
    	expect(error.toString()).toBe('Error: No value for constant: abcde');
  	}		
})

test('Create space wrapper for video element', async () => {		
	
	let id = "testa-wrapper-id"
	let isPresenterTile = false

	let wrapper = Utils.createSpaceWrapper(id, isPresenterTile)
	
	expect( wrapper.id ).toBe( id )
	expect( wrapper.classList.contains("col-md-3") ).toBe(true)
	
	
	isPresenterTile = true
	
	wrapper = Utils.createSpaceWrapper(id, isPresenterTile)	
	expect( wrapper.classList.contains("col") ).toBe(true)		
})

test('Create responsive wrapper for video element', async () => {			
	let wrapper = Utils.createResponsiveWrapper()		
	expect( wrapper.classList.contains("embed-responsive") ).toBe(true)	
})

test('Create video element', async () => {		
	
	let videoElement = Utils.createVideoElement()
	expect( videoElement.nodeName ).toBe("VIDEO")
	expect( videoElement.classList.contains("w-100") ).toBe(true)
	expect( videoElement.classList.contains("h-100") ).toBe(true)			
})