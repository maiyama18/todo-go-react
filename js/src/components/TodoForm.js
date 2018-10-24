import React from 'react'
import axios from 'axios'
import { changeText, emptyText, submit, submitFinished } from '../modules/todoForm';
import { addTodo } from '../modules/todos';
import { connect } from 'react-redux';

const TodoForm = props => {
  const { text } = props
  const { handleChangeText, handleSubmit } = props

  return (
    <form onSubmit={e => handleSubmit(e, text)}>
      <input
        type="text"
        placeholder="New Todo..."
        value={text}
        onChange={e => handleChangeText(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

const mapStateToProps = state => {
  const { text } = state.todoForm

  return {
    text,
  }
}

const mapDispatchToProps = dispatch => {
  const handleChangeText = text => dispatch(changeText(text))

  const handleSubmit = async (e, text) => {
    e.preventDefault()

    dispatch(submit())
    try {
      const res = await axios.post(`/todos`, {
        title: text,
      })
      dispatch(addTodo(res.data))
      dispatch(emptyText())
    } catch (err) {
      console.error(err)
    }
    dispatch(submitFinished())
  }

  return {
    handleChangeText,
    handleSubmit,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)