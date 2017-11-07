
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { signUp } from '../actions/users';


class Register extends Component {
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  handleOnSubmit(event) {
    event.preventDefault();
    
    const { manualLogin, signUp, user: { isLogin } } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    signUp({ email, password });
  }

  render () {
    const { isWaiting, message, isLogin } = this.props.user;
    console.log(message)
    return (
      <div>
        <h1>LogOut</h1>
        <form method="POST" action="/users">
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
          <p>msg:{message}</p>
          <input type="submit" value="register"/>
        </form>
      </div>
    )
  }
}

Register.propTypes = {
  user: PropTypes.object,
  signUp: PropTypes.func.isRequired
};


function mapStateToProps({user}) {
  return {
    user
  };
}

export default connect(mapStateToProps, { signUp })(Register)