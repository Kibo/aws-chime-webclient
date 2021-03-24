import { createApp } from 'vue'
import App from './modules/App.vue'
import Store from './modules/store/Store.js'
import * as Constant from './modules/constants/Constants.js';

// there is 'data-meeting' attribute in App root element
// @see server.js
const LOCAL_SERVER_MEETING_ID = document.querySelector(`#${Constant.ID_APP}`).dataset.meeting

const app = createApp(App, { meeting: LOCAL_SERVER_MEETING_ID });
app.use(Store)
const vm = app.mount(`#${Constant.ID_APP}`)