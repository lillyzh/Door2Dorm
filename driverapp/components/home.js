import React from 'react';

import { 
  StyleSheet,
  View,
  Button,
  Text,
  Image, 
  Dimensions,
  TouchableOpacity 
} from 'react-native';

class HomePage extends React.Component {
    constructor(props) {
      super(props);
        this.state = {

      };
      this.driverEnters = this.driverEnters.bind(this);
      this.riderEnters = this.riderEnters.bind(this);
    }

    driverEnters() {
      this.props.history.push("/login")
    }

    riderEnters() {
      this.props.history.push("/loginRider")
    }

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.body}>
            <Text style={styles.logoText}> Door2Dorm </Text>
            <Image
              style={styles.logo}
              source={require('../img/Door2Dorm2.png')}
            />
            <Text style={styles.optionText}> I am a </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this.riderEnters}>
                <Text style={styles.button}> Rider </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.driverEnters}>
                <Text style={styles.button}> Driver </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }

  const { height, width } = Dimensions.get('window');
  
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
    logoText: {
        color: 'black',
        justifyContent:'center',
        fontSize: 50,
        fontWeight: 'bold',
    },
    optionText: {
        color: 'black',
        justifyContent:'center',
        fontSize: 20,
        height: 30,
    },
    logo: {
      width: 200,
      height: 200,
    },
    button: {
      backgroundColor: '#55D7F5',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 11,
      color: 'black',
      fontSize: 20,
      overflow: 'hidden',
      padding: 5,
      textAlign:'center',
      width: 100,
      height: 40,
      margin: 10,
    },
    buttonContainer: {
      flexDirection: "row",
    },
  });
  
  export default HomePage;
  