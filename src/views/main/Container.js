import React from 'react'
import Map, {GoogleApiWrapper} from 'google-maps-react'
import {searchNearby} from 'utils/googleApiHelpers'

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
        Hello from the container
        <Map
          google={this.props.google}
          onReady={this.onReady.bind(this)}
          visible={false}>

          {this.state.places.map(place => {
            return (<div key={place.id}>{place.name}</div>)
          })}

        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'your google maps api key here'
})(Container)

