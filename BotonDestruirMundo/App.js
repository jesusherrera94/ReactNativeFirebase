/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform, Image,
  StyleSheet,TouchableHighlight,
  Text, Button,ToastAndroid,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

/*___________________________________________________________________________________*/

class HomeScreen extends React.Component {

  render() {
    /*variable navigation que permite el desplazamiento entre activities*/
    const { navigate } = this.props.navigation;
    let icono={uri:'http://reactnativetests.000webhostapp.com/nuclear-symbol1.png'};
    return (
      <View style={styles.container}>
        <Image source={icono} style={styles.imageStyle}/>
        <Text style={styles.welcome}>
          Bienvenido Sr. Presidente
        </Text>
        <Button onPress= {() => navigate('Chat')} title="Destruir el Mundo" color="#ff0000" />
      </View>
    );
  }

/*___________________________________________________________________________________*/

}

export default class App extends Component<{}> {
  render() {
    return (
    <SimpleApp/>
    );
  }
}

/*___________________________________________________________________________________*/


class ChatScreen extends React.Component {

  /*Titulo del action bar*/
  static navigationOptions = {
    title: 'Super App',
  };

  constructor(props) {
      super(props);
      this.countUp = this.countUp.bind(this);
      this.state = {i: 0,};
    }

 countUp(){
    this.setState({
      i: 1,}
    );
  }

  mensaje(){
    ToastAndroid.show('Has Ordenado destruir el Mundo ¡CON ÉXITO!', ToastAndroid.LONG);
  }

  imageShow(){
    let icono={uri:'http://reactnativetests.000webhostapp.com/nuclear-symbol1.png'};
    return(
      <Image source={icono} style={styles.imageStyle}/>
    );
  }

  render() {
let imagen={uri:'http://reactnativetests.000webhostapp.com/maxresdefault.jpg'};
    return (
        <View style={styles.container}>
        <TouchableHighlight onPress={this.countUp}>
        <Image source={imagen} style={styles.imageStyle}/>
        </TouchableHighlight>
        <Text style={styles.welcome}>BOOOM</Text>
        <Text style={styles.welcome}>{this.state.i}</Text>
        {this.mensaje()}
        </View>
    );
  }

}


{/*Siempre va al final*/}
const SimpleApp = StackNavigator({
  /*Variable global, asignación de qué activity pertenece*/
  Home: { screen: HomeScreen,  navigationOptions: {header: null, }},
  Chat: { screen: ChatScreen },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  letraSuperGrande: {
    fontSize: 200,
    color: '#ff0000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  imageStyle: {
    width: 300,
    height: 300,
  },
});
