import { mount, shallowMount } from '@vue/test-utils'
import AudioInputDevice from "../src/modules/configure/AudioInputDevice.vue"  
import * as Constant from '../src/modules/constants/Constants.js';

test('User chang device - no option', async () => {
	const wrapper = mount( AudioInputDevice, {
		props: {
      		meetingSession: {audioVideo:{stopVideoPreviewForVideoInput:function(){}}}
    		}
    	}
    )
    
	const event = {target:{value:''}}
	wrapper.vm.userChangeDevice( event )
	
	expect(wrapper.emitted().audioInputSelected[0][0]).toBeNull()		
})

test('User chang device - option', async () => {
	const wrapper = mount( AudioInputDevice, {
		props: {
      		meetingSession: {audioVideo:{stopVideoPreviewForVideoInput:function(){}}}
    		}
    	}
    )
    			
	const event = {target:{value:'123'}}
	wrapper.vm.userChangeDevice( event )
	
	expect(wrapper.emitted().audioInputSelected[0][0]).toBe('123')		
})





