import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableHighlight, BackHandler} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import firebase from 'firebase';

export class HomeScreen extends Component {

    state = {
        index: 0,
        routes: [
          { key: 'first', title: 'Profile' },
          { key: 'second', title: 'List' },
        ],
    };

    static navigationOptions = {
        title: 'Home',
        headerLeft: null,
        headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
            justifyContent: 'center',
            textAlignVertical: 'center'
          }
    };

    onLogoutButtonPress() {
        firebase.auth().signOut()
        .then(() => {
            this.props.navigation.navigate('Welcome');
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
        const {navigation} = this.props;
        const FirstRoute = () => {
            var name;
            const userID = firebase.auth().currentUser.uid;
            firebase
            .database()
            .ref('users/'+userID+'/name')
            .on('value', (snapshot) => {
                name = snapshot.val();
            })
            if(name !== null) {
                return (
                    <View style={[styles.scene, { backgroundColor: '#F5FCFF' }]}>
                        <Text style={styles.welcome}> Welcome, {name}</Text>
                    </View>
                )
            }
            
        };
        
        const SecondRoute = () => (
        <View style={[styles.scene, { backgroundColor: '#F5FCFF' }]}>
            <Text style={styles.welcome}>List</Text>
        </View>
        );

        const tabViewComponent = 
        <TabView
            style={styles.tabView}
            navigationState={this.state}
            renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute,
            })}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get('window').width }}
            renderTabBar={(props) =>
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: 'white' }}
                    style={styles.tabBar}
                    indicatorStyle={{backgroundColor: "#555555"}}
                />
                }
        />;
        const anonymousUserComponent = 
        <Text style={styles.welcome}>Welcome</Text>;
        var isAnonymous = firebase.auth().currentUser.isAnonymous;
        return (
            <View style={styles.container}>
                {!isAnonymous ? tabViewComponent : anonymousUserComponent}
                <View style={styles.buttonView}>
                    <TouchableHighlight 
                    style={styles.button}
                    onPress = {this.onLogoutButtonPress.bind(this)}
                    underlayColor='#D2B4DE'>
                        <Text style={styles.buttonText}>LOGOUT</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        height: '100%',
      },
    name: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#000'
    },
    buttonView: {
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: '#7D3C98',
        height: 40,
        alignSelf: 'stretch',
        padding: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#fafafa',
        textAlignVertical: 'center',
        fontSize: 20,
        fontFamily: 'Roboto'
    },
    scene: {
        flex: 1,
    },
    tabView: {
        height: '100%',
    },
    tabBar: {
        backgroundColor: '#7D3C98',
    },
    welcome: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
        color: 'black',
        margin: 20,
    }
})