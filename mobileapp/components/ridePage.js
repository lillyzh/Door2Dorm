import React from 'react';
import {
  Text,
  TextInput,
  Button,
  Alert,
  View,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

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
    this.setState({ studentId: this.props.studentInfo.studentId });
  }

  logoutButton() {
      this.props.onLogout();
  }

  requestButton() {

    var numPassengers = /^\d{1}$/;
    var safetyNum = /^\d{1}$/;
    let url = 'http://127.0.0.1:8000/rides/placeholder/cr-ride';

    if (this.state.currentLoc.length < 1) {
        alert("You must enter a current location")
    } else if (this.state.destination.length < 1) {
        alert("You must enter a destination")
    } else if (!this.state.numRiders.match(numPassengers)) {
      alert("Double check your number of riders is a digit less than 5")
    } else if (!this.state.safetyLevel.match(safetyNum)) {
        alert("Double check your safety level is a digit between 1 and 9")
    } else {
    
      let body = {
        // case must match that of backend
        "student_id": this.state.studentId,
        "current_loc": this.state.currentLoc,
        "destination": this.state.destination,
        "num_riders": this.state.numRiders,
        "safety_level": this.state.safetyLevel,
      }

      // TODO: Once fully connected need to move this.props.onLogin() to the success .then portion so we only move you with a successful request.
      this.props.onRequest(body);
      console.log(body);
      axios.get(url, {
        params: body
      }).then(function(res) {
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

  // TODO: Need input validation so the values sent over isn't None
  render() {
    return (
          <View style={styles.body}>
                <Text style={styles.sectionTitle}>Current Location</Text>
                <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      onChange={(e) => {
                          this.setState({ currentLoc: e.nativeEvent.text });
                      }}
                />

                <Text style={styles.sectionTitle}>Destination</Text>
                <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      onChange={(e) => {
                          this.setState({ destination: e.nativeEvent.text });
                      }}
                />

                <Text style={styles.sectionTitle}>Number of Riders</Text>
                <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      keyboardType={'number-pad'}
                      onChange={(e) => {
                          this.setState({ numRiders: e.nativeEvent.text });
                      }}
                />

                <Text style={styles.sectionTitle}>Safety Level</Text>
                <Text style={styles.sectionTitle}>Rate 0-9 (0 no problem, 9 emergency)</Text>
                <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      keyboardType={'number-pad'}
                      onChange={(e) => {
                          this.setState({ safetyLevel: e.nativeEvent.text });
                      }}
                />

                <Button
                      title="Request Ride"
                      onPress={this.requestButton}
                />
                <Button
                    title="Logout"
                    onPress={this.logoutButton}
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
      }
});

export default RequestPage;
