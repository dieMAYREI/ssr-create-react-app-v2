import React, { Component } from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { persistStore } from "redux-persist";

class HydratedAppProvider extends Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    persistStore(this.props.store, {}, () => {
      this.setState({ rehydrated: true });
    });
  }

  render() {
    if (!this.state.rehydrated) {
      return <span>Loading</span>;
    }
    return <Provider store={this.props.store}>{this.props.children}</Provider>;
  }
}

HydratedAppProvider.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

export default HydratedAppProvider;
