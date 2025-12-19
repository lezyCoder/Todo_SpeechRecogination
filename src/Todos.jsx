import Todo from "./Todo"
import Timer from "./Timer"
const Todos = () => {
    return (
        <div className='w-full flex gap-2 pt-10 max-md:flex max-md:justify-center max-md:w-full'>
            <Todo />
            <Timer />
        </div>
    )
}

export default Todos