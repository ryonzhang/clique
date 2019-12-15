import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../common/assets/color/color';
import {STATUS} from '../../common/constants';
import AsyncStorage from '@react-native-community/async-storage';
const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const URL = 'http://127.0.0.1:3000/auth/login';
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Button
          buttonStyle={styles.facebook}
          containerStyle={styles.padding_top_10}
          icon={<FontAwesome5Icon name="facebook" color="white" size={30} />}
          title="  Login with Facebook"
        />
        <Button
          buttonStyle={styles.google}
          containerStyle={styles.padding_top_10}
          icon={<FontAwesome5Icon name="google" color="white" size={30} />}
          title="  Login with Google"
        />
        <Text style={[styles.font, styles.or]}> or </Text>

        <Input
          placeholder="  Email Address"
          inputContainerStyle={styles.input}
          containerStyle={styles.padding_top_10}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder="  Password"
          inputContainerStyle={styles.input}
          containerStyle={styles.padding_top_10}
          onChangeText={password => setPassword(password)}
          value={'ryon'}
        />
        <Button
          buttonStyle={styles.facebook}
          containerStyle={styles.padding_top_10}
          title="Log in"
          onPress={async () => {
            let response = await fetch(URL, {
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
              body: JSON.stringify({
                //TODO: change to actual password
                password: 'ryon',
                email: email,
              }),
            });
            if (response.status === STATUS.OK) {
              let data = await response.json();
              try {
                await AsyncStorage.setItem('@token', data.auth_token);
                await AsyncStorage.setItem('@user', JSON.stringify(data.user));
              } catch (e) {
                alert(
                  'Unable to save token on the devise, please revise your access rights',
                );
              }

              console.log(data);
              props.navigation.navigate('Home');
            } else {
              alert(
                'Your email and password combination is not correct,have another try?',
              );
            }
          }}
        />

        <Text style={styles.font}> Forgotten your password? </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 30,
  },
  facebook: {
    backgroundColor: colors.facebook,
  },
  google: {
    backgroundColor: colors.google,
  },
  padding_top_10: {
    paddingTop: 10,
  },
  font: {
    fontSize: 17,
    lineHeight: 26,
    alignSelf: 'center',
    color: 'rgba(0, 0, 0, 0.38)',
    justifyContent: 'center',
  },
  or: {
    paddingBottom: 50,
    paddingTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.18)',
    padding: 0,
  },
});

export default Login;
