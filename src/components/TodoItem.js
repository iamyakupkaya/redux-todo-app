import React, { useRef } from "react";

const TodoItem = (props) => {
  console.log("TodoItem gelen props:", props);

  const { item, removeTodo, updateTodo, completeTodo } = props;
  // item just a todo from todos array. it is a todo object
  const inputRef = useRef(true);

  //updating method for button of UPDATE
  const handleUpdate = (id, value, event) => {
    console.log("glen event.wvhich:", event.which);
    if (event.which === 13) {
      //13 number for enter. when user press enter event.which turns 13 number.
      updateTodo({ id, item: value });
      inputRef.current.disabled = true;
    }
    //updateTodo(obj);
  };

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  return (
    <li key={item.id} className="card">
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item}
        onKeyPress={(e) => handleUpdate(item.id, inputRef.current.value, e)}
      />
      <div className="btns">
        <button onClick={() => changeFocus()}>EDIT</button>
        <button onClick={() => completeTodo(item.id)}>DONE</button>
        <button onClick={() => removeTodo(item.id)}>DELETE</button>
      </div>
      {item.completed && <span className="completed">COMPLITED</span>}
    </li>
  );
};
export default TodoItem;