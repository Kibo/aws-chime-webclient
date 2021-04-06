import Utils from "../tools/Utils.js"

/*
 * Creates a new Attendee.
 * @class
 *
 * @param {String} attendeeId
 */
class Attendee {
	constructor(attendeeId) {
		this._attendeeId = attendeeId
		this._externalUserId;
		this._roles = [];
	}

	get attendeeId() {
		return this._attendeeId;
	}

	get externalUserId() {
		return this._externalUserId;
	}

	set externalUserId(externalUserId) {
		this._externalUserId = externalUserId
	}

	addRole(role) {
		this._roles.push(role)
	}

	hasRole(role) {
		return this._roles.includes(role)
	}

	isContent(){
		let tokens = this._attendeeId.split("#")
		return (tokens[1] && tokens[1] == 'content') ? true : false
	}

	removeRole(role) {
		let index = this._roles.indexOf(role);
		if (index !== -1) {
			this._roles.splice(index, 1);
		}
	}
}

class AttendeeManager{
	constructor() {
		this.attendeePresenceMap = new Map()
		this.tileMap = new Map()
	}

	/*
	 * Get the attendee with the role presenter
	 *
	 * @returns {Object | null}
	 */
	getPresenter(){
		for (let [key, value] of this.attendeePresenceMap.entries()) {
  			if(value
  				&& (typeof value.hasRole === 'function')
  				&& value.hasRole( Utils.getConstant('ROLE_NAME_PRESENTER'))){
  				return value
  			}
		}

		return null
	}

	setPresenter( attendeeId ){
		this.unsetPresenter()

		let newPresenter = this.attendeePresenceMap.get( attendeeId )
		if( newPresenter ){
			newPresenter.addRole( Utils.getConstant('ROLE_NAME_PRESENTER') )

			let tileState = this.getTileState( newPresenter.attendeeId )
			if( tileState ){
				tileState.isPresenter = true
				this.addHiddeClass( tileState )
			}
		}
	}

	unsetPresenter(){
		let currentPresenter = this.getPresenter()
		if( currentPresenter ){
			currentPresenter.removeRole( Utils.getConstant('ROLE_NAME_PRESENTER') )

			let tileState = this.getTileState( currentPresenter.attendeeId )
			if( tileState ){
				tileState.isPresenter = false
				this.removeHiddeClass( tileState )
			}
		}
	}

	/*
	*
	* @returns {TileState | null}
	*/
	getTileState( attendeeId ){
		let tileS = null
			this.tileMap.forEach(  tileState => {
				if( tileState.boundAttendeeId == attendeeId ){
					tileS = tileState
				}
			})

			return tileS
	}

	/*
	* Get Atendee
	*
	* @returns {Atendee | null}
	*/
	getAttendee( tileId ){
			let tileState = this.tileMap.get( tileId )
			if( !tileState ){
				return
			}

			return  this.attendeePresenceMap.get( tileState.boundAttendeeId )
	}

	/*
	* Add css hidde class in videotile
	*/
	addHiddeClass( tileState ){
		let id = Utils.getConstant('ID_PREFIX_FOR_VIDEO_ELEMENT') + tileState.tileId
		let element = document.getElementById(id)
		if(element){
			element.classList.add("hiddeVideoTile")
		}
	}

	/*
	* remove css hidde class in videotile
	*/
	removeHiddeClass( tileState ){
		let id = Utils.getConstant('ID_PREFIX_FOR_VIDEO_ELEMENT') + tileState.tileId
		let element = document.getElementById(id)
		if(element){
			element.classList.remove("hiddeVideoTile")
		}
	}
}

export { Attendee, AttendeeManager };
