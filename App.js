/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, TouchableHighlight} from 'react-native';
import {LoginScreen} from './LoginScreen.js';
import {SignUpButton} from './SignUpButton.js';
import {SignUpScreen} from './SignUpScreen.js';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import firebase from 'firebase';
import { HomeScreen } from './HomeScreen.js';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

class Loading extends Component {

  componentDidMount(){
    var config = {
      apiKey: "AIzaSyD9hizf2CqCsj7ZIRSOKiURLaUM8j_GIKc",
      authDomain: "reactnativetask-e264e.firebaseapp.com",
      databaseURL: "https://reactnativetask-e264e.firebaseio.com",
      projectId: "reactnativetask-e264e",
      storageBucket: "reactnativetask-e264e.appspot.com",
      messagingSenderId: "606207771657"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        const userID = firebase.auth().currentUser.uid;
        firebase
        .database()
        .ref('users/'+userID+'/name')
        .on('value', (snapshot) => {
            this.props.navigation.navigate('Home',{
                name: snapshot.val()
            });
        })
        // this.props.navigation.navigate('Home', {
        //   name: 'akshay'
        // })
      } else {
        this.props.navigation.navigate('Welcome')
      }
    })
    // if(firebase.auth().currentUser){
    //   this.props.navigation.navigate('Home', {
    //     name: 'akshay'
    //   })
    // } else {
    //   this.props.navigation.navigate('Welcome')
    // }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading</Text>
        <ActivityIndicator size='large' color="#7D3C98"/>
      </View>
    )  
  }
  
}

class WelcomeScreen extends Component {

  state = {
    loading: false,
  }

  static navigationOptions = {
    title: 'React Native Task',
    headerLeft: null,
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'Roboto',
      textAlign: 'center',
      alignSelf: 'center',
      flex: 1,
      justifyContent: 'center',
      textAlignVertical: 'center'
    }
  };

  onLoginAnonymouslyPressed() {
    this.setState({loading: true});
    firebase.auth().signInAnonymously()
    .then((resp) => {
        console.log(resp.user.uid);
        this.props.navigation.navigate('Home');
        this.setState({loading: false})
    })
    .catch((error) => {
        console.log(error.message)
    })
  }

  render() {
    const activityIndicator = <ActivityIndicator size='large' color='#7D3C98'/>;
    return (
      <View style={styles.container}>
        <LoginScreen login={this.props.navigation}/>
        {this.state.loading ? activityIndicator : null}
        <SignUpButton signUp={this.props.navigation}/>
        <TouchableHighlight style={styles.loginAnonymouslyButton}
          onPress={this.onLoginAnonymouslyPressed.bind(this)}
          underlayColor='#D2B4DE'>
          <Text style={styles.loginAnonymouslyButtonText}>Login Anonymously</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Loading: Loading,
    Welcome: WelcomeScreen,
    SignUp: SignUpScreen,
    Home: HomeScreen,
  },
  {
    initialRouteName: "Loading",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#F5FCFF',
        shadowOpacity: 0
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
      },
      headerTintColor: '#000'
    }
  }
  
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component<Props> {

  render() {
    return <AppContainer/>;
  }
  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <LoginScreen/>
  //       <SignUpButton />
  //     </View>
  //   )
  // }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: '100%',
  },
  loading: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000'
  },
  loginAnonymouslyButton: {
    backgroundColor: '#F5FCFF',
    padding: 10,
    margin: 20,
    height: 40,
    width: 200,
    borderColor: '#7D3C98',
    borderRadius: 20,
    borderWidth: 2,
  },
  loginAnonymouslyButtonText: {
      textAlign: 'center',
      color: '#7D3C98',
  },
});
