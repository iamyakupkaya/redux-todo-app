import React, { useState } from "react";
import { connect } from "react-redux";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";
import { removeTodos, updateTodos, completeTodos } from "../redux/todoSlice";

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
    //removing method clone from original removeTodos from todoSlice.js
    removeTodo: (ID) => dispatch(removeTodos(ID)),
    //updating method clone from original updateTodos from todoSlice.js
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    completeTodo: (ID) => dispatch(completeTodos(ID)),
  };
};

const DisplayTodos = (props) => {
  console.log("DisplayTodos gelen props:", props);
  const { todos, removeTodo, updateTodo, completeTodo } = props;

  //***************** HOOKS AREA ***************** */
  const [sort, setSort] = useState("active");
  return (
    <div className="displaytodos">
      <div className="buttons">
        <motion.button
          whileHover={{
            scale: 1.2,
            transition: { type: "spring", duration: 1 },
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("active")}
        >
          Active
        </motion.button>
        <motion.button
          whileHover={{
            scale: 1.2,
            transition: { type: "spring", duration: 1 },
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("completed")}
        >
          Completed
        </motion.button>
        <motion.button
          whileHover={{
            scale: 1.2,
            transition: { type: "spring", duration: 1 },
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("all")}
        >
          All
        </motion.button>
      </div>
      <ul>
        <AnimatePresence>
          {/* for active items*/}
          {todos.length > 0 && sort === "active"
            ? todos.map((item) => {
                return (
                  item.completed === false && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={removeTodo}
                      updateTodo={updateTodo}
                      completeTodo={completeTodo}
                      todos={todos}
                    />
                  )
                );
              })
            : null}
          {/* for completed items*/}
          {todos.length > 0 && sort === "completed"
            ? todos.map((item) => {
                return (
                  item.completed === true && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={removeTodo}
                      updateTodo={updateTodo}
                      completeTodo={completeTodo}
                      todos={todos}
                    />
                  )
                );
              })
            : null}
          {/* for all items*/}
          {todos.length > 0 && sort === "all"
            ? todos.map((item) => {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo}
                    completeTodo={completeTodo}
                    todos={todos}
                  />
                );
              })
            : null}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
