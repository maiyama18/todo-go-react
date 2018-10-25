import React from 'react'
import { filters } from '../constants';

const TodoFilter = ({ currentFilter, handleChangeFilter }) => {
  return (
    <div>
      {filters.map(filter => (
        <a 
          style={{ marginRight: '0.5rem', color: (filter === currentFilter) ? 'red' : 'blue' }}
          key={filter}
          onClick={() => handleChangeFilter(filter)}
        >
          {filter}
        </a>
      ))}
    </div>
  )
}

export default TodoFilter