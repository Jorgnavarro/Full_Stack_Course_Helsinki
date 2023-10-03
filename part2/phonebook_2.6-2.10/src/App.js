
import './App.css';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import  {Filter}  from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import axios  from "axios";
/*you need to install SweetAlert2 with -----npm i sweetalert2-----  */

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  /*useEffect */
  //The initial values are now fetched from the server, using json-server. That is why useEffect is implemented.
  useEffect(()=>{
    axios.get("http://localhost:3001/persons")
    .then(response=>{
        console.log("effect");
        setPersons(response.data);
    })
  }, [])

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
        text: `${e.target.value} is already added to phonebook`
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
      title: `Your contact ${newName} has been saved successfully`
    })
  }

  const handleFilter = function (e){
    setFilterName(e.target.value);
  }
  //Delete contact
  function deleteContact(id, contact){
    
    //This alert confirms whether you really want to delete a contact or not. In case the user indicates that they want to delete the contact, the filter is made that returns a new list and is set in the main array, it is saved in the setPersons state.
    Swal.fire({
      title: `Are you sure to delete ${contact} from your contacts?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result)=>{
        if(result.isConfirmed){
          const newListContact = persons.filter(person =>{
            return person.id !== id
          })
          setPersons(newListContact);
            Swal.fire(
              'Deleted!',
              'Your contact has been deleted.',
              'success'
            )
        }
    })

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
        <Persons contactsToShow={contactsToShow} deleteContact={deleteContact}/>
      </div>
    </div>
  );
}

export default App;
