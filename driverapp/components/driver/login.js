import React from 'react';

import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    Button,
    Text,
    StatusBar,
    View,
    Image,
    TouchableOpacity
  } from 'react-native';

  /* This is the LoginPage for the driver and is rendered when the user selects the 
     "Driver" option on the main page. */
class LoginPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
      };
      this.switchToRegister = this.switchToRegister.bind(this);
      this.login = this.login.bind(this);
      this.backHome = this.backHome.bind(this);
    }

    backHome() {
        this.props.history.push("/");
    }

    switchToRegister() {
        this.props.history.push("/register");
    }

    login() {
        this.props.history.push("/loading");
    }

    /* Render the Driver Login Page. */
    render() {
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <View style={styles.back}>
                <Button
                  onPress={this.backHome}
                  title="Back"
                  accessibilityLabel="Back"
                  color='black'
                />
            </View>
            <View style={styles.container}>
              <Image
                style={styles.logo}
                source={require('../../img/Door2Dorm2.png')}
              />
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
                    this.setState({ email: e.nativeEvent.text });
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
                  placeholder="Password"
                  placeholderTextColor="#a3aaad"
                  secureTextEntry={true}
                  onChange={(e) => {
                    this.setState({ password : e.nativeEvent.text });
                  }}
                />
              </View>
              {/* TODO: Implement forgot password function */}
              <TouchableOpacity>
                  <Text style={styles.forgot_button}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.login} style={styles.loginBtn}>
                  <Text style={styles.loginText}>LOGIN</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.separator} />
              <Button
                  onPress={this.switchToRegister}
                  title="New user? Sign Up"
                  accessibilityLabel="New user? Sign Up"
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
      marginTop: 70,
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
    loginBtn: {
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
  
  export default LoginPage;