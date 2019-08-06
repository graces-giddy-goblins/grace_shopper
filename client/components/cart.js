/* eslint-disable no-return-assign */
import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk, updateCartThunk, deleteCartItemThunk} from '../store/cart'
import {Link} from 'react-router-dom'

const defaultState = {
  quantity: 1,
  id: 0
}

export class Cart extends React.Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getCartThunk()
  }

  handleSubmit(event) {
    event.preventDefault()
    const cartItem = {
      quantity: this.state.quantity,
      itemId: this.state.id
    }
    this.props.updateCartThunk(cartItem)
    // console.log('WHAT IS BEING DISPATCHED', cartItem)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      id: event.target.id
    })
  }

  render() {
    let {cart} = this.props.cart
    let orderId

    if (cart === undefined) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h2>WHATS IN YOUR CAULDRON</h2>
        <form onSubmit={this.handleSubmit}>
          {cart.map(function(singleItem, idx) {
            // console.log("WHAT IS THIS? ", this)
            return (
              <div key={idx}>
                <Link to={`/items/${singleItem.id}`}>
                  <h3>{singleItem.name}</h3>
                </Link>
                <h3>Price: {singleItem.price}</h3>
                <h3>Qty: {singleItem.cart.quantity}</h3>
                <Link to={`/items/${singleItem.id}`}>
                  <img src={singleItem.imageUrl} />
                </Link>
                Quantity{' '}
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max="30"
                  id={singleItem.id}
                  value={this.state.quantity}
                  onChange={this.handleChange}
                />
                <button type="submit">Update Quantity</button>
                <button
                  type="button"
                  name="remove"
                  onClick={() => {
                    this.props.deleteCartItemThunk(singleItem.id)
                  }}
                >
                  Remove Item
                </button>
              </div>
            )
          }, this)}
        </form>
        <h3>
          TOTAL:{' '}
          {Math.round(
            cart.reduce((accum, singleItem) => {
              return accum + singleItem.price * singleItem.cart.quantity
            }, 0) * 100
          ) / 100}
        </h3>
        <h4>Order #: {cart['0'] && (orderId = cart['0'].cart.orderId)}</h4>

        <Link to={`/cart/${orderId}`}>
          <button type="button" name="checkout">
            Checkout
          </button>
        </Link>
      </div>
    )
  }
}

//I mapped my state to props, and one of the keys is "cart"
function mapStateToProps(state) {
  return {
    cart: state.cart
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCartThunk: function() {
      dispatch(getCartThunk())
    },
    updateCartThunk: function(item) {
      dispatch(updateCartThunk(item))
    },
    deleteCartItemThunk: function(itemId) {
      dispatch(deleteCartItemThunk(itemId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
