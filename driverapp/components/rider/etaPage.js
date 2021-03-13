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
                  <Text style={styles.sectionTitle}>Your current latitude is {cur_lat}.</Text>
                  <Text style={styles.sectionTitle}>Your current longitude is {cur_long}. </Text>
                  </>
                  )

          }
        }
        </LocationContext.Consumer>
        <Text style={styles.sectionTitle}>There are currently {this.state.queuePosition} ahead of you in the queue</Text>
        <Text style={styles.sectionTitle}>You have an estimated {this.state.timeLeft} minutes before 5-SURE arrives</Text>
        <Button
          title="Leave Queue"
          onPress={this.leaveQueue}
        />
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
      body: {
        backgroundColor: Colors.white,
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
      },
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height/2,
      },
});

export default EtaPage;
