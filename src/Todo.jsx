import { useState, useEffect } from 'react'
import { FaMicrophone } from "react-icons/fa";
import DriverConfigue from './DriverConfigue.jsx'

const Todo = () => {

    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isMarked, setMarked] = useState(false);

    // Load todos from localStorage when component mounts
    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos)); // Convert string back to array
        }

        // Driver Js - started on the load
        DriverConfigue.drive();
    }, []); // Empty array = runs once on mount

    // Save todos to localStorage whenever todos changes
    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos)); // Convert array to string
        }
    }, [todos]); // Runs every time todos changes


    // Creating the task 
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

    // Deleting the task 
    const handleDelete = (indexToDelete) => {
        const filteredTodos = todos.filter((task, index) => index !== indexToDelete);
        setTodos(filteredTodos);

        // Update localStorage after deletion
        if (filteredTodos.length === 0) {
            localStorage.removeItem("todos"); // Clear if no todos left
        }
    }

    // Updating the task 
    const handleEdit = (indexToEdit) => {
        const taskToEdit = todos[indexToEdit]; // also can be done using array find method 
        // const taskToEdit = todos.find((task, index) => index == indexToEdit)
        setTodo(taskToEdit);
        setEditingIndex(indexToEdit);
    }

    // Handling the updated task
    const handleCompletedTask = (e) => {
        const todoItem = e.target.closest(".todo-item");
        if (!todoItem) return;
        todoItem.classList.toggle("completed", e.target.checked);
    }
    //  Speech handling (Speech to text )
    const handleSpeech = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech Recognition is not supported in your browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            setTodo(spokenText); // Fill the input with spoken text
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };
    };

    return (
        <div className="todo-Container w-1/2 flex flex-col px-4 justify-center overflow-auto" >
            <form onSubmit={handleSubmit} className="w-full p-2 flex gap-4 relative">

                <div className="relative w-2/3">
                    <input
                        type="text"
                        placeholder="Enter task"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        className="border border-white rounded text-white p-2 w-full pr-12 outline-none"
                    />

                    {/* Mic button inside input */}
                    <button
                        type="button"
                        onClick={handleSpeech}
                        className="mic-button absolute right-0 top-0 h-full px-3 flex items-center justify-center 
                 border-l border-white bg-transparent cursor-pointer"
                    >
                        <FaMicrophone className="text-zinc-100 opacity-80" />
                    </button>
                </div>

                <div className="btns flex gap-3">
                    <button
                        type="submit"
                        className="outline-none cursor-pointer rounded p-2 w-20 ml-4 bg-green-800 
                 hover:scale-[0.9] ease-in-out"
                    >
                        {editingIndex !== null ? "Update" : "Add Task"}
                    </button>

                    <button
                        type="button"
                        className="outline-none rounded bg-red-800 p-2 w-20 hover:scale-[0.9] ease-in-out cursor-pointer"
                        onClick={() => {
                            setTodo("");
                            setEditingIndex(null);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>

            <ul className='w-full  p-2 '  >
                {
                    todos.map((task, index) => (
                        <div
                            className={`todo-item flex justify-between items-center p-4 mb-2 ${editingIndex === index ? 'bg-blue-900' : 'bg-gray-800'
                                }`}
                            key={index}
                        >
                            <li className='text-white'>{task}</li>
                            <div className='btns gap-2 flex'>
                                <input type="checkbox" className='w-10 outline-none' onClick={() => handleCompletedTask(e)} />
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
                }
            </ul>
        </div>
    )
}

export default Todo