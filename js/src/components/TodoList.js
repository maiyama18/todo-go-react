import React, { Component } from 'react'
import { connect } from 'react-redux'
import { request, setTodos, requestFinished, toggle, toggleFinished, updateTodo } from '../modules/todos'
import axios from 'axios';

class TodoList extends Component {
  componentDidMount() {
    this.props.fetchTodos()
  }

  render() {
    const { fetching, toggling, todos } = this.props
    const { handleToggleTodo } = this.props

    return (
      <div>
        {
          fetching
            ? <p>Now Loading...</p>
            : (<ul>
              {todos.map(todo => (
                <li key={todo.id}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                    disabled={toggling.indexOf(todo.id) >= 0}
                  />
                  {todo.title}
                </li>
              ))}
            </ul>)
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { toggling, fetching, todos } = state.todos

  return {
    fetching,
    toggling,
    todos,
  }
}

const mapDispatchToProps = dispatch => {
  const fetchTodos = async () => {
    dispatch(request())
    try {
      const res = await axios.get(`/todos`)
      dispatch(setTodos(res.data))
    } catch (err) {
      console.error(err)
    }
    dispatch(requestFinished())
  }

  const handleToggleTodo = async (id) => {
    dispatch(toggle(id))
    try {
      const res = await axios.put(`/todos/${id}`)
      dispatch(updateTodo(res.data))
    } catch (err) {
      console.error(err)
    }
    dispatch(toggleFinished(id))
  }

  return {
    fetchTodos,
    handleToggleTodo,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)