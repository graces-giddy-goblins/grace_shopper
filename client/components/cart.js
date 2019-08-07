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
    console.log('cart', cart)
    return (
      <div>
        <h2>WHAT'S IN YOUR CAULDRON?</h2>
        {cart.length === 0 ? (
          <div>
            <h1>Nothing Brewing Yet!</h1>
            <img src="https://user-images.githubusercontent.com/34967988/62626595-bbdf9080-b8f5-11e9-8b4e-5138ddb11546.png" />
          </div>
        ) : (
          <div>
            <form onSubmit={this.handleSubmit}>
              {cart.map(function(singleItem, idx) {
                // console.log("WHAT IS THIS? ", this)
                return (
                  <div
                    key={idx}
                    className="card mb-3"
                    // style={{'max-width': '540px'}}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <Link to={`/items/${singleItem.id}`}>
                            <img
                              src={singleItem.imageUrl}
                              className="img-fluid"
                            />
                          </Link>
                        </div>

                        <div className="col">
                          <Link to={`/items/${singleItem.id}`}>
                            <h5 className="card-title">{singleItem.name}</h5>
                          </Link>
                          <div className="card-text">
                            <h3>Price: ${singleItem.price}</h3>
                            <h3>Qty: {singleItem.cart.quantity}</h3>
                          </div>
                        </div>

                        <div className="col">
                          Quantity{' '}
                          <input
                            className="form-control"
                            type="number"
                            name="quantity"
                            min="1"
                            max="30"
                            id={singleItem.id}
                            value={this.state.quantity}
                            onChange={this.handleChange}
                          />
                          <br />
                          <button className="btn btn-primary" type="submit">
                            Update Quantity
                          </button>
                          <button
                            className="btn btn-primary"
                            type="button"
                            name="remove"
                            onClick={() => {
                              this.props.deleteCartItemThunk(singleItem.id)
                            }}
                          >
                            Remove Item
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }, this)}
            </form>

            <h3>
              TOTAL: ${Math.round(
                cart.reduce((accum, singleItem) => {
                  return accum + singleItem.price * singleItem.cart.quantity
                }, 0) * 100
              ) / 100}
            </h3>

            <h4>Order #: {cart['0'] && (orderId = cart['0'].cart.orderId)}</h4>
            <Link to={`/cart/${orderId}`}>
              <button
                className="btn btn-primary "
                type="button"
                name="checkout"
              >
                Checkout
              </button>
            </Link>
          </div>
        )}
        <br />
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
