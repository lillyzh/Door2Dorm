import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    Image,
  } from 'react-native';
  
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';

import { DriverContext } from '../driverContext.js';
import axios from 'axios';

/* The Loading Page renders when the Driver registers or logs in. */
class LoadingPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        ride_id: ''
      };
      this.componentDidMount = this.componentDidMount.bind(this);
      this.acceptRide = this.acceptRide.bind(this);
    }

    /* After mounting the LoadingPage component, every 4 seconds, send a POST
       HTTP request to attempt to get a ride assignment from the server. */
    componentDidMount() {
      var phoneNumber = this.context.driver_phone_number;
      this.context.setRideID(this.state.ride_id);
      var self = this;
      let payload = {
        "driver_phone": phoneNumber,
      }
      const url = 'http://127.0.0.1:8000/drivers/placeholder/ask-assignment/';
      // const url = 'http://ec2-3-138-107-41.us-east-2.compute.amazonaws.com:8000/drivers/placeholder/ask-assignment/';
      
      /* Every 4 seconds, send a POST HTTP request to attempt to get a ride assignment 
         from the server. If success, set the ride_id, the Ride object, and the Student object 
         in the Driver Context. Then calls acceptRide() to finish up the ride assignment process. */
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
            self.context.setRideRequest(res.data);
            self.context.setStudent(res.data["student"]);
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

    /* This function is called after the driver is assigned a ride. It sends a POST request to the server to notify that
       the driver has accepted the ride. On success, this then navigates the driver to the Pickup Page. */
    acceptRide(driver_id, ride_id) {
    // JSON file that will be sent to the POST endpoint
      let payload = {
        "driver_phone": driver_id,
        "ride_id": ride_id,
      }
      const url = 'http://127.0.0.1:8000/drivers/placeholder/accept-assignment/';
      // const url = 'http://ec2-3-138-107-41.us-east-2.compute.amazonaws.com:8000/drivers/placeholder/accept-assignment/';
      var self = this;
      axios.post(url, payload)
        .then(function(res) {
          console.log('Response received\n');
          console.log(res.data);
          /* On success, this then navigates the driver to the Ride Acceptance Page. */
          self.props.history.push("/newRide");
        })
        .catch(function(err) {
          console.log("Error making the call");
          console.log(err);
          if (err.request) {
            console.log(err.request);
          }
        });
    }

    /* This renders the LoadingPage. */
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
