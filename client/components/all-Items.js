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
    // const {countries} = this.props
    console.log('THESE ARE MY ITEMS PROPS', this.props)
    return (
      <div>
        <h2>THIS IS WHERE OUR PRODUCTS WILL GO</h2>
        {/* <h3>Here are a List of Countries with Aircrafts: </h3>
        {countries.map(function(singleCountry, idx) {
          return (
            <div key={idx}>
              <Link to={`/countries/${singleCountry.id}`}>
                <h2>{singleCountry.name}</h2>
                <img src={singleCountry.flagUrl} width="200" />
              </Link>
            </div>
          )
        })}
        <CountryForm /> */}
      </div>
    )
  }
}

//I mapped my state to props, and one of the keys is "countries"
// function mapStateToProps(state) {
//   return {
//     countries: state.countries
//   }
// }

function mapDispatchToProps(dispatch) {
  return {
    fetchItems: function() {
      dispatch(fetchItems())
    }
  }
}

export default connect(null, mapDispatchToProps)(AllItems)
