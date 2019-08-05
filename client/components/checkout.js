import React from 'react'
import {connect} from 'react-redux'
import completeOrderThunk from '../store/cart'

// const mapStateToProps = state => {
//   return {

//   }
// }

function mapDispatchToProps(dispatch) {
  return {
    completeOrderThunk: orderId => dispatch(completeOrderThunk(orderId))
  }
}

export class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.completeOrderThunk(this.props.match.params.orderId)
  }

  render() {
    console.log('***', this.props)
    console.log('state', this.state)
    const {name, address, city, state, zip} = this.state
    const {handleSubmit, handleChange} = this
    return (
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input onChange={handleChange} value={name} type="text" name="name" />
        <label>Address: </label>
        <input
          onChange={handleChange}
          value={address}
          type="text"
          name="address"
        />
        <label>City: </label>
        <input onChange={handleChange} value={city} type="text" name="city" />
        <label>State: </label>
        <input onChange={handleChange} value={state} type="text" name="state" />
        <label>Zip: </label>
        <input onChange={handleChange} value={zip} type="number" name="zip" />
        <button
          type="submit"
          disabled={!name || !address || !city || !state || !zip}
        >
          submit
        </button>
      </form>
    )
  }
}

export default connect(null, mapDispatchToProps)(Checkout)