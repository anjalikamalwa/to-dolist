import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ToDolist.css";

const ToDoList = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  const initialState = {
    taskname: null,
    description: null,
  };
  const [values, setValues] = useState(initialState);

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleAddTaskClick = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/tasks/addtask`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      toast.success("Task added successfully !", {
        autoClose: 1500,
      });

      fetchData();
      setValues(initialState);
    } catch (error) {
      console.error("message sent error:", error);
    }
    setShowForm(false);
  };

  const fetchData = async () => {
    try {
      const data = await fetch(`${apiUrl}/api/tasks/`);
      if (!data.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await data.json();
      setTasks(result);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = (_id) => {
    fetch(`${apiUrl}/api/tasks/${_id}`, {
      method: "DELETE",
    }).then(() => {
      toast.success("Task Deleted !", {
        autoClose: 1000,
      });
        fetchData();
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <ToastContainer />
      <div className="container">
        <div className="to-do">
          <h1>To Do List</h1>
          <div className="btn">
            <button onClick={handleAddTaskClick} id="add-Task">
              {showForm ? "Cancel" : " + Add Task"}
            </button>
          </div>
          {showForm && (
            <form className="add-task" autoComplete="off">
              <input
                name="taskname"
                type="text"
                placeholder="Add new task"
                value={values.taskname || ""}
                onChange={handleInput}
              />
              <textarea
                name="description"
                id=""
                cols="30"
                rows="10"
                placeholder="description"
                value={values.description || ""}
                onChange={handleInput}
              ></textarea>

              <div className="btn">
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </form>
          )}
        </div>

        <div className="task-data">
          <table>
            <thead>
              <tr>
                <th>TaskName:</th>
                <th colSpan={2}>Description:</th>
              </tr>
            </thead>
            {tasks.map((data, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{data.taskname}</td>
                    <td>{data.description}</td>
                    <td id="delete" onClick={() => deleteTask(data._id)}>
                      {" "}
                      <MdDelete />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
