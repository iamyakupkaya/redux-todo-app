import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { addTodos } from "../redux/todoSlice";
import { v4 as uuidv4 } from "uuid"; // uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";

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
  };
};

const Todos = (props) => {
  console.log("Todos.js gelen props:", props);
  const { todos, addTodo } = props; // props is a object {todos: Array(0), addTodo: ƒ}

  const [todoInput, setTodoInput] = useState("");
  const refInputFocus = useRef();
  useEffect(() => {
    // this is for initial value (todo) again and in input value will have been empty after click button
    setTodoInput("");
  }, [todos]); //just todos change invoked this useEffect.

  //following method for input area
  const addTodoButton = () => {
    if (todoInput === "") {
      alert("Input is Empty");
    } else {
      addTodo({
        id: uuidv4(),
        item: todoInput, // todo is value of input area from user
        completed: false,
      });
    }
    refInputFocus.current.focus();
  };
  const toInvokeAddTodoButton = (event) => {
    //for onKeyDown we should use event.keyCode===13 :)
    if (event.which === 13) {
      addTodoButton();
    }
  };

  return (
    <div className="addTodos">
      <input
        type="text"
        onChange={(event) => setTodoInput(event.target.value)}
        className="todo-input"
        value={todoInput}
        onKeyPress={(event) => toInvokeAddTodoButton(event)}
        ref={refInputFocus}
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="add-btn"
        onClick={() => addTodoButton()}
      >
        <GoPlus />
      </motion.button>
    </div>
  );
};

// following method is called to connect between react store and this component
export default connect(mapStateToProps, mapDispatchToProps)(Todos);

/*

{todos.length > 0 ? (
        <h1>
          {todos.map((todo) => {
            return (
              
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

      */
