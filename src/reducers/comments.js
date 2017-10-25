import { RECEIVE } from '../types/comments'

const initialState = {
  byPost: {}
}

export default function reducer(state = initialState, action) {
  let comments
  switch (action.type) {
    case RECEIVE:
      comments = Object.assign({}, state.byPost)
      return Object.assign({}, state, {
        byPost: Object.assign(comments, {
          [action.postid]: {
            items: action.comments
          }
        })
      })
    default:
      return state
  }
}
