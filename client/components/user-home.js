import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  const bannerImage =
    'https://user-images.githubusercontent.com/34967988/62590163-7a20fc80-b899-11e9-9c82-859bedfaaf54.png'
  return (
    <div>
      <h3>Welcome, {email}</h3>
      <img className="img-fluid" src={bannerImage} />
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
