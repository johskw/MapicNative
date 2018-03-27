import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  AsyncStorage
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import {
  Actions
} from 'react-native-router-flux'

export default class Location extends Component {

  constructor (props) {
    super(props)
    this.state = {
      user: {},
      locations: [],
      displayMap: false
    }
  }

  componentWillMount() {
    this.setData()
  }

  setData = async () => {
    try {
      let userData = await AsyncStorage.getItem('user')
      let tokenData = await AsyncStorage.getItem('token')
      let user = JSON.parse(userData)
      let token = JSON.parse(tokenData)
      this.setState({
        user: user,
        token: token
      })
      this.setMyLocations()
    } catch (error) {
      alert(error)
    }
  }

  setMyLocations() {
    fetch(this.props.apiUrl + '/restricted/mylocations/' + this.state.user.id, {
      headers: {
        'Authorization': 'Bearer ' + this.state.token
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          locations: responseJson
        })
      })
      .catch((error) => {
        alert(error)
      })
  }

  changeDisplayType () {
    this.setState({
      displayMap: !this.state.displayMap
    })
  }

  renderImageList () {
    const imageList = this.state.locations.map((location, i) => (
      <TouchableOpacity
        key={i + 1}
        onPress={() => Actions.myLocation({ location: location })}
      >
        <Image
          source={{ uri: 'data:image/jpeg;base64,' + location.image }}
          style={styles.image}
        />
      </TouchableOpacity>
    ))

    return (
      <View style={styles.container}>
        <View style={styles.changeBtnContainer}>
          <TouchableOpacity
            onPress={() => this.changeDisplayType()}
            style={styles.changeBtn}
          >
            <Text style={styles.changeBtnText}>MAPで表示</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.imageListContainer}>
          <View style={styles.imageList}>
            {imageList}
          </View>
        </ScrollView>
      </View>
    )
  }

  renderMap () {
    const markerList = this.state.locations.map((location, i) => (
      <Marker
        key={i + 1}
        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
        onPress={() => { Actions.myLocation({ location: location }) }}
        centerOffset={{ x: 0, y: -35 }}
      >
        <Image
          source={{ uri: 'data:image/jpeg;base64,' + location.image }}
          style={{ width: 48, height: 48, borderRadius: 24, position: 'absolute', top: 4, left: 4 }}
        />
        <Image
          source={require('../images/marker_icon.png')}
          style={{ width: 56, height: 70 }}
        />
      </Marker>
    ))

    return (
      <View style={styles.container}>
        <View style={styles.changeBtnContainer}>
          <TouchableOpacity
            onPress={() => this.changeDisplayType()}
            style={styles.changeBtn}
          >
            <Text style={styles.changeBtnText}>画像一覧</Text>
          </TouchableOpacity>
        </View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 35.681167,
            longitude: 139.767052,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          {markerList}
        </MapView>
      </View>
    )
  }

  render () {
    if (this.state.displayMap) {
      return this.renderMap()
    }
    return this.renderImageList()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  changeBtnContainer: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 10
  },
  changeBtn: {
    backgroundColor: '#ffa500',
    borderRadius: 15,
    width: 100,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2
  },
  changeBtnText: {
    color: '#fff'
  },
  imageListContainer: {
    paddingTop: 50
  },
  imageList: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  image: {
    width: 125,
    height: 125
  },
  map: { ...StyleSheet.absoluteFillObject, }
})
