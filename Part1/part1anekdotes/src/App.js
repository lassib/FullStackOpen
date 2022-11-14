import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votesArray, setVoteCount] = useState(new Uint8Array(7));
  const [mostVoted, setMostVoted] = useState(0);

  const setVotes = () => {
    const copy = { ...votesArray };
    copy[selected] += 1;
    setVoteCount(copy);

    if (copy[selected] > votesArray[mostVoted]) {
      setMostVoted(selected);
    }
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const handleNext = () => {
    let nextIndex = getRandomInt(anecdotes.length);
    while (nextIndex === selected) {
      nextIndex = getRandomInt(anecdotes.length);
    }
    setSelected(nextIndex);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votesArray[selected]} votes</p>
      <button onClick={handleNext}>Next anecdote</button>
      <button onClick={setVotes}>Vote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoted]}</p>
      <p>has {votesArray[mostVoted]} votes</p>
    </div>
  );
};

export default App;
