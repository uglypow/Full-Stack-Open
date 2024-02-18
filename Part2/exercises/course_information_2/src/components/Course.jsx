
const Header = ({ course }) => <h2>{course.name}</h2>

const Content = ({ parts }) => <p>{parts.name} {parts.exercises}</p>

const Total = ({ sum }) => <b>Total of {sum} exercises</b>

const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            {course.parts.map(parts => <Content key={parts.id} parts={parts} />)}
            <Total sum={course.parts.reduce((s, p) => s + p.exercises, 0)} />
        </>
    )
}

export default Course