import ModeratorSetting from "../../roles/moderator.js"
import LektorSetting from "../../roles/lektor.js"
import ListenerSetting from "../../roles/listener.js"
import BroadcasterSetting from "../../roles/broadcaster.js"
import DefaultSetting from "../../roles/default.js"

const Setting = {}
Setting['moderator'] = ModeratorSetting
Setting['lektor'] = LektorSetting
Setting['listener'] = ListenerSetting
Setting['broadcaster'] = BroadcasterSetting
Setting['default'] = DefaultSetting

export default Setting
