import { createApp } from 'vue'
import App from './modules/App.vue'
import * as Constant from './modules/Constants.js';

createApp(App).mount(`#${Constant.ID_APP}`)
