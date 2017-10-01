import { Component } from 'react'
import PropTypes from 'prop-types'

class NoMatch extends Component {
  shouldComponentUpdate() {
    return false
  }

  static contextTypes = {
    router: PropTypes.shape({
      staticContext: PropTypes.object
    }).isRequired
  }

  componentWillMount() {
    if (this.context.router.staticContext)
      this.context.router.staticContext.statusCode = 404
  }

  render() {
    return 'Sorry, page not found'
  }
}

export default NoMatch
