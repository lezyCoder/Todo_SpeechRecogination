import { useState, useEffect } from 'react'
import { FaMicrophone } from "react-icons/fa";

const Todo = () => {

    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);

    // Load todos from localStorage when component mounts
    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos)); // Convert string back to array
        }
    }, []); // Empty array = runs once on mount

    // Save todos to localStorage whenever todos changes
    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos)); // Convert array to string
        }
    }, [todos]); // Runs every time todos changes

    const handleSubmit = (e) => {
        e.preventDefault();

        if (todo.trim() === "") return;

        if (editingIndex !== null) {
            const updatedTodos = todos.map((task, index) =>
                index === editingIndex ? todo : task
            );
            setTodos(updatedTodos);
            setEditingIndex(null);
        } else {
            setTodos((prev) => [...prev, todo]);
        }

        setTodo("");
    }

    const handleDelete = (indexToDelete) => {
        const filteredTodos = todos.filter((task, index) => index !== indexToDelete);
        setTodos(filteredTodos);

        // Update localStorage after deletion
        if (filteredTodos.length === 0) {
            localStorage.removeItem("todos"); // Clear if no todos left
        }
    }

    const handleEdit = (indexToEdit) => {
        const taskToEdit = todos[indexToEdit]; // also can be done using array find method 
        // const taskToEdit = todos.find((task, index) => index == indexToEdit)
        setTodo(taskToEdit);
        setEditingIndex(indexToEdit);
    }
    return (
        <div className="todo-Container w-1/2 flex flex-col px-4 pt-10 justify-center overflow-auto" >
            <form onSubmit={handleSubmit} className='w-full p-2 relative flex gap-4'>
                <input
                    type="text"
                    placeholder='Enter task'
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    className='border border-white rounded  text-white p-2 w-2/3 outline-none'
                />
                <div className='btns flex gap-3'>
                    <button type="submit" className='outline-none  cursor-pointer rounded p-1 ml-4 bg-green-800 hover:scale-[0.9] ease-in-out'>
                        {editingIndex !== null ? "Update " : "Add Task"}
                    </button>

                    <button
                        type="button"
                        className=' outline-none rounded bg-red-800 p-2 ml-2 hover:scale-[0.9] ease-in-out cursor-pointer'
                        onClick={() => {
                            setTodo("");
                            setEditingIndex(null);
                        }}
                    >
                        Cancel
                    </button>
                </div>



                <button type="submit" className='p-2 ml-4 absolute left-84 top-3 opacity-35 '>
                    <FaMicrophone className='font-semibold text-lg text-zinc-100' />
                </button>
            </form>
            <ul className='w-full  p-2 '  >
                {todos.length === 0 ? (
                    <p className='text-white text-center'>No tasks yet. Add one !</p>
                ) : (
                    todos.map((task, index) => (
                        <div
                            className={`flex justify-between items-center p-4 mb-2 ${editingIndex === index ? 'bg-blue-900' : 'bg-gray-800'
                                }`}
                            key={index}
                        >
                            <li className='text-white'>{task}</li>
                            <div className='btns gap-2 flex'>
                                <button
                                    type="button"
                                    className='border border-green-300 p-2 rounded'
                                    onClick={() => handleEdit(index)}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className='border border-red-300 p-2 rounded'
                                    onClick={() => handleDelete(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </ul>
        </div>
    )
}

export default Todo