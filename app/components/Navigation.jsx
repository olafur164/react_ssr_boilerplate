import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router'
import { connect } from 'react-redux'
import { logOut } from '../actions/users'

import Register from './Register'
import Login from './Login'

/*
class Navigation extends Component {
  render () {
    const { user, logOut } = this.props
    return (
      <div>
        { user.authenticated ? (
          <div>
            <p>Logged In</p>
            <Link onClick={logOut} to="/">Logout</Link>
          </div>
        ) : (
          <div>
            <p>Logged Out</p>
            <Register />
          </div>
        )}
      </div>
    )
  }
}
*/
const Navigation = ({ user, logOut }) => {
    return (
      <div>
        { user.authenticated ? (
          <div>
            <p>Logged In</p>
            <Link onClick={logOut} to="/">Logout</Link>
          </div>
        ) : (
          <div>
            <p>Logged Out</p>
            <Register />
          </div>
        )}
      </div>
    )
}

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { logOut })(Navigation)