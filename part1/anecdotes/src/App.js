
import './App.css';
import { useState } from 'react';

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  //state safe random number
  const [selected, setSelected] = useState(0)
  //state contain votation clicks
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  
  const handleClick = () =>{
    let randomNumber = Math.floor(Math.random()*anecdotes.length);
    setSelected(randomNumber);
  }

  const handleVote = ()=>{
      const newVotes = [...votes];
      newVotes[selected] +=1
      setVotes(newVotes);
      
  }
  //Most quote votes setting
  const quoteMoreVoted = Math.max(...votes)
  const indexQuote = votes.indexOf(quoteMoreVoted);

  //inicial render without any votation
  const initialPuntuation = [...votes]
  const sumaPuntuation = initialPuntuation.reduce((acumulator, actualValue)=>{
      return acumulator + actualValue;
  })
  return (
    <div className="App container">
        <h3>Random anecdotes</h3>
        <p>{anecdotes[selected]}</p>
        <p>Has: {votes[selected]} votes</p>
        <div className='container-btns'>
          <button type="button" className="btn btn-outline-primary m-2" onClick={handleVote}>Vote</button>
          <button type="button" className="btn btn-outline-success" onClick={handleClick}>Next anecdote</button>
        </div>
        <h3>Anecdote whit most votes</h3>
        {
        sumaPuntuation===0?<p>You haven't voted for any quotes yet!</p>:<>
        <p>{anecdotes[indexQuote]}</p>
        <p>Has: {quoteMoreVoted} votes</p>
        </>
        }
    </div>
  );
}

export default App;
