const initialState = {
  submitting: false,
  text: '',
}

const SUBMIT = 'SUBMIT'
const SUBMIT_FINISHED = 'SUBMIT_FINISHED'
const CHANGE_TEXT = 'CHANGE_TEXT'
const EMPTY_TEXT = 'EMPTY_TEXT'

export const submit = () => ({
  type: SUBMIT,
})
export const submitFinished = () => ({
  type: SUBMIT_FINISHED,
})
export const changeText = text => ({
  type: CHANGE_TEXT,
  text,
})
export const emptyText = () => ({
  type: EMPTY_TEXT,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT:
      return {
        ...state,
        submitting: true,
      }
    case SUBMIT_FINISHED:
      return {
        ...state,
        submitting: false,
      }
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text,
      }
    case EMPTY_TEXT:
      return {
        ...state,
        text: '',
      }
    default:
      return state
  }
}