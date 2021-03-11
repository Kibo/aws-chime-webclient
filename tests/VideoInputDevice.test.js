import { mount, shallowMount } from '@vue/test-utils'
import VideoInputDevice from "../src/modules/configure/VideoInputDevice.vue"  
import * as Constant from '../src/modules/constants/Constants.js';

test('Video preview HTML Element exists', async () => {
	const wrapper = mount(VideoInputDevice)
			
	expect( window.document.getElementById( Constant.ID_VIDEO_ELEMENT_FOR_PREVIEW ) )
	.toBeDefined()
	
	expect(  wrapper.vm.getHTMLElementForVideoPreview()  )
	.toBe( window.document.getElementById( Constant.ID_VIDEO_ELEMENT_FOR_PREVIEW ) )	
})

test('User change device - no option', async () => {
	const wrapper = mount(VideoInputDevice, {
		props: {
      		meetingSession: {audioVideo:{stopVideoPreviewForVideoInput:function(){}}}
    		}
    	}
    )
    			
	const event = {target:{value:''}}
	wrapper.vm.userChangeDevice( event )
	
	expect(wrapper.emitted().videoInputSelected[0][0]).toBeNull()		
})

test('User change device - option', async () => {
	const wrapper = mount(VideoInputDevice, {
		props: {
      		meetingSession: {audioVideo:{stopVideoPreviewForVideoInput:function(){}}}
    		}
    	}
    )
    			
	const event = {target:{value:'123'}}
	wrapper.vm.userChangeDevice( event )
	
	expect(wrapper.emitted().videoInputSelected[0][0]).toBe('123')		
})

test('Get Constant', async () => {
	const wrapper = mount(VideoInputDevice)
	    			
	expect(wrapper.vm.getConstant( 'ID_APP' ))
	.toBe( Constant.ID_APP )		
})





