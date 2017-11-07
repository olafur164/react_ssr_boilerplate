
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import { signUp } from '../actions/users';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  handleOnSubmit(event) {
    event.preventDefault();
    
    const { manualLogin, signUp, user: { isLogin } } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    signUp({ email, password });
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
          <p>msg:{message}</p>
          <input type="submit" value="register"/>
        </form>
      )
      }
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