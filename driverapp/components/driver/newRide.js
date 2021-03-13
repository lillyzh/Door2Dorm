import React from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Button,
    Text,
    StatusBar,
    TouchableOpacity,
  } from 'react-native';
  
  import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';

class NewRidePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
      this.newRide = this.newRide.bind(this);
      this.logout = this.logout.bind(this);
    }

    newRide() {
      this.props.history.push("/loading")
    }

    logout() {
      this.props.history.push("/")
    }


    render() {
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.sectionTitle}>You have been assigned a ride!</Text>
                <View style={styles.buttonContainer}> 
                  <TouchableOpacity onPress={this.newRide} style={styles.button}>
                      <Text> Accept </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.logout} style={styles.button}>
                      <Text> Log Out </Text>
                  </TouchableOpacity>
                </View>
            </View>
          </SafeAreaView>
        </>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      height: '100%'
    },
    sectionTitle: {
      textAlign: 'center',
      marginHorizontal: 32,
      marginVertical: 32,
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
    },
    buttonContainer: {
      alignSelf: 'center',
      justifyContent:"flex-start",
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#55D7F5',
      borderRadius: 11,
      color: 'black',
      overflow: 'hidden',
      textAlign:'center',
      width: 150,
      height: 40,
      margin: 10,
      alignItems: "center",
      padding: 10,
    },
  });
  
  export default NewRidePage;
  