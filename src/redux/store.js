import { configureStore } from "@reduxjs/toolkit";
import { reducerTodo } from "./todoSlice";

const store = configureStore({

    reducer: reducerTodo,
})

export default store;
