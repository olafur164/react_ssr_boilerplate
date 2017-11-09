import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navbar, Button } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
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
  const isAuthenticated = user.authenticated
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light" role="navigation">
        <NavLink className="navbar-brand" to="/">ssr_login</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {
              !isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              )
            }
            {
              !isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/Register">Register</Link>
                </li>
              )
            }
            {
              isAuthenticated && (
                <li className="nav-item">
                  <Link onClick={logOut} className="nav-link" to="/">Logout</Link>
                </li>
              )
            }
          </ul>
        </div>
      </nav>
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