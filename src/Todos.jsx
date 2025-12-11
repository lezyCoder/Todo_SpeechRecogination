import Todo from "./Todo"
import Timer from "./Timer"
const Todos = () => {
    return (
        <div className='w-full flex gap-2'>
            <Todo />
            <Timer />
        </div>
    )
}

export default Todos