import { React } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ todoList, handleCompleted, deleteItem, editItem }) => {
  return (
    <>
      {todoList.length > 0 && (
        <>
          <div className="grocery-container">
            <div className="grocery-list">
              {todoList.map(({ id, item }) => {
                return (
                  <article
                    key={id}
                    className="grocery-item"
                    onClick={handleCompleted}
                  >
                    <p className="title">{item}</p>
                    <div className="btn-container">
                      <button
                        className="edit-btn"
                        id="edit-btn"
                        onClick={() => editItem(id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteItem(id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default List;
