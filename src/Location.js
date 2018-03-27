import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import {
  Actions
} from 'react-native-router-flux'

export default class Location extends Component {

  render () {
    return(
      <ScrollView style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'data:image/jpeg;base64,' + this.props.location.image }}
              style={styles.image}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {this.props.location.title}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.content}>
              {this.props.location.content}
            </Text>
          </View>
          <View style={styles.userContainer}>
            <Text style={styles.user}>
              {this.props.location.user.name}さん
            </Text>
          </View>
        </View>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: this.props.location.latitude,
              longitude: this.props.location.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
            showsUserLocation={true}
          >
            <Marker
              coordinate={{ latitude: this.props.location.latitude, longitude: this.props.location.longitude }}
              centerOffset={{ x: 0, y: -35 }}
            >
              <Image
                source={{ uri: 'data:image/jpeg;base64,' + this.props.location.image }}
                style={{ width: 48, height: 48, borderRadius: 24, position: 'absolute', top: 4, left: 4 }}
              />
              <Image
                source={require('../images/marker_icon.png')}
                style={{ width: 56, height: 70 }}
              />
            </Marker>
          </MapView>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  mainContainer: {
    backgroundColor: '#fff',
    paddingTop: 0,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  image: {
    height: 375,
    width: 375
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#ffa500'
  },
  contentContainer: {
    marginBottom: 20
  },
  content: {
    fontSize: 16
  },
  userContainer: {
    alignItems: 'flex-end',
    marginBottom: 10
  },
  user: {
    fontSize: 16
  },
  mapContainer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 80
  },
  map: {
    height: 320,
    width: 320,
    borderWidth: 1,
    borderColor: '#ddd'
  }
})
