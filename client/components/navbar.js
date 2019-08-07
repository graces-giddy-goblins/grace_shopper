import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {HashRouter, Link, Route} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1 />
    <nav>
      {isLoggedIn ? (
        <div className="navbar navbar-dark">
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="nav-bar-brand">
            GRACE'S GIDDY GOBLINS
          </Link>
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/items">SHOP</Link>
          <Link to="/cart">View Cart</Link>
        </div>
      ) : (
        <div className="navbar navbar-dark">
          {/* The navbar will show these links before you log in */}
          <Link to="/home" className="nav-bar-brand">
            GRACE'S GIDDY GOBLINS
          </Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/items">SHOP</Link>
          <Link to="/cart">View Cart</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
