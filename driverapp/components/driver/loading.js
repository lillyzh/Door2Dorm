import React from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    TextInput,
    Button,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
  } from 'react-native';
  
  import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';

class LoadingPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
      this.logout = this.logout.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
      setTimeout(function(history) {
        console.log(history);
        history.push("/pickup");
      }, 4000, this.props.history);
    }

    logout() {
      this.props.history.push("/")
    }

    render() {
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <View style={styles.container} >
            <View style={styles.body}>
              <Text style={styles.text}>Waiting for a ride...</Text>
              <Image
                style={styles.image}
                source={require('../../img/loading.jpg')}
              />
              <TouchableOpacity onPress={this.logout} style={styles.button}>
                  <Text> Log Out </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      alignItems:'center',
      justifyContent:'center',
      height: '100%'
    },
    body: {
      alignSelf: 'center',
      justifyContent:"flex-start",
      alignItems: 'center',
      position:"absolute",
    },
    text: {
      textAlign: 'center',
      marginHorizontal: 32,
      marginVertical: 32,
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },
    image: {
      width: 200,
      height: 200,
    },
    button: {
      backgroundColor: '#55D7F5',
      borderRadius: 11,
      color: 'black',
      overflow: 'hidden',
      textAlign:'center',
      width: 150,
      height: 40,
      margin: 10,
      alignItems: "center",
      padding: 10,
    },
  });
  
  export default LoadingPage;
  