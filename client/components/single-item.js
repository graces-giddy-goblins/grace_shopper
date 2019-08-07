import React from 'react'
import {fetchSingleItem} from '../store/items'
import {addToCartThunk} from '../store/cart'
import {connect} from 'react-redux'

const defaultState = {
  quantity: 1
}

class SingleItem extends React.Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.fetchSingleItem(this.props.match.params.id)
  }
  handleSubmit(event) {
    event.preventDefault()
    const cartItem = {
      quantity: this.state.quantity,
      itemId: this.props.match.params.id
    }
    this.props.addToCartThunk(cartItem)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    let {name, imageUrl, price, description} = this.props.singleItem

    if (!this.props.singleItem.name) {
      return <div>Loading...</div>
    }

    return (
      <div className="row">
        <div className="col-sm">
          <h3>{name}</h3>
          <img src={imageUrl} />
        </div>
        <div className="col-sm">
          <h3>${price}</h3>
          <h3>{description}</h3>

          <form className="j" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-3 text-right">
                <label htmlFor="quantity">Quantity</label>
              </div>
              <div className="col-sm-3">
                <input
                  className="form-control"
                  type="number"
                  name="quantity"
                  min="1"
                  max="30"
                  value={this.state.quantity}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-sm-6">
                <button className="btn btn-primary" type="submit">
                  Add to Cart
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleItem: state.items.singleItem,
    cart: state.cart.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleItem: id => dispatch(fetchSingleItem(id)),
    addToCartThunk: item => dispatch(addToCartThunk(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)
