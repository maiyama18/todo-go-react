import todosReducer from './modules/todos'
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  todos: todosReducer,
})

const store = createStore(rootReducer)

export default store