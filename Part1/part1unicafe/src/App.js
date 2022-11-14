import { useState } from 'react'

const Title = (props) => (
  <div>
    <h1>{props.title}</h1>
  </div>
)

const Statistics = (props) => {
  return(
    <div>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{props.good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{props.neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{props.bad}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>;

const App = () => {
  const feedback = "give feedback";
  const statistics = "statisctics";
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Title title={feedback} />
      <Button handleClick={() => setGood(good +1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Title title={statistics} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App