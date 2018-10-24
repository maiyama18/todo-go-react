import React, { Component } from 'react'
import { connect } from 'react-redux'
import { request, setTodos, requestFinished } from '../modules/todos'
import axios from 'axios';

class TodoList extends Component {
  componentDidMount() {
    this.props.fetchTodos()
  }

  render() {
    return (
      <div>
        {
          this.props.fetching
            ? <p>Now Loading...</p>
            : (<ul>
              {this.props.todos.map(todo => (
                <li key={todo.id}>{todo.title}</li>
              ))}
            </ul>)
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { fetching, todos } = state.todos

  return {
    fetching,
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

  return {
    fetchTodos,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)