import React from 'react'
import {fetchSingleItem} from '../store/items'
import {connect} from 'react-redux'

const mapStateToProps = state => {
  return {
    singleItem: state.items.singleItem
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleItem: id => dispatch(fetchSingleItem(id))
  }
}

class SingleItem extends React.Component {
  componentDidMount() {
    this.props.fetchSingleItem(this.props.match.params.id)
  }
  render() {
    let {name, imageUrl, price, description} = this.props.singleItem

    // console.log(this.props.singleItem)
    if (!this.props.singleItem.name) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h3>{name}</h3>
        <img src={imageUrl} />
        <h3>{price}</h3>
        <h3>{description}</h3>
        <button>Add to Cart</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)
