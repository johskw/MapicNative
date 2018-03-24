import React, { Component } from 'react'
import {
  Router,
  Stack,
  Scene
} from 'react-native-router-flux'
import Map from './src/Map'
import LocationForm from './src/LocationForm'
import Location from './src/Location'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="map" component={Map} title="Map" />
          <Scene key="newLocation" component={LocationForm} title="新規投稿" />
          <Scene key="Location" component={Location} />
        </Stack>
      </Router>
    )
  }
}
