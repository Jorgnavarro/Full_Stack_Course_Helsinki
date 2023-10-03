/**
 * 
 * @param contactsToShow  receive either a filtered list or a list with all saved contacts. It depends on the conditional set in the parent.
 * @param deleteContact Function set in the parent, receives two parameters, the id to delete and the contact name.
 * @returns  A list be filtered, or with all values.
 */

export function Persons({contactsToShow, deleteContact}) {

    return (
        <ul className='list_persons col-8 list-group'>
            {contactsToShow.map(person => {
                return (
                <li key={person.id} className='col-11 list-group-item list-group-item-light' >
                    <div className="container_contact">
                        <h5>{person.name} <span className='phone'>{person.number}</span></h5>
                        <button className="btn btn-outline-danger" onClick={()=> deleteContact(person.id, person.name)}>X</button>
                    </div>
                </li>
                )
            })}
        </ul>
    )
}