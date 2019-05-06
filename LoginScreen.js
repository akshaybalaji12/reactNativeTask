import React, {Component} from 'react';
import {View , Text, StyleSheet, TouchableHighlight, TextInput, ActivityIndicator, BackHandler} from 'react-native';
import firebase from 'firebase';

export class LoginScreen extends Component {

    state = {
        email: '',
        password: '',
        errorMessage: '',
        loading: false,
    };

    updateEmail = (text) => {
        this.setState({email: text});
    }

    updatePassword = (text) => {
        this.setState({password: text});
    }

    onLoginButtonPress() {
        this.setState({loading: true, errorMessage: ''})
        const {email,password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(() => {
            this.textInput.clear();
            this.emailInput.clear();
            this.props.login.navigate('Home');
        })
        .then(() => this.setState(
            { loading: false,
                errorMessage: '',
                email: '',
                password: ''
            }
        ))
        .catch((error) => {
            this.setState({errorMessage: error.message, loading: false})
        })
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        return true;
    };

    render() {
        const activityIndicator = <ActivityIndicator size='large' color='#7D3C98'/>;
        return (
            
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome</Text>
                <TextInput style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#7D3C98"
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={this.updateEmail}
                    ref={input => { this.emailInput = input }}/>
                <TextInput style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#7D3C98"
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={this.updatePassword}
                    secureTextEntry={true}
                    ref={input => { this.textInput = input }}/>
                <TouchableHighlight style={styles.loginButton}
                    onPress = {this.onLoginButtonPress.bind(this)}
                    activeOpacity={1}
                    underlayColor='#D2B4DE'>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableHighlight>
                <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                {this.state.loading ? activityIndicator : null}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
    },
    welcome: {
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
    loginButton: {
        backgroundColor: '#F5FCFF',
        padding: 10,
        margin: 20,
        height: 40,
        width: 70,
        borderColor: '#7D3C98',
        borderRadius: 20,
        borderWidth: 2,
    },
    loginButtonText: {
        textAlign: 'center',
        color: '#7D3C98',
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        fontSize: 20,
        margin: 20,
    }
});