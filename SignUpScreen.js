import React, { Component } from 'react';  
import { View, Text, StyleSheet, TextInput, TouchableHighlight, ToastAndroid, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

export class SignUpScreen extends Component {  

  static navigationOptions = {
    title: 'Sign Up',
  };

  state = {
    name: '',
    email: '',
    password: '',
    confirmedPassword: '',
    mobileNumber: '',
    errorMessage: '',
    loading: false
  }

  updateName = (text) => {
    this.setState({name: text});
  }

  updateEmail = (text) => {
    this.setState({email: text});
  }

  updateConfirmedPassword = (text) => {
    this.setState({confirmedPassword: text});
  }

  updatePassword = (text) => {
    this.setState({password: text});
  }

  updateMobileNumber = (text) => {
    this.setState({mobileNumber: text});
  }

  onSignInPress() {
    this.setState({loading: true, errorMessage: ''})
    const {email, password, name, confirmedPassword, mobileNumber} = this.state;
    if(password === confirmedPassword){
      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then((data) => {
        firebase
        .database()
        .ref('users/')
        .child(data.user.uid)
        .set({
          email,
          password,
          name,
          mobileNumber
        })
        .catch((error) => {
          
        });
        this.props.navigation.navigate('Welcome');
      })
      .then(() => {
        ToastAndroid.show('Account Created',ToastAndroid.SHORT)
        this.nameInput.clear();
        this.emailInput.clear();
        this.mobInput.clear();
        this.passInput.clear();
        this.confPassInput.clear();
        this.setState(
          { loading: false,
            errorMessage: '',
            email: '',
            password: '',
            confirmedPassword: '',
            name: '',
            mobileNumber: '',
          })
      })
      .catch((error) => {
        this.setState({errorMessage: error.message, loading: false})
        // let errorCode = error.code;
        // let errorMessage = error.message;
        // if(errorCode === 'auth/weak-password')
        //   ToastAndroid.show('Weak Password',ToastAndroid.SHORT);
        // else 
        //   ToastAndroid.show(errorMessage,ToastAndroid.SHORT);
      })
    } else {
        this.setState({errorMessage: 'Enter same passwords in both entries',loading: false})
    }
  }

  render() {
    const activityIndicator = <ActivityIndicator size='large' color='#7D3C98'/>;
    return (
      <View style={styles.container}>
        <Text style={styles.signUp}>Enter Details</Text>
        <TextInput style={styles.input}
              placeholder="Name"
              placeholderTextColor="#7D3C98"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onChangeText={this.updateName}
              ref={input => { this.nameInput = input }}/>
          <TextInput style={styles.input}
              placeholder="Email"
              placeholderTextColor="#7D3C98"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onChangeText={this.updateEmail}
              ref={input => { this.emailInput = input }}/>
          <TextInput style = {styles.input}
              placeholder='Mobile Number'
              placeholderTextColor="#7D3C98"
              underlineColorAndroid="transparent"
              keyboardType='number-pad'
              onChangeText={this.updateMobileNumber}
              ref={input => { this.mobInput = input }}/>
          <TextInput style={styles.input}
              placeholder="Password"
              placeholderTextColor="#7D3C98"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onChangeText={this.updatePassword}
              secureTextEntry={true}
              ref={input => { this.passInput = input }}/>
          <TextInput style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#7D3C98"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={this.updateConfirmedPassword}
              ref={input => { this.confPassInput = input }}/>
          <TouchableHighlight style={styles.signUpButton}
              onPress = {this.onSignInPress.bind(this)}
              activeOpacity={1}
              underlayColor='#D2B4DE'>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableHighlight>
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
          {this.state.loading ? activityIndicator : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: '100%',
  },
  signUp: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: '#000'
  },
  input: {
      width: 300,
      margin: 20,
      height: 40,
      borderColor: '#7D3C98',
      borderWidth: 2,
  },
  signUpButton: {
      backgroundColor: '#F5FCFF',
      padding: 10,
      margin: 20,
      height: 40,
      width: 70,
      borderColor: '#7D3C98',
      borderRadius: 20,
      borderWidth: 2,
  },
  signUpButtonText: {
      textAlign: 'center',
      color: '#7D3C98',
  },
  errorMessage: {
    fontSize: 20,
    margin: 20,
    color: 'red',
    textAlign: 'center',
  }
});