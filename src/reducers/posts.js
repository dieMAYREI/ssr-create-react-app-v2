import { REQUEST, RECEIVE } from '../types/posts'

const initialState = {
  items: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST:
      return Object.assign({}, state, {
      })
    case RECEIVE:
      return Object.assign({}, state, {
        items: action.posts
      })
    default:
      return state
  }
}
