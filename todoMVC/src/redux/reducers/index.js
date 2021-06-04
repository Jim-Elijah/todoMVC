import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import toggle from './toggle';

const todoApp = combineReducers({
  toggle,
  todos,
  visibilityFilter
})

export default todoApp