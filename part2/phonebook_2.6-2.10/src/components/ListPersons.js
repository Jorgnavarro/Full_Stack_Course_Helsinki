/**
 * 
 * @param contactsToShow  receive either a filtered list or a list with all saved contacts. It depends on the conditional set in the parent.
 * @param deleteContact Function set in the parent, receives two parameters, the id to delete and the contact name.
 * @returns  A list be filtered, or with all values.
 */

import { Person } from "./Person"

export function ListPersons({contactsToShow, deleteContact}) {

    return (
        <ul className='list_persons col-8 list-group'>
            {contactsToShow.map(person => {
                return (
                        <Person key={person.id} person={person} deleteContact={deleteContact}/>
                )
            })}
        </ul>
    )
}