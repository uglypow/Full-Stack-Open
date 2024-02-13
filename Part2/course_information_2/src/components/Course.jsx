
const Header = ({ course }) => <h2>{course.name}</h2>
const Content = ({ parts }) =>
    <>
        {parts.map(part =>
            <p key={part.id}>
                {part.name} {part.exercises}
            </p>)}
    </>

const Total = ({ sum }) => <p><b>Total of {sum} exercises</b></p>

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

export default Course