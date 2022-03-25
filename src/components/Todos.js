import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addTodos, removeTodos } from "../redux/todoSlice";
import { v4 as uuidv4 } from "uuid"; // uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

//following function transform State into Props.
// it also like a binding (map) state bindin to props
const mapStateToProps = (state) => {
  // we must pass this func to connet method's first element
  return {
    todos: state,
  };
};

//following method transform  setState methods as dispartch
//into props as dispatch.
const mapDispatchToProps = (dispatch) => {
  // we must passed this into connect methos 2nd parametre in first ().
  return {
    //addTodos came from todoSlice
    //but addTodo created here we use it in this component
    //instead of originial addTodos methos in todoSlice / reducers.
    //this addTodo method in props anymore, we can reach this method via props
    addTodo: (obj) => dispatch(addTodos(obj)),
    //removing method clone from original removeTodos from todoSlice.js
    removeTodo: (ID) => dispatch(removeTodos(ID)),
  };
};

const Todos = (props) => {
  console.log("Props:", props);

  /*
   ********************* DESTRUCTURING AREA *********************
   */
  const { todos, addTodo, removeTodo } = props; // props is a object {todos: Array(0), addTodo: ƒ}

  /*
   ********************* USING HOOKS AREA *********************
   */
  const [todo, setTodo] = useState("");

  useEffect(() => {
    // this is for initial value (todo) again and in input value will have been empty after click button
    setTodo("");
  }, [todos]); //just todos change invoked this useEffect.

  console.log("todos", todos);

  /*
   ********************* CUSTOM FUNCTIONS AREA *********************
   */

  //following method for input area
  const handleClick = (event) => {
    addTodo({
      id: uuidv4(),
      item: todo, // todo is value of input area from user
      completed: false,
    });
  };
  // following method for button of ADD
  const handleChange = (event) => {
    setTodo(event.target.value);
  };
  //following method for button of REMOVE
  const removeClick = (ID) => {
    console.log("gelen id:", ID);
    removeTodo(ID);
  };

  return (
    <div className="addTodos">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="todo-input"
        value={todo}
      />
      <button className="add-btn" onClick={(e) => handleClick(e)}>
        ADD
      </button>
      <br></br>
      <br></br>
      {todos.length > 0 ? (
        <h1>
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                {todo.item}
                <button onClick={() => removeClick(todo.id)}>DELETE</button>
              </li>
            );
          })}
        </h1>
      ) : (
        <h1 style={{ color: "red" }}>
          <hr style={{ border: "2px solid red" }} />
          THERE IS NO ENTRY TO DO
          <hr style={{ border: "2px solid red" }} />
        </h1>
      )}
    </div>
  );
};

// following method is called to connect between react store and this component
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
