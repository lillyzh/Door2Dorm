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
        phoneNumber: "",

        // TODO: 
        // Currently not used because the Student Model does not contain these values
        numRiders: 0,
        currentLoc: "",
        destination: "",
        emailAddress: "",

    };
    this.submitButton = this.submitButton.bind(this);
  }

  submitButton() {

    var stuID = /^\d{8}$/;
    var phoneno = /^\d{10}$/;
    let url = 'http://127.0.0.1:8000/students/placeholder/cr-student';

    if (this.state.firstName.length < 1) {
      alert("You must enter a first name")
    } else if (this.state.lastName.length < 1) {
      alert("You must enter a last name")
    } else if (this.state.sunet.length > 8 || !/^[a-zA-Z]+$/.test(this.state.sunet)) {
      // Todo: Send validation to Stanford DB that this is a real sunet ID
      alert("Double check your Sunet contains less than 9 characters")
    } else if (!this.state.studentId.match(stuID)) {
      // Todo: Send validation to Stanford DB that this is a real sunet ID
      alert("Make sure you use your student ID with only one leading 0")
    } else if (!this.state.phoneNumber.match(phoneno)) {
      alert("Double check your phone number is valid, numbers only please!")
    } else {
      let body = {
        "first": this.state.firstName,
        "last": this.state.lastName,
        "sunet": this.state.sunet,
        "student_id": this.state.studentId,
        "phone": this.state.phoneNumber,
      }
      // TODO: Once fully connected need to move this.props.onLogin() to the success .then portion so we only move you with a successful request.
      this.props.onLogin(body);
      axios.get(url, {
        params: {
                        "first": this.state.firstName,
                        "last": this.state.lastName,
                        "sunet": this.state.sunet,
                        "student_id": this.state.studentId,
                        "email": this.state.sunet + "@stanford.edu",
                        "phone": this.state.phoneNumber,
                      }
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

                <Text style={styles.sectionTitle}>Sunet (No @stanford.edu)</Text>
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

                <Text style={styles.sectionTitle}>Phone Number (Numbers only please)</Text>
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

                {/* <Text style={styles.sectionTitle}>Email</Text>
                <TextInput
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      keyboardType={'email-address'}
                      onChange={(e) => {
                          this.setState({ emailAddress: e.nativeEvent.text });
                      }}
                /> */}

                <Button
                      title="Register"
                      onPress={this.submitButton}
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
