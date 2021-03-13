import React, { useContext } from 'react';
import {
  Text,
  TextInput,
  Button,
  Alert,
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { ReadItem } from "./databaseHelper";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { LocationContext } from '../locationContext.js';
import MapView from 'react-native-maps';

class RequestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        numRiders: "",
        currentLoc: "",
        destination: "",
        safetyLevel: "",

    };
    this.requestButton = this.requestButton.bind(this);
    this.logoutButton = this.logoutButton.bind(this);
  }

  componentDidMount() {
    // TODO RETRIEVE STUDENTID FROM URL
    this.setState({ studentId: '06175468' });
  }

  async getLocationAsync() {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    let perm;
    while (!perm || perm.status !== 'granted')
      {
        perm = await Permissions.askAsync(Permissions.LOCATION);
      }
    return await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
  }

  logoutButton() {
      this.props.history.push('/loginRider');
  }

  // async so that we can handle promise from AsyncStorage
  async requestButton(setLat, setLong) {

    var numPassengers = /^\d{1}$/;
    var safetyNum = /^\d{1}$/;
    let url = 'http://127.0.0.1:8000/rides/placeholder/cr-ride/'; // append slash to match Django expectations

    if (this.state.currentLoc.length < 1) {
        alert("You must enter a current location")
    } else if (this.state.destination.length < 1) {
        alert("You must enter a destination")
    } else if (!this.state.numRiders.match(numPassengers)) {
      alert("Double check your number of riders is a digit less than 5")
    } else if (!this.state.safetyLevel.match(safetyNum)) {
        alert("Double check your safety level is a digit between 1 and 9")
    } else {
      var sunet = await ReadItem("sunet"); // promise, wait for this value
      let curLocation = this.getLocationAsync();
      if (!curLocation)
        {
          alert("Cannot access your location.\n");
          return;
        }

      let body = {
        // case must match that of backend
        current_loc: this.state.currentLoc,
        destination: this.state.destination,
        num_riders: this.state.numRiders,
        safety_level: this.state.safetyLevel,
        sunet: sunet,
        cur_lat: (await curLocation).coords.latitude,
        cur_long: (await curLocation).coords.longitude,
      };
      setLat(body.cur_lat);
      setLong(body.cur_long);
      // TODO: Once fully connected need to move this.props.history.push() to the success .then portion so we only move you with a successful request.
      this.props.history.push('/eta');
      console.log(body);
      axios.post(url, body)
        .then(function(res) {
          console.log('Response received\n');
          console.log(res.data);
        })
        .catch(function(err) {
          console.log("Error making the call");
          console.log(err);
          if (err.request) {
            console.log(err.request);
          }
        });

    }
  }

  render() {
    return (
      <SafeAreaView>
          <View style={styles.back}>
              <Button
                onPress={this.logoutButton}
                title="Back"
                accessibilityLabel="Back"
                color='black'
              />
          </View>
          <View style={styles.container}>
              <LocationContext.Consumer>
                {({ cur_lat, cur_long }) => {
                    let cur_lat_num = Number(cur_lat)
                    let cur_long_num = Number(cur_long)
                    return (
                            <>
                            <StatusBar/>
                            <MapView
                                initialRegion={{
                                  // TODO: Fix the current location lat/long
                                  latitude: 37.427475,
                                  longitude: -122.169716,
                                  latitudeDelta: 0.0922,
                                  longitudeDelta: 0.0421,
                                }}
                                style = {styles.map}
                                showsUserLocation = {true}
                                followUserLocation = {true}
                                zoomEnabled = {true}
                          />
                          </>
                          )

                  }
                }
              </LocationContext.Consumer>
              <View style={styles.inputView}>
                <Text style={styles.sectionTitle}>Current address</Text>
                <TextInput
                  autoCapitalize={'none'}
                  autoCompleteType={'off'}
                  autoCorrect={false}
                  spellCheck={false}
                  style={styles.textInput}
                  onChange={(e) => {
                    this.setState({ currentLoc: e.nativeEvent.text });
                  }}
                />
              </View>
              <View style={styles.inputView}>
                <Text style={styles.sectionTitle}>Destination address</Text>
                <TextInput
                  autoCapitalize={'none'}
                  autoCompleteType={'off'}
                  autoCorrect={false}
                  spellCheck={false}
                  style={styles.textInput}
                  onChange={(e) => {
                    this.setState({ destination: e.nativeEvent.text });
                  }}
                />
              </View>
              <View style={styles.inputView}>
                <Text style={styles.sectionTitle}>Number of riders (1-4)</Text>
                <TextInput
                  keyboardType={'number-pad'}
                  style={styles.textInput}
                  onChange={(e) => {
                    this.setState({ numRiders: e.nativeEvent.text });
                  }}
                />
              </View>
              <View style={styles.inputView}>
                <Text style={styles.sectionTitle}>Safety level (0-9)</Text>
                <TextInput
                  keyboardType={'number-pad'}
                  style={styles.textInput}
                  placeholder="Ex: 9 is emergency."
                  placeholderTextColor="#a3aaad"
                  onChange={(e) => {
                    this.setState({ safetyLevel: e.nativeEvent.text });
                  }}
                />
              </View>
              <LocationContext.Consumer>
                {({ setLat, setLong }) => {
                    return (
                      <TouchableOpacity 
                        onPress={() => {
                          this.requestButton(setLat, setLong)
                          }
                        }
                        style={styles.button}>
                        <Text style={{ alignSelf: 'center' }}> Request ride </Text>
                      </TouchableOpacity>
                    )
                  }
                }
            </LocationContext.Consumer>
          </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    inputView: {
      backgroundColor: 'white',
      borderRadius: 5,
      width: Dimensions.get('window').width - 20,
      height: 60,
      borderWidth: 1,
      borderColor: '#ebeff1',
      marginLeft: 10,
      marginRight: 10,
      shadowOpacity: 0.02,
      marginBottom: 10,
    },
    textInput: {
      height: 50,
      flex: 1,
      padding: 10,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height/2.2,
      marginBottom: 10,
    },
    back: {
      alignItems: "flex-start",
    },
    sectionTitle: {
      alignItems: "flex-start",
      marginLeft: 10,
      fontWeight: 'bold',
      color: '#55D7F9',
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
      alignSelf: 'center',
      padding: 10,
    },
});

export default RequestPage;
