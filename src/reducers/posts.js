import { RECEIVE } from '../types/posts'

const initialState = {
  items: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE:
      return Object.assign({}, state, {
        items: action.posts
      })
    default:
      return state
  }
}
