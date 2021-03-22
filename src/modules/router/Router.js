import { createRouter, createWebHistory } from "vue-router"

import LoginForm from '../login/LoginForm.vue'
import DeviceConfigurator from '../configure/DeviceConfigurator.vue'
import Session from '../meeting/Session.vue'

const routes = [
  { path: '/', component: LoginForm},
  { path: '/setting', component: DeviceConfigurator },
  { path: '/session', component: Session },
]

const Router = createRouter({  
	history: createWebHistory(),
	routes
})

export default Router