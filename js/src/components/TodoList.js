import React, { Component } from 'react'
import { connect } from 'react-redux'
import { request, setTodos, requestFinished, toggle, toggleFinished, updateTodo, changeFilter } from '../modules/todos'
import axios from 'axios';
import TodoFilter from './TodoFilter';

class TodoList extends Component {
  componentDidMount() {
    this.props.fetchTodos()
  }

  render() {
    const { fetching, toggling, visibleTodos, currentFilter } = this.props
    const { handleToggleTodo, handleChangeFilter } = this.props

    return (
      <div>
        <TodoFilter currentFilter={currentFilter} handleChangeFilter={handleChangeFilter} />
        {
          fetching
            ? <p>Now Loading...</p>
            : (<ul>
              {visibleTodos.map(todo => (
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
  const { toggling, fetching, todos, currentFilter } = state.todos

  let visibleTodos
  switch (currentFilter) {
    case 'All':
      visibleTodos = todos
      break
    case 'Incompleted':
      visibleTodos = todos.filter(todo => !todo.completed)
      break
    case 'Completed':
      visibleTodos = todos.filter(todo => todo.completed)
      break
  }

  return {
    fetching,
    toggling,
    visibleTodos,
    currentFilter,
  }
}

const mapDispatchToProps = dispatch => {
  const fetchTodos = async () => {
    dispatch(request())
    try {
      const res = await axios.get(`/api/todos`)
      dispatch(setTodos(res.data))
    } catch (err) {
      console.error(err)
    }
    dispatch(requestFinished())
  }

  const handleToggleTodo = async (id) => {
    dispatch(toggle(id))
    try {
      const res = await axios.put(`/api/todos/${id}`)
      dispatch(updateTodo(res.data))
    } catch (err) {
      console.error(err)
    }
    dispatch(toggleFinished(id))
  }

  const handleChangeFilter = filter => dispatch(changeFilter(filter))

  return {
    fetchTodos,
    handleToggleTodo,
    handleChangeFilter,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)