import React, { Component } from 'react'
import {
  Router,
  Stack,
  Scene
} from 'react-native-router-flux'
import Map from './src/Map'
import LocationForm from './src/LocationForm'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="map" component={Map} title="Map" />
          <Scene key="newLocation" component={LocationForm} title="New Location" />
        </Stack>
      </Router>
    )
  }
}
