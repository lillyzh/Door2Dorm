import React from 'react';

import {
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    StatusBar,
    Dimensions,
  } from 'react-native';
  import MapView from 'react-native-maps';
  import { LocationContext } from '../locationContext.js';
  import { Colors } from 'react-native/Libraries/NewAppScreen';

class PickUpPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        student: "Jake Wagner",
        location: "Florence Moore Hall",
      };
      this.pickedUp = this.pickedUp.bind(this);
      this.call = this.call.bind(this);
    }

    pickedUp() {
        this.props.history.push("/dropoff");
    }

    call() {
        alert("Calling Student");
    }

    render() {
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.sectionTitle}>Pick up {this.state.student} at {this.state.location}</Text>
                <LocationContext.Consumer>
                  {({ cur_lat, cur_long }) => {
                      let cur_lat_num = Number(cur_lat)
                      let cur_long_num = Number(cur_long)
                      return (
                              <>
                              <MapView
                              initialRegion={{
                                // TODO: Fix these static lat/long
                                latitude: 37.427475,
                                longitude: -122.169716,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                              }}
                              style = {styles.map}
                              showsUserLocation = {true}
                              followUserLocation = {false}
                              zoomEnabled = {true}
                            />
                            </>
                            )

                    }
                  }
                </LocationContext.Consumer>
                <View style={styles.buttonContainer}> 
                  <TouchableOpacity onPress={this.pickedUp} style={styles.button}>
                      <Text> Picked Up </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.call} style={styles.button}>
                      <Text> Call </Text>
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
    buttonContainer: {
      alignSelf: 'center',
      justifyContent:"flex-start",
      alignItems: 'center',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height/2.2,
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
  
  export default PickUpPage;
  