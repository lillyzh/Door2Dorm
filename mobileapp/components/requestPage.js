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
        firstName: "",
        lastName: "",
        sunet: "",
        studentId: "",
        emailAddress: "",
        phoneNumber: "",

        // TODO: 
        // Currently not used because the Student Model does not contain these values
        numRiders: 0,
        currentLoc: "",
        destination: "",

    };
    this.submitButton = this.submitButton.bind(this);
  }

  submitButton() {
    //Do the error handling especiall for validity
    // let url = 'http://127.0.0.1:8000/students/placeholder/cr-student';

    // axios.get(url, {
    //   params: {
    //     "first": this.state.firstName,
    //     "last": this.state.lastName,
    //     "sunet": this.state.sunet,
    //     "student_id": this.state.studentId,
    //     "phone": this.state.phoneNumber,
    //     "email": this.state.emailAddress
    //   }
    // }).then(function(res) {
    //     console.log('Response received\n');
    //     console.log(res.data);
    //   })
    //   .catch(function(err) {
    //     console.log("Error making the call");
    //     console.log(err);
    //     if (err.request) {
    //       console.log(err.request);
    //     }
    //   });

      const socket = new WebSocket('ws://' + window.location.host + '/ws/student/');
      socket.send(JSON.stringify({
        'type': 'student',
        'first_name': this.state.firstName,
        'last_name': this.state.lastName,
        'sunet': this.state.sunet,
        'email': this.state.emailAddress,
        'phone': this.state.phoneNumber,
      }));
    }

  render() {
    return (
          <View style={styles.body}>
                <Text style={styles.sectionTitle}>First Name</Text>
                <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      onChange={(e) => {
                          this.setState({ firstName: e.nativeEvent.text });
                      }}
                />

                <Text style={styles.sectionTitle}>Last Name</Text>
                <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      onChange={(e) => {
                          this.setState({ lastName: e.nativeEvent.text });
                      }}
                />

                <Text style={styles.sectionTitle}>Sunet</Text>
                <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      onChange={(e) => {
                          this.setState({ sunet: e.nativeEvent.text });
                      }}
                />

                <Text style={styles.sectionTitle}>Student ID (Number)</Text>
                <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      keyboardType={'number-pad'}
                      onChange={(e) => {
                          this.setState({ studentId: e.nativeEvent.text });
                      }}
                />
                {/* // COMMENT: Not rendered because the Student Model does not contain these values */}
                {/* <Text style={styles.sectionTitle}>Number of Riders</Text>
                <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      keyboardType={'number-pad'}
                      onChange={(e) => {
                          this.setState({ numRiders: e.nativeEvent.text });
                      }}
                /> */}

                <Text style={styles.sectionTitle}>Phone Number</Text>
                <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      keyboardType={'phone-pad'}
                      onChange={(e) => {
                          this.setState({ phoneNumber: e.nativeEvent.text });
                      }}
                />

                {/* // COMMENT: Not rendered because the Student Model does not contain these values */}
                {/* <Text style={styles.sectionTitle}>Current Location</Text>
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
                /> */}

                <Text style={styles.sectionTitle}>Email</Text>
                <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      keyboardType={'email-address'}
                      onChange={(e) => {
                          this.setState({ emailAddress: e.nativeEvent.text });
                      }}
                />

                <Button
                      title="Submit"
                      onPress={this.submitButton}
                />
                <Text> First Name: {this.state.firstName} </Text>
                <Text> Last Name: {this.state.lastName} </Text>
                <Text> Sunet: {this.state.sunet} </Text>
                <Text> Student ID: {this.state.studentid} </Text>
                {/* // COMMENT: Not rendered because the Student Model does not contain these values */}
                {/* <Text> Number Riders: {this.state.numRiders} </Text> */}
                <Text> Phone Number: {this.state.phoneNumber} </Text>
                {/* // COMMENT: Not rendered because the Student Model does not contain these values */}
                {/* <Text> Current Location: {this.state.currentLoc} </Text>
                <Text> Destination: {this.state.destination} </Text> */}
                <Text> Email: {this.state.emailAddress} </Text>
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
