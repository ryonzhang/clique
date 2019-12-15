import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {Checkbox} from 'react-native-material-ui';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../common/assets/color/color';

const Signup = props => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={{flex: 2}}>
          <Button
            buttonStyle={styles.facebook}
            containerStyle={styles.padding_top_20}
            icon={<FontAwesome5Icon name="facebook" color="white" size={30} />}
            title="  Create with Facebook"
          />
          <Button
            buttonStyle={styles.google}
            containerStyle={styles.padding_top_20}
            icon={<FontAwesome5Icon name="google" color="white" size={30} />}
            title="  Create with Google"
          />
        </View>

        <View style={{flex: 5, justifyContent: 'flex-start'}}>
          <View style={[styles.name, styles.padding_top_20]}>
            <Input
              placeholder="  Surname"
              inputContainerStyle={styles.input}
              containerStyle={styles.namingInput}
            />
            <Input
              placeholder="  Name"
              inputContainerStyle={styles.input}
              containerStyle={styles.namingInput}
            />
          </View>

          <Input
            placeholder="  Email Address"
            inputContainerStyle={styles.input}
            containerStyle={styles.padding_top_20}
          />
          <Input
            placeholder="  Password"
            inputContainerStyle={styles.input}
            containerStyle={styles.padding_top_20}
          />
        </View>

        <View style={{flex: 2}}>
          <Checkbox
            label=" You must agree with this"
            style={{label: styles.contractFont}}
            checked={true}
            size={18}
          />
          <Checkbox
            label=" You must agree with this"
            style={{label: styles.contractFont}}
            checked={true}
            size={18}
          />
          <Button
            buttonStyle={styles.facebook}
            containerStyle={styles.padding_top_20}
            title="Sign up"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  namingInput: {
    flex: 1,
    height: 10,
  },
  name: {
    flexDirection: 'row',
    alignItems: 'stretch',
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
  padding_top_20: {
    paddingTop: 20,
    flex: 1,
  },
  font: {
    fontSize: 17,
    lineHeight: 26,
    alignSelf: 'center',
    color: 'rgba(0, 0, 0, 0.38)',
    justifyContent: 'center',
  },
  contractFont: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.38)',
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

export default Signup;
