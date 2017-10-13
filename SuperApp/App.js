/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,Button,
  StyleSheet,
  Text,Image,
  View, TouchableHighlight,
  TextInput,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import {Container,Footer,FooterTab} from 'native-base';
import * as firebase from 'firebase';



{/*Para conectarse con firebase*/}

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };
const firebaseConexion = firebase.initializeApp(firebaseConfig);




const options = {
  title: 'Selecciona una imagen para subir',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}


{/*Activity 1*/}
class HomeScreen extends React.Component {
  render() {
    /*variable navigation que permite el desplazamiento entre activities*/
    const { navigate } = this.props.navigation;
    let icono={uri:'http://reactnativetests.000webhostapp.com/logo'};
    return (
      <View style={styles.container}>
        <Image source={icono} style={styles.imageStyle}/>
        <Text style={styles.welcome}>
          Bienvenido a React Native!
        </Text>
        <Button onPress= { () => navigate('Chat')} title="Entrar" color="#000000" />
      </View>
    );
  }
}



{/*export defaul le dice al dispositivo que esto es lo que se mostrará; Permite la iniciacion de los activitys*/}
export default class App extends Component<{}> {
  render() {
    /*Se renderiza lo que devuelva simple app*/
return (<SimpleApp />);
  }
}



{/*Activity 2*/}
class ChatScreen extends React.Component {

  /*Titulo del action bar*/
  static navigationOptions = {
    title: 'Super App',
  };

  constructor(props) {
    super(props)

    /*Seccion declarativa de variables*/
    this.onPickImage = this.onPickImage.bind(this)
    this.onReset = this.onReset.bind(this)
    this.insertFirebase = this.insertFirebase.bind(this);

    this.state = {
      avatar: null,
      texto: '',
      uid: 'aCO0ZUHTvvSf5PZAOX4LCs9WV2O2',
      file: '',
    }
  }

  onPickImage() {
    ImagePicker.showImagePicker(options, response => {
      if (!response.didCancel && !response.error) {
        const source = { uri: response.uri }
        this.setState({
          avatar: source,
          file: response,
        })
      }
    })
  }

  onReset() {
    this.setState({
      avatar: null,
    })
  }

  insertFirebase(){
    firebase.database().ref('users/' + this.state.uid).set({
      Descripcion: this.state.texto,
      NombreImagen: this.state.uid+".jpg",
      Path: this.state.avatar,
      file: this.state.file
          });

  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <View style={styles.container}>
            <Text style={styles.instructions}>Vamos a Jugar con React</Text>
                <Button onPress={this.onPickImage} title="Seleccionar Imagen" color="#841584" />
                        { this.state.avatar && this.renderImageView() }
                <TextInput style={styles.sunFlower} placeholder = "Descripción" returnKeyLabel= {"next"} onChangeText={(text)=>this.setState({texto:text})}/>
                /*volver al formulario x*/
                <Button onPress= { () => navigate('Home')} title="Entrar" color="#000000" />
          </View>
          <Footer style={styles.footerStyle}>
              <FooterTab style={styles.footerStyle}>
                  <View style={styles.container}>
                      <TouchableHighlight onPress={this.insertFirebase} underlayColor="white">
                        <View style={styles.buttonStyle}>
                          <Text style={styles.buttonText}>Enviar</Text>
                        </View>
                      </TouchableHighlight>
                  </View>
              </FooterTab>
          </Footer>
      </Container>
    );
  }

  renderImageView() {
    return (
      <View>
        <Image style={styles.image} source={this.state.avatar} />
        <Button onPress={this.onReset} title="Remover" color="#841584" />
      </View>

    );
  }
}




{/*Permite la navegacion entre ventanas*/}
const SimpleApp = StackNavigator({
  /*Variable global, asignación de qué activity pertenece*/
  Home: { screen: HomeScreen,  navigationOptions: {header: null, }},
  Chat: { screen: ChatScreen },
});



{/*Hoja de estilos*/}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  imageStyle: {
    width: 311,
    height: 300,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
   height: 200,
   width: 200,
   resizeMode: 'contain',
 },
 sunFlower: {
   margin:20,
   height: 40,
   width:400,
   borderWidth: 1,
   borderColor: '#000000',
 },
 footerStyle:{
   backgroundColor: '#000000',
 },
 buttonStyle: { flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    width: 300,},
 buttonText: {
   color:'white',
 },
});
