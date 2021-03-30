import { mount, shallowMount } from '@vue/test-utils'
import LoginForm from "../src/modules/login/LoginForm.vue"
import * as Constant from '../src/modules/constants/Constants.js';

test('Display login form', () => {
	const wrapper = mount( LoginForm )
	
	
	const inputName = wrapper.get('input[name="name"]')
	expect(inputName.exists()).toBe(true)
	
	const inputPin = wrapper.get('input[name="pin"]')
	expect(inputPin.exists()).toBe(true)
	
	const buttonSubmit = wrapper.get('button[type="submit"]')
	expect(buttonSubmit.exists()).toBe(true)		
})


test('Change status', async () => {
	const wrapper = mount(LoginForm)
	await wrapper.setData({ isWorking: true })
		
	expect(wrapper.find('button[type="submit"]').exists()).toBe(false)	
			
	expect(wrapper.find('.card-body').text()).toBe('Loading ...')	
})


test('Endpoint URL', async () => {
	const wrapper = mount(LoginForm)
	const data = {name:'tom', pin:"1234", meeting:'abcdefg'}
	expect(  wrapper.vm.getURL( data )  )
	.toBe(`${Constant.CRENDTIALS_TO_MEETING_URL}${data.meeting}/${data.pin}/${data.name}`)
})

test('Bad credentials: missing MeetingId', async () => {
	const wrapper = mount(LoginForm)
	const response = {status:200, data:{meeting:{}, attendee:{}}}
		
	try {
    	wrapper.vm.serverResponse( response )
  	} catch (error) {  		
    	expect(error.toString()).toBe('Error: There is not MeetingId.');
  	}	
})

test('Bad credentials: missing AttendeeId', async () => {
	const wrapper = mount(LoginForm)
	const response = {status:200, data:{meeting:{MeetingId:123}, attendee:{}}}
		
	try {
    	wrapper.vm.serverResponse( response )
  	} catch (error) {  		
    	expect(error.toString()).toBe('Error: There is not AttendeeId.');
  	}	
})

test('Emit credentials', async () => {
	const wrapper = mount(LoginForm)
	const response = {status:200, data:{meeting:{MeetingId:123}, attendee:{AttendeeId:456}}}
	wrapper.vm.serverResponse( response )
	
	expect(wrapper.emitted().credentials[0][0]).toEqual(response.data)
})
