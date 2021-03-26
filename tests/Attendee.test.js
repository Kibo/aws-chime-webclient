import {Attendee, AttendeeMap } from "../src/modules/common/Attendee.js"

test('Attendee roles', async () => {
	let tom = new Attendee('tom')		
	expect( tom.hasRole('lektor') ).toBe( false )
	
	tom.addRole('lektor')
	expect( tom.hasRole('lektor') ).toBe( true )
	
	tom.removeRole('lektor')
	expect( tom.hasRole('lektor') ).toBe( false )
	
	tom.addRole('lektor')
	tom.addRole('presenter')
	expect( tom.hasRole('lektor') ).toBe( true )
	expect( tom.hasRole('presenter') ).toBe( true )
})

test('Attendee IDs', async () => {
	let tom = new Attendee('tom')		
	expect( tom.attendeeId ).toBe( 'tom' )
	
	tom.externalUserId = '123#petr'	
	expect( tom.externalUserId).toBe( 'petr' )	
})

test('AttendeeMap JSMap basic operation', async () => {
	
	let tom = new Attendee('1')
	let jakub = new Attendee('2')
	let mirek = new Attendee('3')
	
	let map = new AttendeeMap()
	expect( map.size).toBe( 0 )
	
	map.set( tom.attendeeId, tom )
	map.set( jakub.attendeeId, jakub )
	map.set( mirek.attendeeId, mirek )	
	expect( map.size).toBe( 3 )
	
	map.delete( mirek.attendeeId )
	expect( map.size).toBe( 2 )
	
	expect( map.has( mirek.attendeeId ) ).toBe( false )
	expect( map.has( jakub.attendeeId ) ).toBe( true )
	
	expect( map.get( tom.attendeeId ) ).toBe( tom )
	expect( map.get( jakub.attendeeId ) ).toBe( jakub )
		
	map.clear()
	expect( map.size).toBe( 0 )
})

test('AttendeeMap presenter operation', async () => {
	let tom = new Attendee('1')
	let jakub = new Attendee('2')
	let mirek = new Attendee('3')
	
	let map = new AttendeeMap()
	
	map.set( tom.attendeeId, tom )
	map.set( jakub.attendeeId, jakub )
	map.set( mirek.attendeeId, mirek )
	
	expect( map.getPresenter()).toBeNull()
	
	expect( map.has( jakub.attendeeId ) ).toBe( true )
	map.setPresenter( jakub.attendeeId )	
	expect( map.getPresenter()).toBe( jakub )
	
	expect( map.has( tom.attendeeId ) ).toBe( true )
	map.setPresenter( tom.attendeeId )	
	expect( map.getPresenter()).toBe( tom )	
})
