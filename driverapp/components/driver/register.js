import React from 'react';

import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Text,
    StatusBar,
    Button,
    Image,
    View,
  } from 'react-native';
  
  import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';

class RegisterPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        ID: "",
        password: "",
        emailAddress: "",
        driverLicense: "",
      };
      this.register = this.register.bind(this);
      this.switchToLogin = this.switchToLogin.bind(this);
    }

    register() {
        this.props.history.push("/newRide")
    }

    switchToLogin() {
        this.props.history.push("/login")
    }

    render() {
      return (
        <>
          <StatusBar barStyle="dark-content" />
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
                  autoCapitalize={'none'}
                  autoCompleteType={'off'}
                  autoCorrect={false}
                  spellCheck={false}
                  style={styles.textInput}
                  placeholder="Driver license"
                  placeholderTextColor="#a3aaad"
                  onChange={(e) => {
                    this.setState({ driverLicense: e.nativeEvent.text });
                  }}
                />
            </View>
              <View style={styles.inputView}>
                <TextInput
                  autoCompleteType={'off'}
                  autoCorrect={false}
                  spellCheck={false}
                  style={styles.textInput}
                  placeholder="Username or Sunet ID"
                  placeholderTextColor="#a3aaad"
                  onChange={(e) => {
                    this.setState({ ID: e.nativeEvent.text });
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
                  accessibilityLabel="Login"
                  color='black'
              />
              </View> 
          </SafeAreaView>
        </>
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
      marginTop: 20,
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
      marginTop: 20,
      backgroundColor: "#55D7F5",
    },
    forgot_button: {
      height: 30,
      marginBottom: 10,
    },
  });
  
  export default RegisterPage;
  