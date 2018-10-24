const initialState = {
  fetching: false,
  todos: [],
}

const REQUEST = 'REQUEST'
const REQUEST_FINISHED = 'REQUEST_FINISHED'
const SET_TODOS = 'SET_TODOS'

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
    default:
      return state
  }
}