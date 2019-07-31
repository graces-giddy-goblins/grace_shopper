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
            // <Link to={`/countries/${singleCountry.id}`}>
            //     <h2>{singleCountry.name}</h2>
            //     <img src={singleCountry.flagUrl} width="200" />
            //   </Link>
            <div key={idx}>
              <h3>{singleItem.name}</h3>
              <h3>{singleItem.price}</h3>
              <img src={singleItem.imageUrl} />
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
