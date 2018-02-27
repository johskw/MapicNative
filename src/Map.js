import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'

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

  render () {
    return (
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
        <Marker
          coordinate={this.state.newMarker.coordinate}
        >
          <Callout>
            <Text>ここに投稿する</Text>
          </Callout>
        </Marker>
      </MapView>
    )
  }
}

const styles = StyleSheet.create({
  map: { ...StyleSheet.absoluteFillObject, },
});
