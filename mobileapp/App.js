/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

//import necessary components
import RegisterPage from './components/registerPage';
import RequestPage from './components/ridePage';
import EtaPage from './components/etaPage';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        userIsLoggedIn: false,
        rideRequested: false,
        firstName: "",
        lastName: "",
        sunet: "",
        studentId: "",
        phoneNumber: "",
        numRiders: "",
        currentLoc: "",
        destination: "",
        safetyLevel: "",
    };
  }

  leaveQueue = () => {
    this.setState({
      rideRequested: false,
      numRiders: "",
      currentLoc: "",
      destination: "",
      safetyLevel: "",
    });
  }

  logout = () => {
    this.setState({
      userIsLoggedIn: false,
      firstName: "",
      lastName: "",
      sunet: "",
      studentId: "",
      phoneNumber: "",
    });
  }

  hitRequest = (body) => {
    this.setState({
      rideRequested: true,
      currentLoc: body.currentLoc,
      destination: body.destination,
      numRiders: body.numRiders,
      safetyLevel: body.safetyLevel,
    })
  }

  hitSubmit = (body) => {
      this.setState({
        userIsLoggedIn : true,
        firstName: body.firstName,
        lastName: body.lastName,
        sunet: body.sunet,
        studentId: body.studentId,
        phoneNumber: body.phoneNumber,
      });
    }

    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>

                {
                    this.state.userIsLoggedIn && this.state.rideRequested ?
                        <EtaPage oldState={this.state} onLeave={this.leaveQueue} />
                    :
                        this.state.userIsLoggedIn ?
                          <RequestPage onRequest={this.hitRequest} studentInfo={this.state} onLogout={this.logout} />
                        :
                          <RegisterPage onLogin={this.hitSubmit} />
                }
                </ScrollView>
                </SafeAreaView>
            </>
        );
    }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
