import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../store/items'
import {Link} from 'react-router-dom'
// import { Items } from '../server/db/models'

class AllItems extends React.Component {
  componentDidMount() {
    this.props.fetchItems()
  }

  render() {
    const {items} = this.props.items
    console.log('THESE ARE MY ITEMS PROPS', this.props)
    return (
      <div>
        <h2>MAGICAL DELIGHTS</h2>
        {items.map(function(singleItem, idx) {
          return (
            //CHECK TO MAKE SURE LINKS WORK AFTER WE PULL REQUEST
            <div key={idx}>
              <Link to={`/items/${singleItem.id}`}>
                <h3>{singleItem.name}</h3>
              </Link>
              <h3>{singleItem.price}</h3>
              <Link to={`/items/${singleItem.id}`}>
                <img src={singleItem.imageUrl} />
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

//I mapped my state to props, and one of the keys is "countries"
function mapStateToProps(state) {
  return {
    items: state.items
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchItems: function() {
      dispatch(fetchItems())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
