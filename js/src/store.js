import todosReducer from './modules/todos'
import todoFormReducer from './modules/todoForm'
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  todos: todosReducer,
  todoForm: todoFormReducer,
})

const store = createStore(rootReducer)

export default store