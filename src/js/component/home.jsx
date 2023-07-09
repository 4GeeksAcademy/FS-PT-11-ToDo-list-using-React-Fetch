import React, { useEffect, useState, useCallback } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/AdrianoMax", {
      method: "GET",
      // body: JSON.stringify("{'label':'You','done': false}"),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const newTodo = { label: inputValue, done: false };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue("");
    }
  };

  const handleUpdate = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/AdrianoMax", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        fetchTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClearTasks = () => {
    const emptyTask = { label: "Empty task", done: false };
    const emptyTasks = [emptyTask];

    fetch("https://assets.breatheco.de/apis/fake/todos/user/AdrianoMax", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emptyTasks),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Tasks cleared:", data);
        setTodos([]);
      })
      .then(() => {
        fetchTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="box">
      <h2>This is the Todo List from the API</h2>
      <ul className="form">
        <li>
          <input
            type="text"
            placeholder="Add new task"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </li>
        {todos.map((item, index) => (
          <li key={index}>
            {item.label}
            {""}
            <i
              onClick={() =>
                setTodos(
                  todos.filter((_, currentIndex) => index !== currentIndex)
                )
              }
            >
              <span>X</span>
            </i>
          </li>
        ))}
      </ul>
      <div>
        <button className="btn" onClick={handleClearTasks}>
          Clear all tasks local
        </button>
        <button className="btn" onClick={handleUpdate}>
          Update to API
        </button>
        <button className="btn" onClick={fetchTodos}>
          Fetch data from API
        </button>
      </div>
    </div>
  );
};

export default Home;
