import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    const task = {
      id: uuidv4(),
      title: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const handleCompleteTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleRemoveTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>

      <div className="mb-4 flex">
        <input
          type="text"
          className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="px-4 bg-blue-500 text-white font-semibold rounded-r-lg border-t border-b border-r"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks to display.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-md border ${
                task.completed ? "bg-green-100" : "bg-white"
              }`}
            >
              <span
                className={`flex-grow ${
                  task.completed ? "line-through text-green-500" : ""
                }`}
              >
                {task.title}
              </span>
              <div className="flex space-x-2">
                <button
                  className={`px-2 py-1 rounded ${
                    task.completed
                      ? "bg-gray-200"
                      : "bg-green-500 hover:bg-green-700"
                  }`}
                  onClick={() => handleCompleteTask(task.id)}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  className="px-2 py-1 bg-red-500 hover:bg-red-700 rounded"
                  onClick={() => handleRemoveTask(task.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4">
        Total tasks: {tasks.length}, Completed tasks:{" "}
        {tasks.filter((task) => task.completed).length}
      </p>
    </div>
  );
};

export default TodoList;
