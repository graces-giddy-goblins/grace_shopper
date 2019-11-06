import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const GuestHome = props => {
  const bannerImage =
    'https://user-images.githubusercontent.com/34967988/62590163-7a20fc80-b899-11e9-9c82-859bedfaaf54.png'
  return (
    <div>
      <div className="jumbotron">
        <h1 className="display-4">GRACE'S GIDDY GOBLINS</h1>
        <div className="text-primary">
          <p className="lead" className="font-weight-bold" className="h4">
            {' '}
            Welcome!
          </p>
          <br />
        </div>
        <p>
          Once upon a time there were five Goblins that used to be Travelling
          Sales Goblins but the route was too difficult to optimize. So they
          took their business online....
        </p>

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

export default connect(mapState)(GuestHome)

/**
 * PROP TYPES
 */
GuestHome.propTypes = {
  email: PropTypes.string
}
