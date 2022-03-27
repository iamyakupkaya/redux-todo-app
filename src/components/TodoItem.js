import React, { useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

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
    <motion.li
      initial={{
        x: "150vw",
        transition: { type: "spring", duration: 2 },
      }}
      animate={{
        x: 0,
        transition: { type: "spring", duration: 2 },
      }}
      whileHover={{
        scale: 1,
        transition: { type: "spring", duration: 1 },
      }}
      exit={{
        x: "-60vw",
        scale: [1, 0],
        transition: { duration: 2 },
        backgroundColor: "rgba(255,0,0,1)",
      }}
      key={item.id}
      className="card"
    >
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item}
        onKeyPress={(e) => handleUpdate(item.id, inputRef.current.value, e)}
      />

      <div className="btns">
        <motion.button
          whileHover={{ scale: 1.8 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "green" }}
          onClick={() => changeFocus()}
        >
          <AiFillEdit />
        </motion.button>
        {item.completed === false && (
          <motion.button
            whileHover={{ scale: 1.8 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => completeTodo(item.id)}
          >
            <IoCheckmarkDoneSharp />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.8 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "red" }}
          onClick={() => removeTodo(item.id)}
        >
          <IoClose />
        </motion.button>
      </div>
      {item.completed && <span className="completed">DONE</span>}
    </motion.li>
  );
};
export default TodoItem;
