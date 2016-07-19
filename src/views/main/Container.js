import React from 'react'
import Map, {GoogleApiWrapper} from 'google-maps-react'
import {searchNearby} from 'utils/googleApiHelpers'
import Sidebar from 'components/Sidebar/Sidebar'

export class Container extends React.Component {
  onReady(mapProps, map) {
    const {google} = this.props;
    const opts = {
      location: map.center,
      radius: '500',
      types: ['cafe']
    }
    searchNearby(google, map, opts)
      .then((results, pagination) => {
        this.setState({
          places: results,
          pagination
        })
      }).catch((status, result) => {
        // There was an error
      })
  }
render() {
    return (
      <div>
        <Map
          visible={false}
          className={styles.wrapper}>
          <Header />
          <Sidebar
            title={'Restaurants'}
            places={this.state.places}
            />
          {/* contents */}
        </Map>
      </div>
    )
  }
}



export default GoogleApiWrapper({
  apiKey: 'your google maps api key here'
})(Container)

