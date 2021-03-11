import { mount, shallowMount } from '@vue/test-utils'
import AudioOutputDevice from "../src/modules/configure/AudioOutputDevice.vue"  
import * as Constant from '../src/modules/constants/Constants.js';

test('User chang device - no option', async () => {
	const wrapper = mount(AudioOutputDevice, {
		props: {
      		meetingSession: {audioVideo:{stopVideoPreviewForVideoInput:function(){}}}
    		}
    	}
    )
        			
	const event = {target:{value:''}}
	wrapper.vm.userChangeDevice( event )
	
	expect(wrapper.emitted().audioOutputSelected[0][0]).toBeNull()		
})

test('User chang device - option', async () => {
	const wrapper = mount(AudioOutputDevice, {
		props: {
      		meetingSession: {audioVideo:{stopVideoPreviewForVideoInput:function(){}}}
    		}
    	}
    )
    			
	const event = {target:{value:'123'}}
	wrapper.vm.userChangeDevice( event )
	
	expect(wrapper.emitted().audioOutputSelected[0][0]).toBe('123')		
})





