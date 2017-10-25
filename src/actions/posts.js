import { RECEIVE } from '../types/posts'

function receivePosts(json) {
  return {
    type: RECEIVE,
    posts: json
  }
}

function fetchPosts() {
  return dispatch => {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
  }
}

function shouldFetchPosts(state) {
  const posts = state.posts

  if (posts.items) {
    return false
  }

  return true
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts())
    }
  }
}
