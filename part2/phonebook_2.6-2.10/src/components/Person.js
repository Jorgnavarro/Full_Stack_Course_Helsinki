

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