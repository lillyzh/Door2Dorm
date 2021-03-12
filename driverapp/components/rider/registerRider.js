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
import { SaveItem } from "./databaseHelper";
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName: "",
        lastName: "",
        sunet: "",
        password: "",
        phoneNumber: "",

        // TODO: 
        // Currently not used because the Student Model does not contain these values
        numRiders: 0,
        currentLoc: "",
        destination: "",
        emailAddress: "",

    };
    this.register = this.register.bind(this);
    this.switchToLogin = this.switchToLogin.bind(this);
  }

  switchToLogin() {
    this.props.history.push("/loginRider")
  }

  register() {
    var stuID = /^\d{8}$/;
    var phoneno = /^\d{10}$/;
    let url = 'http://127.0.0.1:8000/students/placeholder/cr-student/'; // append slash required by Django

    if (this.state.firstName.length < 1) {
      alert("You must enter a first name")
    } else if (this.state.lastName.length < 1) {
      alert("You must enter a last name")
    } else if (this.state.sunet.length > 8 || !/^[a-zA-Z]+$/.test(this.state.sunet)) {
      // Todo: Send validation to Stanford DB that this is a real sunet ID
      alert("Double check your Sunet contains less than 9 characters")
    } else if (!this.state.phoneNumber.match(phoneno)) {
      alert("Double check your phone number is valid, numbers only please!")
    } else {
      // json file that will be sent to the POST endpoint
      let body = {
        "first": this.state.firstName,
        "last": this.state.lastName,
        "sunet": this.state.sunet,
        "password": this.state.password,
        "phone": this.state.phoneNumber,
      }
      SaveItem('sunet', this.state.sunet);
      axios.post(url, body)
        .then(function(res) {
          this.props.history.push("/rideRequest");
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
                      autoCompleteType={'off'}
                      autoCorrect={false}
                      spellCheck={false}
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      onChange={(e) => {
                          this.setState({ firstName: e.nativeEvent.text });
                      }}
                />

                <Text style={styles.sectionTitle}>Last Name</Text>
                <TextInput
                      autoCompleteType={'off'}
                      autoCorrect={false}
                      spellCheck={false}
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      onChange={(e) => {
                          this.setState({ lastName: e.nativeEvent.text });
                      }}
                />

                <Text style={styles.sectionTitle}>Sunet (No @stanford.edu)</Text>
                <TextInput
                      autoCapitalize={'none'}
                      autoCompleteType={'off'}
                      autoCorrect={false}
                      spellCheck={false}
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      onChange={(e) => {
                          this.setState({ sunet: e.nativeEvent.text });
                      }}
                />

                <Text style={styles.sectionTitle}>Password</Text>
                <TextInput
                      autoCapitalize={'none'}
                      autoCompleteType={'off'}
                      autoCorrect={false}
                      spellCheck={false}
                      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                      onChange={(e) => {
                          this.setState({ password: e.nativeEvent.text });
                      }}
                />

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
                  onPress={this.register}
                  title="Register"
                  accessibilityLabel="Register"
                  color='#55D7F5'
                />
                <Button
                      style={styles.button}
                      onPress={this.switchToLogin}
                      title="Already Have an Account? Login"
                      accessibilityLabel="Login"
                      color='#55D7F5'
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

export default RegisterPage;
