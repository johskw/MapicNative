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
import ImagePicker from 'react-native-image-picker'

export default class LocationForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: "",
      imageData: "",
      imageUri: "",
      content: "",
      latitude: this.props.coordinate.latitude,
      longitude: this.props.coordinate.longitude,
      validationMessages: []
    }
  }

  selectImage (e) {
    let options = {
      title: '画像選択',
      maxWidth: 600,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        alert('画像を選択できません')
      }
      else if (!response.didCancel) {
        this.setState({
          imageData: response.data,
          imageUri: 'data:image/jpeg;base64,' + response.data,
        })
      }
    })
  }

  postLocation(e) {
    if (this.validationCheck()) {
      return
    }

    fetch('http://localhost:8080/restricted/locations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.token
      },
      body: JSON.stringify({
        title: this.state.title.trim(),
        content: this.state.content.trim(),
        image: this.state.imageData,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        user_id: this.props.user.id
      })
    })
    .then((response) => {
      if (response.ok) {
        Actions.drawer({ type: 'reset' })
      }
    })
    .catch((error) => {
      alert(error)
    })
  }

  validationCheck() {
    let messages = []
    if (this.state.title.trim().length < 1) messages.push('タイトルを入力してください')
    if (this.state.title.trim().length > 30) messages.push('タイトルは30文字以内で入力してください')
    if (this.state.content.trim().length < 1) messages.push('内容を入力してください')
    if (this.state.content.trim().length > 200) messages.push('内容を200文字以内で入力してください')
    if (this.state.imageData.length < 1 || this.state.imageUri.length < 1) messages.push('画像を選択してください')
    this.setState({
      validationMessages: messages
    })
    return messages.length > 0
  }

  renderImage() {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: this.state.imageUri }}
          style={styles.image}
        />
      </View>
    )
  }

  render() {
    const validationMessages = this.state.validationMessages.map((message, i) => (
      <Text key={i + 1} style={styles.validationMessage}>
        {message}
      </Text>
    ))

    return (
      <ScrollView style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <TextInput
              value={this.state.title}
              placeholder='タイトル'
              style={styles.title}
              onChangeText={(text) => this.setState({ title: text })}
            />
          </View>
          <View style={styles.contentContainer}>
            <TextInput
              value={this.state.content}
              placeholder='内容'
              multiline={true}
              style={styles.content}
              onChangeText={(text) => this.setState({ content: text })}
            />
          </View>
          <View style={styles.imageBtnContainer}>
            <TouchableOpacity
              onPress={(e) => this.selectImage(e)}
              style={styles.imageBtn}
            >
              <Text style={styles.imageBtnText}>画像を選択</Text>
            </TouchableOpacity>
          </View>
          {this.state.imageUri !== "" && this.renderImage()}
          <View style={styles.validationMessageContainer}>
            {validationMessages}
          </View>
          <View style={styles.postBtnContainer}>
            <TouchableOpacity
              onPress={(e) => this.postLocation(e)}
              style={styles.postBtn}
            >
              <Text style={styles.postBtnText}>投稿</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
            showsUserLocation={true}
          >
            <Marker coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }} >
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
    backgroundColor: '#eee'
  },
  mainContainer: {
    backgroundColor: '#fff',
    paddingTop: 80,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    borderBottomWidth: 1,
    borderColor: '#ffa500',
    padding: 5,
    fontSize: 16
  },
  contentContainer: {
    marginBottom: 20
  },
  content: {
    borderBottomWidth: 1,
    borderColor: '#ffa500',
    height: 80,
    padding: 5,
    fontSize: 16
  },
  imageBtnContainer: {
  },
  imageBtn: {
    backgroundColor: '#ffa500',
    borderRadius: 2,
    width: 90,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2
  },
  imageBtnText: {
    color: '#fff'
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    height: 300,
    width: 300
  },
  validationMessage: {
    color: '#f00'
  },
  validationMessageContainer: {
    marginTop: 25,
    marginBottom: 5
  },
  postBtnContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center'
  },
  postBtn: {
    backgroundColor: '#ffa500',
    borderRadius: 2,
    width: 160,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2
  },
  postBtnText: {
    color: '#fff',
    fontSize: 16
  },
  mapContainer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 80
  },
  map: {
    height: 320,
    width: 320
  }
})
