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
    let children = null;
    if (this.props.children) {
      // We have children in the Container component
      children = React.cloneElement(
        this.props.children,
        {
          google: this.props.google,
          places: this.state.places,
          loaded: this.props.loaded
        });
    }
    return (
      <div>
        <Map
          visible={false}
          className={styles.wrapper}>
          <Header />
          <Sidebar />
          <div className={styles.content}>
        {/* Setting children routes to be rendered*/}
        {children}
      </div>
        </Map>
      </div>
    )
  }
}


export default GoogleApiWrapper({
  apiKey: 'You google API key goes here'
})(Container)

