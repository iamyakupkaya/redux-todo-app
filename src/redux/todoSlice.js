import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // if we don't use reduxjs/toolkit we must be careful aboyt state...
    // when we fill it. we should be carefull about...
    // mutable and immutable types.!

    //adding method for todos
    addTodos: (state, action) => {
      state.push(action.payload);
      return state;
    },
    //removing method for Todos
    removeTodos: (state, action) => {
      return state.filter((element) => element.id !== action.payload); //action.payload will be just a id not an object.
    },
    //updating method for todos
    updateTodos: (state, action) => {
      return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        item: action.payload.item,
                        //completed: action.payload.completed,
                    }
                }
                return todo;                
        /*return todo.id === action.payload.id
          ? {
              ...todo,
              item: action.payload.item,
              //completed: action.payload.completed,
            }
          : todo;*/
      });
    },
    //Completed method for todos
    completeTodos: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: true,
          };
        }
        return todo;
      });
    },
  },
});

export const reducerTodo = todoSlice.reducer;
export const { addTodos, removeTodos, updateTodos, completeTodos } =
  todoSlice.actions;
