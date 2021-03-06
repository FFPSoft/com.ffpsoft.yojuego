import React, { Component } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import NavigationActions from '../actions/NavigationActions';
import NavigationConstants from '../constants/NavigationConstants';
import RouteConstants from '../constants/RouteConstants';
// import SessionActions from '../actions/SessionActions';
// import SessionStore from '../stores/SessionStore';

export default class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mail: null,
      mailSentMessage: null
    };
    this._send = this._send.bind(this);
    this._backPressed = this._backPressed.bind(this);
    this._onChangeMail = this._onChangeMail.bind(this);
    this._onMailSent = this._onMailSent.bind(this);
  }

  componentDidMount() {
    // SessionStore.addChangeListener(this._onMailSent);

    // if (Platform.OS === 'android') {
    //   var BackAndroid = require('react-native').BackAndroid;
    //   BackAndroid.addEventListener('hardwareBackPress', () => {
    //     this._backPressed();
    //     return true;
    //   });
    // }
  }

  componentWillUnmount() {
    // SessionStore.removeChangeListener(this._onMailSent);

    // if (Platform.OS === 'android') {
    //   var BackAndroid = require('react-native').BackAndroid;
    //   BackAndroid.removeEventListener('hardwareBackPress', () => {
    //     this._backPressed();
    //     return true;
    //   });
    // }
  }

  render() {
    var msg1 = null;
    var msg2 = null;
    var msg3 = null;

    if (this.state.mailSentMessage != null) {
      var msg1 = this.state.mailSentMessage[0];
      var msg2 = this.state.mailSentMessage[1];
      var msg3 = this.state.mailSentMessage[2];
    } else {
      var msg1 = null;
      var msg2 = null;
      var msg3 = null;
    }

    return (
      <View style={styles.container}>
        <View style={[styles.inputContainer, { marginBottom: Dimensions.get('window').width * 0.06 }]}>
          <TextInput placeholder={"Ingrese su email"} style={styles.input} onChangeText={this._onChangeMail} />
        </View>
        <View style={[styles.loginContainer, { marginBottom: Dimensions.get('window').width * 0.06 }]}>
          <TouchableOpacity style={styles.loginButton} onPress={this._send}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={this._back}>
            <Text style={styles.buttonText}>Atrás</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text>{msg1}</Text>
          <Text>{msg2}</Text>
          <Text>{msg3}</Text>
        </View>
      </View>
    );
  }

  _send() {
    //SessionActions.sendMailRestorePassword(this.state.mail);
  }

  _backPressed() {
    NavigationActions.replaceRoute({
      id: RouteConstants.ROUTE_LOGIN
    });
  }

  _onChangeMail(text) {
    if (text.length <= 0) {
      this.setState({ mail: null });
    } else {
      this.setState({ mail: text });
    }
  }

  _onMailSent() {
    // if (SessionStore.mailSent()) {
    //   dismissKeyboard();
    //   this.setState({ mailSentMessage: ['El mail para recuperación', 'de contraseña ha sido enviado.', 'Por favor verifique su casilla'] });

    //   // setTimeout(() => {
    //   //     NavigationActions.replaceRoute({
    //   //         id: RouteConstants.ROUTE_LOGIN
    //   //     });
    //   // }, 3000);
    // } else {
    //   let error = SessionStore.errorSendingMail();
    //   if (error) {
    //     this.setState({ mailSentMessage: ['El mail no pudo ser enviado', error] });
    //   }
    // }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  facebookButtton: {
    width: Dimensions.get('window').width * 0.94,
    height: 40,
    backgroundColor: '#3b5998',
    marginTop: Dimensions.get('window').width * 0.03,
    justifyContent: 'center',
    borderRadius: Dimensions.get('window').width * 0.012
  },
  googleButtton: {
    width: Dimensions.get('window').width * 0.94,
    height: 40,
    backgroundColor: '#dc4d28',
    marginTop: Dimensions.get('window').width * 0.03,
    justifyContent: 'center',
    borderRadius: Dimensions.get('window').width * 0.012
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  line: {
    width: Dimensions.get('window').width * 0.94,
    height: Dimensions.get('window').height * 0.03,
    borderBottomWidth: 0.7,
    borderColor: 'grey',
    marginBottom: Dimensions.get('window').width * 0.06
  },
  inputContainer: {
    borderWidth: 0.7,
    borderColor: 'grey'
  },
  input: {
    width: Dimensions.get('window').width * 0.94
  },
  loginContainer: {
    width: Dimensions.get('window').width * 0.94,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Dimensions.get('window').width * 0.1
  },
  loginButton: {
    width: Dimensions.get('window').width * 0.3,
    height: 40,
    justifyContent: 'center',
    borderRadius: Dimensions.get('window').width * 0.012,
    backgroundColor: '#33adff'
  },
  text: {
    color: 'grey'
  },
  facebookImage: {
    width: 25,
    height: 25,
    position: 'absolute',
    left: 7,
    bottom: 7
  },
  googleImage: {
    width: 22,
    height: 22,
    position: 'absolute',
    left: 10,
    bottom: 9
  }
});

module.exports = LogIn;
