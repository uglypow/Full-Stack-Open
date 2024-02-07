const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

// Array
const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
}

//---Object---
// const Content = (props) => {
//   return (
//     <div>
//       <Part part={props.part1.name} exercises={props.part1.exercises}/>
//       <Part part={props.part2.name} exercises={props.part2.exercises}/>
//       <Part part={props.part3.name} exercises={props.part3.exercises}/>
//     </div>
//   )
// }

//---Array---
const Total = (props) => {
  return (
      <p>
        Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </p>
  )
}

//---Object---
// const Total = (props) => {
//   return (
//     <div>
//       <p>Number of exercises {props.part1.exercises + props.part2.exercises + props.part3.exercises}</p>
//     </div>
//   )
// }

//--- Array ---

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

//--- Object ---

// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = {
//     name: 'Fundamentals of React',
//     exercises: 10
//   }
//   const part2 = {
//     name: 'Using props to pass data',
//     exercises: 7
//   }
//   const part3 = {
//     name: 'State of a component',
//     exercises: 14
//   }


//   return (
//     <div>
//       <Header course={course} />
//       <Content part1={part1} part2={part2} part3={part3}/>
//       <Total part1={part1} part2={part2} part3={part3} />
//     </div>
//   )
// }

export default App