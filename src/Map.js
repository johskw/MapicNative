import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps'

export default class Map extends Component {
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
      />
    )
  }
}

const styles = StyleSheet.create({
  map: { ...StyleSheet.absoluteFillObject, },
});
