
import './App.css';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { ListPersons } from './components/ListPersons'
import contactService from './services/contactPerson';
import { Notification } from './components/Notification';


function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  /*useEffect */
  //The initial values are now fetched from the server, using json-server. That is why useEffect is implemented.
  useEffect(() => {
    contactService.getAll()
      .then(dataPersons => {
        console.log("effect");
        setPersons(dataPersons);
      })
  }, [])


  /*Handlers*/
  const handleInputName = function (e) {
    setNewName(e.target.value);
  }

  const handleInputNumber = function (e) {
    setNewNumber(e.target.value);
  }

  const handleFilter = function (e) {
    setFilterName(e.target.value);
  }
  //Delete contact
  function deleteContact(id, contact) {

    //This alert confirms whether you really want to delete a contact or not. In case the user indicates that they want to delete the contact, the filter is made that returns a new list and is set in the main array, it is saved in the setPersons state.
    Swal.fire({
      title: `Are you sure to delete ${contact} from your contacts?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        contactService.deleteContact(id)
          .then(response => {
            if (response.status === 204) {
              const newListContact = persons.filter(person => {
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
    })

  }

  //Constant that captures the value of the input and transforms it into a regular expression. By adding the "i" as a second parameter, we remove the sensitive case.
  const expressionFilter = new RegExp(filterName, "i");

  //In this case we fix the filter so that it does not return undefined. If the filter name does not match the user in the database return "false".
  const filterList = persons.filter((person) => {
    if (typeof person.name === "string") {
      const nameNormalize = person.name.toLowerCase();
      return expressionFilter.test(nameNormalize);
    }
    return false;
  });

  //In our submit function, we have two operations, save a new contact and update an existing contact.

  const handleSubmit = function (e) {
    e.preventDefault()

    const searchContact = persons?.find(person => {
      const nameNormalize = person.name.toLowerCase();
      return nameNormalize === newName.toLowerCase();
    })
    if (searchContact === undefined) {
      const contactPerson = {
        name: newName,
        number: newNumber,
      }
      contactService.create(contactPerson)
        .then(contactCreated => {
          if(contactCreated.error === undefined){
            setPersons([...persons, contactCreated])
            setNewName("");
            setNewNumber("");
            Swal.fire({
              icon: 'success',
              title: `Your contact ${newName} has been saved successfully`
            })
            setNotification(
              `✅Added ${newName}`
            )
            setTimeout(()=>{
              setNotification(null);
            }, 5000)
          }else{
            setErrorMessage(
              `🚨 ${contactCreated.error}`
            )
            setTimeout(()=>{
              setErrorMessage(null);
            }, 5000)
          }
          
        })
        
    }else{

      Swal.fire({
        title: `${newName} is already added to phonebook, replace the old number with a new one?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      }).then((result)=>{
        if(result.isConfirmed){
        //If we confirm the alert action, the service is called and the old number is replaced with the new one.
          const changeContact = {...searchContact, number: newNumber}
          contactService.update(searchContact.id, changeContact)
          .then(contactUpdate =>{
            //Then we render the change on the screen with the map, we indicate by comparing the id that we changed with the rest of the contact list, if it is different, return the contact from the initial list and if not, return the contact that we have updated "contactUpdate".
            setPersons(persons.map(person => person.id !== searchContact.id?person: contactUpdate));
            setNotification(
              `🪄${newName} has been correctly updated...`
          )
          setTimeout(()=>{
            setNotification(null);
          }, 5000)
          }).catch(error=>{
            setErrorMessage(
                `Information of ${newName} has already been removed from server 😵‍💫`
            )
            setTimeout(()=>{
              setErrorMessage(null);
            }, 5000)
          })
        }

      })
    }
      setNewName("");
      setNewNumber("");
  }




  //Constant that will return the rendering type based on whether or not the contact list is filtered.
  const contactsToShow = filterList.length === 0 ? persons : filterList;


  return (
    <div className="App bg-primary-subtle">
      <div className='container'>
        <h1 className='text-start'>Phonebook📘</h1>
        <Notification message={notification} className="alert alert-success"/>
        <Notification message={errorMessage} className="alert alert-danger"/>
        <Filter handleFilter={handleFilter} filterName={filterName} />
        <h2 className='text-start'>Add a new contact✍🏾</h2>
        <PersonForm handleSubmit={handleSubmit}
          newName={newName}
          handleInputName={handleInputName}
          newNumber={newNumber}
          handleInputNumber={handleInputNumber}
        />
        <h2 className='mt-4 text-start'>Numbers📞</h2>
        <ListPersons contactsToShow={contactsToShow} deleteContact={deleteContact} />
      </div>
    </div>
  );
}

export default App;
