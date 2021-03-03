import { shallowMount } from '@vue/test-utils'
import LoginForm from "./LoginForm.vue"

describe('LoginForm', () => {
  it('create a server url', () => {
    const wrapper = shallowMount(LoginForm, {
      data() {
        return {
          form:{
          	name:'tom',
          	pin:'1234',
          	meeting:'abcd'
          }
        }
      }
    })
    
    
      
  })
})