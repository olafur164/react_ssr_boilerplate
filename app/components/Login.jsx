import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import { manualLogin, toggleLoginMode } from '../actions/users';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }
  handleOnSubmit = (e) => {
    e.preventDefault()
    const { manualLogin } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    manualLogin({ email, password });
  }
  componentDidMount() {
    const { authenticated } = this.props.user
    const { dispatch } = this.props
    const isAuthenticated = authenticated
    if (isAuthenticated) {
      this.setState({redirect: true});
    }
  }
  render () {
    const { isWaiting, message, isLogin, authenticated } = this.props.user;
    const isAuthenticated = authenticated
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/'/>;
    }
    return (
      <div>
      { !isAuthenticated && (
        <form onSubmit={this.handleOnSubmit}>
          <input
            type="email"
            ref="email"
            placeholder="email"
          />
          <input
            type="password"
            ref="password"
            placeholder="password"
          />
          <p>sdf{message}</p>
          <input
            type="submit"
            value={isLogin ? 'Login' : 'Register'} />
        </form>
      )
      }
      </div>
    )
  }
}

Login.propTypes = {
  user: PropTypes.object,
  manualLogin: PropTypes.func.isRequired,
  toggleLoginMode: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { manualLogin, toggleLoginMode  })(Login)