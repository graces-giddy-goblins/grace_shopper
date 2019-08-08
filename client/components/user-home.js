import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  const bannerImage =
    'https://user-images.githubusercontent.com/34967988/62590163-7a20fc80-b899-11e9-9c82-859bedfaaf54.png'
  return (
    <div>
      <div className="jumbotron">
        <h1 className="display-4">GRACE'S GIDDY GOBLINS </h1>
        <p className="lead">Welcome, {email}</p>

        <Link className="btn btn-primary btn-lg" to="/items">
          SHOP
        </Link>
      </div>
      <div>
        <img className="img-fluid" src={bannerImage} />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
