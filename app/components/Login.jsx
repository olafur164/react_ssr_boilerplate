
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { manualLogin, toggleLoginMode } from '../actions/users';


class Login extends Component {
  constructor(props) {
    super(props);
  }
  handleOnSubmit = (e) => {
    console.log("test")
    alert("test")
    e.preventDefault()
  }
  render () {
    const { isWaiting, message, isLogin } = this.props.user;
    return (
      <div>
        <h1>LogOut</h1>
        <form onSubmit={(e) => this.handleOnSubmit()}>
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
          <p>{message}</p>
          <input
            type="submit"
            value={isLogin ? 'Login' : 'Register'} />
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  user: PropTypes.object,
  manualLogin: PropTypes.func.isRequired,
  toggleLoginMode: PropTypes.func.isRequired
};


function mapStateToProps({user}) {
  return {
    user
  };
}

export default connect(mapStateToProps, { manualLogin, toggleLoginMode  })(Login);