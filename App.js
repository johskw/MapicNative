import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  AsyncStorage
} from 'react-native'
import {
  Router,
  Stack,
  Scene,
  Drawer
} from 'react-native-router-flux'
import Map from './src/Map'
import LocationForm from './src/LocationForm'
import Location from './src/Location'
import LoginForm from './src/LoginForm'
import SignupForm from './src/SignupForm'
import MyLocations from './src/MyLocations'
import DrawerContent from './src/DrawerContent'

class MapIcon extends Component {
  render () {
    let iconColor = this.props.focused ? '#ffa500' : '#888'
    return(
      <Text style={{ fontFamily: 'fontawesome', fontSize: 24, color: iconColor }}>&#xf041;</Text>
    )
  }
}

class UserIcon extends Component {
  render () {
    let iconColor = this.props.focused ? '#ffa500' : '#888'
    return(
      <Text style={{ fontFamily: 'fontawesome', fontSize: 24, color: iconColor }}>&#xf007;</Text>
    )
  }
}

export default class App extends Component {

  render() {
    const apiUrl = 'http://localhost:8080'

    return (
      <Router tintColor='#ffa500' navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} >
        <Scene key="root">
          <Scene key="login" component={LoginForm} apiUrl={apiUrl} hideNavBar />
          <Scene key="signup" component={SignupForm} apiUrl={apiUrl} hideNavBar />
          <Drawer
            key="drawer"
            hideNavBar
            drawerPosition='right'
            // drawerImage={() => (<Image/>)} // デフォルトのハンバーガーメニューを差し替える
            // drawerIcon={() => (<Icon/>)} // デフォルトのハンバーガーメニューを差し替える
            drawerWidth={220}
            contentComponent={DrawerContent}
          >
            <Scene
              key="tabbar"
              tabs
              tabBarStyle={styles.tabBar}
              labelStyle={{ color: this.props.focused ? '#ffa500' : '#888' }}
            >
              <Stack key="MAP" icon={MapIcon} >
                <Scene key="map" component={Map} title="MAP" apiUrl={apiUrl} />
                <Scene key="newLocation" component={LocationForm} title="新規投稿" apiUrl={apiUrl} />
                <Scene key="Location" component={Location} title="投稿" />
              </Stack>
              <Stack key="自分の投稿" icon={UserIcon} >
                <Scene key="MyLocations" component={MyLocations} title="自分の投稿" apiUrl={apiUrl} />
                <Scene key="myLocation" component={Location} title="投稿" />
              </Stack>
            </Scene>
          </Drawer>
        </Scene>
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#fff'
  },
  navBarTitle: {
    color: '#000'
  },
  tabBar: {
    backgroundColor: '#fff'
  }
})
