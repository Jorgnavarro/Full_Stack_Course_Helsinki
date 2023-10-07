/**
 * 
 * @param person  Receives the traveling person object from App, list.
 * @param deleteContact Function set in the parent, receives two parameters, the id to delete and the contact name.
 * @returns A li element with an h5 and a button to delete the contact.
 */

export function Person ({person, deleteContact}){
        
    return(
        <li className='col-12 list-group-item list-group-item-light' >
            <div className="container_contact">
                <h5>{person.name} <span className='phone'>{person.number}</span></h5>
                <button className="btn btn-outline-danger" onClick={()=> deleteContact(person.id, person.name)}>Delete</button>
            </div>
        </li>
        )
}