
import './App.css';
import { useState } from 'react';
import Swal from 'sweetalert2'
import  {Filter}  from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
/*you need to install SweetAlert2 with -----npm i sweetalert2-----  */
const initialValues = [
  {
    id: 0,
    name: "Gon Freecks",
    number: "316-052-3366"
  },
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"

  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }

]



function App() {
  const [persons, setPersons] = useState(initialValues);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");


  /*Handlers*/
  const handleInputName = function (e) {
    //Constant that returns a match if the contact is already saved.
    const search = persons.find(person => {
      return person.name.toLowerCase() === e.target.value.toLowerCase()
    })
    if (search === undefined) {
      setNewName(e.target.value);
    } else {
      Swal.fire({
        icon: "error",
        text: `${e.target.value} is already added to phonebbok`
      })
    }
  }

  const handleInputNumber = function (e) {
    setNewNumber(e.target.value);
  }

  const handleSubmit = function (e) {
    e.preventDefault()
    setPersons([...persons, {
      id: persons.length++,
      name: newName,
      number: newNumber,
    }])
    setNewName("");
    setNewNumber("");
    Swal.fire({
      icon: 'success',
      title: "Your contact has been saved successfully"
    })
  }

  const handleFilter = function (e){
    setFilterName(e.target.value);
  }
  //Constant that captures the value of the input and transforms it into a regular expression
  const expression = new RegExp(filterName);
  
  //Constant that returns an array with the filtered contacts
  const filterList = persons.filter(person =>{
    filterName.toLowerCase();
    let nameNormalize = person.name.toLowerCase();
    if(expression.test(nameNormalize))
    return person;
  })

  //Constant that will return the rendering type based on whether or not the contact list is filtered.
  const contactsToShow = filterList.length ===0? persons : filterList;


  return (
    <div className="App bg-primary-subtle">
      <div className='container'>
        <h1 className='text-start'>Phonebook</h1>
        <Filter handleFilter={handleFilter} filterName={filterName}/>
        <h2 className='text-start'>Add a new contact</h2>
        <PersonForm handleSubmit={handleSubmit} 
        newName={newName} 
        handleInputName={handleInputName} 
        newNumber={newNumber}
        handleInputNumber={handleInputNumber}
        />
        <h2 className='mt-4 text-start'>Numbers</h2>
        <Persons contactsToShow={contactsToShow}/>
      </div>
    </div>
  );
}

export default App;
