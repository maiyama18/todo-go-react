import todosReducer from './modules/todos'
import todoFormReducer from './modules/todoForm'
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  todos: todosReducer,
  todoForm: todoFormReducer,
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store