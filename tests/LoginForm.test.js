import { mount, shallowMount } from '@vue/test-utils'
import LoginForm from "../src/modules/login/LoginForm.vue"

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


