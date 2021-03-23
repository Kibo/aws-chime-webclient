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

	removeRole(role) {
		let
		index = this._roles.indexOf(role);
		if (index !== -1) {
			this._roles.splice(index, 1);
		}
	}
}

export default Attendee