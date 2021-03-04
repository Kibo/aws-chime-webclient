import { mount, shallowMount } from '@vue/test-utils'
import LoginForm from "../src/modules/login/LoginForm.vue"

test('Display form', () => {
	const wrapper = mount( LoginForm )
	const header = wrapper.get('.card-header')
	expect(header.text()).toBe('Join the meeting')	
})


/*
test('sets the value', async () => {
	const wrapper = mount(LoginForm)
	const input = wrapper.find('input')
	
	await input.setValue('tom')
	expect(input.element.value).toBe('tom')
})
*/

