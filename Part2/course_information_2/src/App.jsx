const Course = ({ course }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {course.map(course =>
        <div key={course.id}>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total sum={course.parts.reduce((s, p) => s + p.exercises, 0)} />
        </div>)}
    </>
  )
}

const Header = ({ course }) => <h1>{course.name}</h1>
const Content = ({ parts }) =>
  <>
    {parts.map(part =>
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>)}
  </>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course course={courses} />
}

export default App