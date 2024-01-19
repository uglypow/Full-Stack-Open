import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
);

const Statistics = (props) => {
  if (props.all == 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={props.good} />
        <StatisticLine text={"neutral"} value={props.neutral} />
        <StatisticLine text={"bad"} value={props.bad} />
        <StatisticLine text={"all"} value={props.all} />
        <StatisticLine text={"average"} value={props.average} />
        <StatisticLine text={"positive"} value={props.positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const findAll = () => {
    return good + neutral + bad
  }

  const findAverage = () => {
    return (good - bad) / (findAll())
  }

  const findPositive = () => {
    const positive = (good / findAll()) * 100
    return positive.toString() + " %"
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={() => setGood(good + 1)} text={"good"} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button handleClick={() => setBad(bad + 1)} text={"bad"} />

      <h1>statistics</h1>
      
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={findAll()}
        average={findAverage()}
        positive={findPositive()}
      />
      
    </div>
  )
}

export default App