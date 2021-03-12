import React from 'react';

import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    Button,
    Text,
    StatusBar,
    View,
  } from 'react-native';
  
  import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';

class LoginRiderPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        sunet: "",
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
        this.props.history.push("/registerRider");
    }

    login() {
        this.props.history.push("/rideRequest");
    }

    render() {
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Login</Text>
              <Text style={styles.sectionTitle}>SUNet</Text>
              <TextInput
                  style={styles.textInput}
                  onChange={(e) => {
                      this.setState({ sunet: e.nativeEvent.text });
                  }}
              />
              <Text style={styles.sectionTitle}>Password</Text>
              <TextInput
                  style={styles.textInput}
                  onChange={(e) => {
                      this.setState({ password : e.nativeEvent.text });
                  }}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                  onPress={this.login}
                  title="Login"
                  accessibilityLabel="Login"
                  color='#55D7F5'
              />
              <View style={styles.separator} />
              <Button
                  onPress={this.switchToRegister}
                  title="Don't Have an Account? Register"
                  accessibilityLabel="Register"
                  color='#55D7F5'
              />
              <Button
                  onPress={this.backHome}
                  title="Back Home"
                  accessibilityLabel="Back Home"
                  color='#55D7F5'
              />
            </View>
          </SafeAreaView>
        </>
      );
    }
  }
  
  const styles = StyleSheet.create({
    textInput: { 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        fontWeight: '600',
        color: Colors.black,
        marginVertical: 32,
    },
    buttonContainer: {
      alignSelf: 'center',
      justifyContent:"flex-start",
      alignItems: 'center',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
    },
  });
  
  export default LoginRiderPage;
  
