import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'
import {Link} from 'react-router-dom'

export class Cart extends React.Component {
  componentDidMount() {
    this.props.getCartThunk()
  }

  render() {
    let {cart} = this.props.cart
    if (cart === undefined) {
      return <div>Loading...</div>
    }
    console.log('THESE ARE MY ITEMS PROPS', cart)
    return (
      <div>
        <h2>WHATS IN YOUR CAULDRON</h2>
        {cart.map(function(singleItem, idx) {
          return (
            //CHECK TO MAKE SURE LINKS WORK AFTER WE PULL REQUEST
            <div key={idx}>
              <Link to={`/items/${singleItem.id}`}>
                <h3>{singleItem.name}</h3>
              </Link>
              <h3>Price: {singleItem.price}</h3>
              <h3>Qty: {singleItem.cart.quantity}</h3>
              <Link to={`/items/${singleItem.id}`}>
                <img src={singleItem.imageUrl} />
              </Link>
            </div>
          )
        })}
        <h3>
          TOTAL:{' '}
          {cart.reduce((accum, singleItem) => {
            return accum + singleItem.price * singleItem.cart.quantity
          }, 0)}
        </h3>
      </div>
    )
  }
}

//I mapped my state to props, and one of the keys is "countries"
function mapStateToProps(state) {
  return {
    cart: state.cart
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCartThunk: function() {
      dispatch(getCartThunk())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
