import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
  } from 'react-native';
  
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';

import { DriverContext } from '../driverContext.js';
import axios from 'axios';

class LoadingPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        ride_id: ''
      };
      this.componentDidMount = this.componentDidMount.bind(this);
      this.acceptRide = this.acceptRide.bind(this);
    }

    componentDidMount() {
      console.log("here");
      var phoneNumber = this.context.driver_phone_number;
      this.context.setRideID(this.state.ride_id);
      var self = this;
      let payload = {
        "driver_phone": phoneNumber,
      }
      const url = 'http://127.0.0.1:8000/drivers/placeholder/ask-assignment/';
      axios.post(url, payload)
        .then(function(res) {
          console.log('Response received\n');
          console.log(res.data);
          var ride_id = res.data['id']
          if (!ride_id) {
            setTimeout(function() {
              self.componentDidMount();
            }, 4000);
          } else {
            console.log(ride_id);
            self.context.setRideID(ride_id);
            self.acceptRide(phoneNumber, ride_id);
          }       
        })
        .catch(function(err) {
          console.log("Error making the call");
          console.log(err);
          if (err.request) {
            console.log(err.request);
          }
        });
    }

    acceptRide(driver_id, ride_id) {
    // JSON file that will be sent to the POST endpoint
      let payload = {
        "driver_phone": driver_id,
        "ride_id": ride_id,
      }
      const url = 'http://127.0.0.1:8000/drivers/placeholder/accept-assignment/';
      var self = this;
      axios.post(url, payload)
        .then(function(res) {
          console.log('Response received\n');
          console.log(res.data);
          self.props.history.push("/pickup");
        })
        .catch(function(err) {
          console.log("Error making the call");
          console.log(err);
          if (err.request) {
            console.log(err.request);
          }
        });
    }

    render() {
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <View style={styles.container} >
            <View style={styles.body}>
              <Text style={styles.text}>Waiting for a ride...</Text>
              <Image
                style={styles.image}
                source={require('../../img/loading.jpg')}
              />
            </View>
          </View>
        </>
      );
    }
  }
  
  LoadingPage.contextType = DriverContext;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      alignItems:'center',
      justifyContent:'center',
      height: '100%'
    },
    body: {
      alignSelf: 'center',
      justifyContent:"flex-start",
      alignItems: 'center',
      position:"absolute",
    },
    text: {
      textAlign: 'center',
      marginHorizontal: 32,
      marginVertical: 32,
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },
    image: {
      width: 200,
      height: 200,
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
  
  export default LoadingPage;
