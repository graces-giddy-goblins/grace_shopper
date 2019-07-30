import React from 'react'
import {connect} from 'react-redux'
// import {fetchCountries} from '../reducers/countryReducer'
import {Link} from 'react-router-dom'
// import { Items } from '../server/db/models'

class AllItems extends React.Component {
  componentDidMount() {
    // this.props.fetchCountries()
  }

  render() {
    const {countries} = this.props
    console.log('THESE ARE MY COUNTRIES PROPS', this.props)
    return (
      <div>
        <h3>Here are a List of Countries with Aircrafts: </h3>
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
        <CountryForm />
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

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchCountries: function() {
//       dispatch(fetchCountries())
//     }
//   }
// }

export default AllItems
// export default connect(mapStateToProps, null)(AllItems)
