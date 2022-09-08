import React, { useRef, useState, useEffect } from "react";

import { AiOutlinePlus } from "react-icons/ai";

import { ToastContainer, toast } from "react-toastify";


// Import Components
import List from "./List";


const toastOptions = {
  theme: "colored",
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
};

const useLocalStorage = () => {
  let todoList = localStorage.getItem("todoList");
  if (todoList) {
    return JSON.parse(localStorage.getItem("todoList"));
  } else return [];
};

function App() {
  const [show, setShow] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedID, setEditedID] = useState("");

  const inputEl = useRef(null);
  const [todoList, setTodoList] = useState(useLocalStorage());
  const [todo, setTodo] = useState({ id: "", item: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.item) {
      toast.info("No Todo added", { ...toastOptions });
    } else if (todo.item && isEditing) {
      setTodoList(
        todoList.map((todoItem) => {
          if (todoItem.id === editedID) {
            return { ...todoItem, item: todo.item };
          } else return todoItem;
        })
      );
      toast.success("Good Job! Todo updated.", { ...toastOptions });
    } else {
      setTodoList([...todoList, todo]);
    }
    setShow(false);
    setTodo({ id: "", item: "" });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const item = e.target.value;
    const id = Date.now() + "";
    setTodo({ ...todo, id, item });
  };

  const handleCompleted = (e) => {
    const curItem = e.target;
    if (curItem.classList.contains("completed")) return;
    else if (curItem.classList.contains("grocery-item")) {
      const editBtn = curItem.children[1].children[0];
      curItem.classList.add("completed");
      editBtn.remove();
      toast.success("Good Job! Todo completed.", { ...toastOptions });
    }
  };

  const deleteItem = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id));
    toast.success("Todo deleted successfully.", { ...toastOptions });
  };

  const editItem = (id) => {
    const curTodo = todoList.find((item) => item.id === id);
    setIsEditing(true);
    setEditedID(id);
    todo.item = curTodo.item;
    setShow(true);
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    if (show) inputEl.current.focus();
    else inputEl.current.blur();
  }, [show]);

  return (
    <main>
      <section className="section-center">
        <div className="heading">
          <h3>{todoList.length !== 0 ? "All Tasks" : "add new todo"}</h3>
          <div className="underline"></div>
        </div>
        <form
          className={`grocery-form ${show ? "show" : ""}`}
          onSubmit={handleSubmit}
        >
          <div className="form-control">
            <input
              ref={inputEl}
              type="text"
              className="grocery"
              placeholder="Enter new todo"
              value={todo.item}
              onChange={handleChange}
            />
            <button type="submit" className="submit-btn">
              submit
            </button>
          </div>
        </form>
        <List
          todoList={todoList}
          handleCompleted={handleCompleted}
          deleteItem={deleteItem}
          editItem={editItem}
        />
        {todoList.length > 0 && (
          <button
            className="clear-btn"
            onClick={() => {
              toast.success("Successfully cleared all Items.", {
                ...toastOptions,
              });

              setTodoList([]);
            }}
          >
            Clear items
          </button>
        )}

        <button
          className="add-btn"
          onClick={() => {
            setShow(true);
          }}
        >
          <AiOutlinePlus />
        </button>
        <ToastContainer />
      </section>
    </main>
  );
}

export default App;
