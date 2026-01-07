
import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducer";
import { thunk } from "redux-thunk";

// Standard store setup for React 18 with Redux-Thunk 3.x named export
export const store = createStore(reducer, applyMiddleware(thunk));
