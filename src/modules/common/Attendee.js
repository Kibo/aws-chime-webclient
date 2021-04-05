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

/*
 * Creates an Attendee map
 */
class AttendeeMap{

	constructor() {
		this._map = new Map()
	}

	get size(){
		return this._map.size
	}

	clear(){
		this._map.clear()
	}

	delete( key ){
		return this._map.delete(key)
	}

	get( key ){
		return this._map.get(key)
	}

	set( key, value ){
		return this._map.set(key, value)
	}

	has( key ){
		return this._map.has(key)
	}

	keys(){
		return this._map.keys()
	}

	values(){
		return this._map.values()
	}

	entries(){
		return this._map.entries()
	}

	forEach(fn){
		return this._map.forEach(fn)
	}

	/*
	 * Get the Presenter from map
	 *
	 * @returns {Object | null}
	 */
	getPresenter(){
		for (let [key, value] of this._map.entries()) {
  			if(value
  				&& (typeof value.hasRole === 'function')
  				&& value.hasRole( Utils.getConstant('ROLE_NAME_PRESENTER'))){
  				return value
  			}
		}

		return null
	}

	setPresenter( key ){
		let currentPresenter = this.getPresenter()
		if( currentPresenter ){
			currentPresenter.removeRole( Utils.getConstant('ROLE_NAME_PRESENTER') )
		}

		let newPresenter = this._map.get(key)
		if( newPresenter ){
			newPresenter.addRole( Utils.getConstant('ROLE_NAME_PRESENTER') )
		}
	}

	unsetPresenter(){
		let currentPresenter = this.getPresenter()
		if( currentPresenter ){
			currentPresenter.removeRole( Utils.getConstant('ROLE_NAME_PRESENTER') )
		}
	}
}

export { Attendee, AttendeeMap };
