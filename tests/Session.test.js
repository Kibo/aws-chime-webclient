import { mount, shallowMount } from '@vue/test-utils'
import Session from "../src/modules/meeting/Session.vue"  
import * as Constant from '../src/modules/constants/Constants.js';
import * as SettingProfile from "../src/profiles/SETTING_PROFILE_NAME" 

test('Get HTML Video element', async () => {
	const wrapper = mount( Session )
	
	expect(wrapper.findAll('video')).toHaveLength( SettingProfile.NUMBER_OF_VIDEO_TILES )
	
	// TODO
	/*	
	for(let n = 0; n < SettingProfile.NUMBER_OF_VIDEO_TILES; n++){
		expect(wrapper.vm.getHTMLVideoElement( n ))
		.toBe( window.document.getElementById( Constant.PREFIX_FOR_ID_VIDEO_ELEMENT + n ) )			
	}
	*/
})

test('HTML Video element does not exist', async () => {
	const wrapper = mount( Session )
		
	try {
    	expect(wrapper.vm.getHTMLVideoElement( 16 ))
  	} catch (error) {  		
    	expect(error.toString()).toBe('Error: No video element is available: '+ Constant.PREFIX_FOR_ID_VIDEO_ELEMENT +'16');
  	}				
})

test('Get value from SettingProfile', async () => {
	const wrapper = mount( Session )
	
	expect(wrapper.vm.getSetting('NUMBER_OF_VIDEO_TILES' ))
	.toBe( SettingProfile.NUMBER_OF_VIDEO_TILES )		
})

test('Get value from Constant', async () => {
	const wrapper = mount( Session )
	
	expect(wrapper.vm.getConstant('PREFIX_FOR_ID_VIDEO_ELEMENT' ))
	.toBe( Constant.PREFIX_FOR_ID_VIDEO_ELEMENT )		
})
