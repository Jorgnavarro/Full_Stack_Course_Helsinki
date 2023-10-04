
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { ListCountries } from './components/ListCountries';
import { DetailCountrie } from './components/DetailCountrie';

function App() {
  const [countrieInput, setCountrieInput] = useState("");
  const [listCountries, setListCountries] = useState([]);

  /*Input value that we transform into a regular expression to match the filter. */
  const expression = new RegExp(countrieInput.toLowerCase());

  /*Api RestCountries */
  useEffect(()=>{
      console.log("effect");
      axios.get("https://restcountries.com/v3.1/all")
      .then(response =>{
          setListCountries(response.data)
      })
  }, [])


  const handleInput = (e)=>{
      setCountrieInput(e.target.value);
  }
  /*filter*/
  const filterCountries = listCountries.filter(countrie =>{
        let countrieNameNormalize = countrie.name.common.toLowerCase();
        if(expression.test(countrieNameNormalize))
        return countrie
  })
  
  
  return (
    <div className="App">
      <h1>Rest Countries 🗺️</h1>
      <div className='row g-3 align-items-center mt-2'>
        <div className="col-auto mx-2">
          <label htmlFor="find_countries" className="col-form-label">Find countries</label>
        </div>
        <div className="col-4">
          <input type="text" id="find_countries" className="form-control" onChange={(e)=>handleInput(e)}  value={countrieInput}/>
        </div>
      </div>
      {/* Nested ternary conditional.*/}
        {filterCountries.length>10?
        countrieInput.length ===0?<h5 className='mt-3'>✍🏾Please write in the filter
        <div className="spinner-grow text-ligh spinner-grow-sm mx-1" role="status">
        </div>
        </h5>:
        <h5 className='mt-3'>To many matches, specify another filter 🎯</h5>
        :filterCountries.length === 1? filterCountries.map(countrie =>{
          return <DetailCountrie countrie={countrie} key={countrie.population}/>
        }): filterCountries.map(countrie =>{
            return <ListCountries countrie={countrie} key={countrie.population}/>
        })}
    </div>
  );
}

export default App;
