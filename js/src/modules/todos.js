import { filters } from '../constants';

const initialState = {
  fetching: false,
  toggling: [],
  todos: [],
  currentFilter: filters[0],
}

const REQUEST = 'REQUEST'
const REQUEST_FINISHED = 'REQUEST_FINISHED'
const SET_TODOS = 'SET_TODOS'
const ADD_TODO = 'ADD_TODO'
const TOGGLE = 'TOGGLE'
const TOGGLE_FINISHED = 'TOGGLE_FINISHED'
const UPDATE_TODO = 'UPDATE_TODO'
const CHANGE_FILTER = 'CHANGE_FILTER'

export const request = () => ({
  type: REQUEST,
})
export const requestFinished = () => ({
  type: REQUEST_FINISHED,
})
export const setTodos = todos => ({
  type: SET_TODOS,
  todos,
})
export const addTodo = todo => ({
  type: ADD_TODO,
  todo,
})
export const toggle = id => ({
  type: TOGGLE,
  id,
})
export const toggleFinished = id => ({
  type: TOGGLE_FINISHED,
  id,
})
export const updateTodo = todo => ({
  type: UPDATE_TODO,
  todo,
})
export const changeFilter = filter => ({
  type: CHANGE_FILTER,
  filter,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        fetching: true,
      }
    case REQUEST_FINISHED:
      return {
        ...state,
        fetching: false,
      }
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      }
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo],
      }
    case TOGGLE:
      return {
        ...state,
        toggling: [...state.toggling, action.id],
      }
    case TOGGLE_FINISHED:
      return {
        ...state,
        toggling: state.toggling.filter(id => id !== action.id),
      }
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(t => t.id === action.todo.id ? action.todo : t)
      }
    case CHANGE_FILTER:
      return {
        ...state,
        currentFilter: action.filter
      }
    default:
      return state
  }
}