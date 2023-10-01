export function Persons({contactsToShow}) {

    return (
        <ul className='list_persons col-8 list-group'>
            {contactsToShow.map(person => {
                return <li key={person.id} className='col-11 list-group-item list-group-item-light' >
                    <h5>{person.name} <span className='phone'>{person.number}</span></h5>
                </li>
            })}
        </ul>
    )
}