import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export default function (
  ComposedComponent,
  protectIfLogged,
  protectIfNotLogged
) {
  class ProtectRoute extends Component {
    componentDidMount() {
      if (this.props.isAuthenticated) {
        if (protectIfLogged) {
          this.props.history.push("/");
        }
      } else {
        if (protectIfNotLogged) {
          this.props.history.push("/login");
        }
      }
    }

    shouldComponentUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push("/");
        return true;
      } else {
        return false;
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  ProtectRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    };
  }

  return connect(mapStateToProps)(ProtectRoute);
}
