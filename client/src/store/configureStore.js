import { applyMiddleware, compose, createStore } from "redux";
import task from "../reducers/task";
import thunk from 'redux-thunk'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(task, composeEnhancers(applyMiddleware(thunk)))

export default store