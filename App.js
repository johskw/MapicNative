import React, { Component } from 'react'
import {
  StyleSheet,
  View,
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
    return(
      <View style={styles.tabIconContainer}>
        <Text style={this.props.focused ? styles.selectedTabIcon : styles.tabIcon}>&#xf041;</Text>
        <Text style={this.props.focused ? styles.selectedTabIconText : styles.tabIconText}>MAP</Text>
      </View>
    )
  }
}

class UserIcon extends Component {
  render () {
    return(
      <View style={styles.tabIconContainer}>
        <Text style={this.props.focused ? styles.selectedTabIcon : styles.tabIcon}>&#xf007;</Text>
        <Text style={this.props.focused ? styles.selectedTabIconText : styles.tabIconText}>自分の投稿</Text>
      </View>
    )
  }
}

class SettingIcon extends Component {
  render () {
    return <Text style={styles.navbarIcon}>&#xf013;</Text>
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
            drawerIcon={<SettingIcon />}
            drawerWidth={220}
            contentComponent={DrawerContent}
          >
            <Scene
              key="tabbar"
              tabs
              tabBarStyle={styles.tabBar}
              showLabel={false}
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
  navbarIcon: {
    fontFamily: 'fontawesome',
    fontSize: 24,
    color: '#ffa500'
  },
  tabBar: {
    backgroundColor: '#fff'
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabIcon: {
    fontFamily: 'fontawesome',
    fontSize: 24,
    color: '#888',
    marginBottom: 2
  },
  selectedTabIcon: {
    fontFamily: 'fontawesome',
    fontSize: 24,
    color: '#ffa500',
    marginBottom: 2
  },
  tabIconText: {
    fontSize: 10,
    color: '#888'
  },
  selectedTabIconText: {
    fontSize: 10,
    color: '#ffa500'
  }
})
