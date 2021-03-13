import React from 'react';
import {
  Text,
  TextInput,
  Button,
  Alert,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { LocationContext } from '../locationContext.js';

class EtaPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queuePosition: 4,
      timeLeft: 17,
    };
    this.leaveQueue = this.leaveQueue.bind(this);
  }

  leaveQueue() {
    // Here we need to post that the person wants to get out of the queue
    this.props.history.push("/rideRequest");
  }


  componentDidMount() {
    // Here we should send the request for number of people in the queue and expected time left.
  }

  render() {
    return (
      <View style={styles.body}>
        <LocationContext.Consumer>
        {({ cur_lat, cur_long }) => {
            let cur_lat_num = Number(cur_lat)
            let cur_long_num = Number(cur_long)
            return (
                    <>
                    <StatusBar />
                    <MapView
                    initialRegion={{
                      latitude: cur_lat_num,
                      longitude: cur_long_num,
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
        <View>
          <Text style={styles.confirmation}>Your ride is registered! Current wait time is approximately {this.state.timeLeft} minutes.</Text>
          <Text style={styles.detailTitle}>Ride Details</Text>
          <View style={styles.message}>
            <Text>Queue positon: {this.state.queuePosition}</Text>
            <Text>Driver name: TBD </Text>
            <Text>License plate: TBD </Text>

            {/* TODO: Update these addresses from ridePage.js */}
            <Text>From: 123 Stanford Dr. Palo Alto, CA 97862 </Text>
            <Text>To: 139 Green Dr. Palo Alto, CA 97862 </Text>
          </View>
          <Text style={styles.detailTitle}>Notes</Text>
          <View style={styles.message}>
            <Text>We will let you know when a driver is assigned. Please call 911 if you are feeling unsafe.</Text>
          </View>
        </View>
        <TouchableOpacity onPress={this.leaveQueue} style={styles.button}>
              <Text style={{ alignSelf: 'center' }}> Leave queue </Text>
        </TouchableOpacity>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
    confirmation: {
      fontSize: 30,
      marginLeft: 10,
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 20,
    },
    message: {
      marginTop: 5,
      marginLeft: 10,
    },
    detailTitle: {
      marginTop: 10,
      marginLeft: 10,
      color: 'gray',
      fontWeight: 'bold',
    },  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height/2.2,
    },
    button: {
      backgroundColor: '#f26d64',
      borderRadius: 11,
      color: 'black',
      overflow: 'hidden',
      textAlign:'center',
      width: 150,
      height: 40,
      margin: 10,
      alignSelf: "center",
      padding: 10,
      marginTop: 20,
    },
});

export default EtaPage;
