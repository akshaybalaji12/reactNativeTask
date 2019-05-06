import React from'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

export const SignUpButton = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.instruction}>Need an Account?</Text>
            <TouchableHighlight style={styles.signUpButton}
                onPress={() => {
                    props.signUp.navigate('SignUp')
                }}
                underlayColor='#D2B4DE'>
                <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 30,
    },
    instruction: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#000'   
    },
    signUpButton: {
        backgroundColor: '#F5FCFF',
        padding: 10,
        margin: 20,
        height: 40,
        width: 100,
        borderColor: '#7D3C98',
        borderRadius: 20,
        borderWidth: 2,
    },
    signUpButtonText: {
        textAlign: 'center',
        color: '#7D3C98',
    },
})