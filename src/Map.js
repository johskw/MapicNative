import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import {
  Actions
} from 'react-native-router-flux'

export default class Map extends Component {

  constructor (props) {
    super(props)
    this.state = {
      newMarker: {}
    }
  }

  setNewMarker (e) {
    this.setState({
      newMarker: {
        coordinate: e.nativeEvent.coordinate
      }
    })
  }

  renderNewMarker () {
    return(
      <Marker
        coordinate={this.state.newMarker.coordinate}
      >
        <Callout>
          <TouchableOpacity onPress={() => { Actions.newLocation() }}>
            <Text>ここに投稿する</Text>
          </TouchableOpacity>
        </Callout>
      </Marker>
    )
  }

  render () {
    return(
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 35.681167,
          longitude: 139.767052,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        onPress={(e) => this.setNewMarker(e)}
      >
        {this.state.newMarker.coordinate !== undefined && this.renderNewMarker()}
      </MapView>
    )
  }
}

const styles = StyleSheet.create({
  map: { ...StyleSheet.absoluteFillObject, },
});
