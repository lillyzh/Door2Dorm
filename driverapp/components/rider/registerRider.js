import React from 'react';
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
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
        phoneNumber: "",
        emailAddress: "",
        password: "",

        // TODO: 
        // Currently not used because the Student Model does not contain these values
        numRiders: 0,
        currentLoc: "",
        destination: "",
        

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
        "phone": this.state.phoneNumber,
        "email": this.state.emailAddress,
        "password": this.state.password,
      }
      // TODO: Once fully connected need to move this.props.history.push() to the success .then portion so we only move you with a successful request.
      this.props.history.push("/rideRequest");
      let payload =  {
        first: this.state.firstName,
        last: this.state.lastName,
        sunet: this.state.sunet,
        email: this.state.emailAddress,
        phone: this.state.phoneNumber};
      SaveItem('sunet', this.state.sunet);
      axios.post(url, payload)
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

  // TODO: Need input validation so the values sent over isn't None
  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../img/Door2Dorm2.png')}
            />
            <View style={styles.inputView}>
                <TextInput
                  autoCompleteType={'off'}
                  autoCorrect={false}
                  spellCheck={false}
                  style={styles.textInput}
                  placeholder="First Name"
                  placeholderTextColor="#a3aaad"
                  onChange={(e) => {
                    this.setState({ firstName: e.nativeEvent.text });
                  }}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                  autoCompleteType={'off'}
                  autoCorrect={false}
                  spellCheck={false}
                  style={styles.textInput}
                  placeholder="Last Name"
                  placeholderTextColor="#a3aaad"
                  onChange={(e) => {
                    this.setState({ lastName: e.nativeEvent.text });
                  }}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                  autoCapitalize={'none'}
                  autoCompleteType={'off'}
                  autoCorrect={false}
                  spellCheck={false}
                  style={styles.textInput}
                  placeholder="Sunet ID"
                  placeholderTextColor="#a3aaad"
                  onChange={(e) => {
                    this.setState({ sunet: e.nativeEvent.text });
                  }}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                  autoCapitalize={'none'}
                  autoCompleteType={'off'}
                  autoCorrect={false}
                  spellCheck={false}
                  style={styles.textInput}
                  placeholder="Phone Number"
                  placeholderTextColor="#a3aaad"
                  onChange={(e) => {
                    this.setState({ phoneNumber: e.nativeEvent.text });
                  }}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                  autoCapitalize={'none'}
                  autoCompleteType={'off'}
                  autoCorrect={false}
                  spellCheck={false}
                  style={styles.textInput}
                  placeholder="Email"
                  placeholderTextColor="#a3aaad"
                  onChange={(e) => {
                    this.setState({ emailAddress: e.nativeEvent.text });
                  }}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                  autoCompleteType={'off'}
                  autoCorrect={false}
                  spellCheck={false}
                  style={styles.textInput}
                  placeholder="Password"
                  placeholderTextColor="#a3aaad"
                  secureTextEntry={true}
                  onChange={(e) => {
                    this.setState({ password : e.nativeEvent.text });
                  }}
                />
            </View>
            <TouchableOpacity onPress={this.register} style={styles.registerBtn}>
                <Text>Register</Text>
            </TouchableOpacity>
            <Button
                style={styles.button}
                onPress={this.switchToLogin}
                title="Already Have an Account? Sign In"
                accessibilityLabel="Sign In"
                color='black'
              />
          </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
   },
  back: {
    alignItems: "flex-start",
  },
  logo: {
    width: 170,
    height: 170,
    marginBottom: 40,
    marginTop: 30,
  },
  inputView: {
    backgroundColor: "#eceeee",
    borderRadius: 30,
    width: 350,
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
  registerBtn: {
    width: 150,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#55D7F5",
  },
  forgot_button: {
    height: 30,
    marginBottom: 10,
  },
});

export default RegisterPage;
