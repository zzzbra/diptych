import React from 'react'

const  InputTodo = () => (
    <div>
         <form>
             <div className="mb-6">
                <label for="todo-input" className="text-sm font-medium text-gray-900 block mb-2">Your next todo</label>
                <input
                    type="text"
                    id="todo-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
             <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add</button>
         </form>
    </div>
);

export default InputTodo;
