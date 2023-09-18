import './App.css';
import { useState } from "react";
import { StatisticsLine } from './Statistics';
import { Button } from './Button';



function App() {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0)


  const handleGoodClick = () =>{
    setGood(good + 1)
  }
  const handleNeutralClick = () =>{
    setNeutral(neutral + 1)
  }
  const handleBadClick = () =>{
    setBad(bad + 1)
    badPuntuation()
  }



  //We create a new state for the bad puntuation
  const[badPun, setBadPun] = useState(0)
  //The puntuation always need be 0 in neutral, that's why we don't need update the state
  const neutralPun = 0;

  //Config the behavior for update the state
  const badPuntuation = () =>{
      setBadPun(badPun - 1)
      console.log(badPun);
  }
  //statistics
  const allComents = good + bad + neutral;
  const average =  (good + neutralPun + badPun)/allComents
  const positiveComents = (good*100)/allComents
  //table and statistics initial message 
  let table = document.querySelector("table")
  let initialMessage = document.getElementById("initial-message");
  if(allComents > 0){
    table.classList.remove("hidden-element")
    initialMessage.classList.remove("show-element");
    initialMessage.classList.add("hidden-element");
  }
  

  return (
    <div className="App container">
      <h1>UNICAFE</h1>
      <h3>Give feedback</h3>
      <div className="btn-group" role="group" aria-label="Basic mixed styles example">
          <Button text="Bad" className="btn btn-danger btn-lg" handleClick={handleBadClick}/>
          <Button text="Neutral" className="btn btn-warning btn-lg" handleClick={handleNeutralClick}/>
          <Button text="Good" className="btn btn-success btn-lg" handleClick={handleGoodClick}/>
      </div>
      <h3 className='m-3'>Statistics</h3>
      <h4 id='initial-message' className='show-element'>No feedback given</h4>
      <div className="container">
            <table className="table table-bordered hidden-element">
            <StatisticsLine text="Good" value={good}/>
                  <StatisticsLine text="Neutral" value={neutral}/>
                  <StatisticsLine text="Bad" value={bad}/>
                  <StatisticsLine text="All coments" value={allComents}/>
                  <StatisticsLine text="Average" value={average}/>
                  <StatisticsLine text="Percentage positive comments" value={positiveComents}/>
            </table>
      </div>
    </div>
  );
}

export default App;
