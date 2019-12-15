import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import colors from '../../common/assets/color/color';

const Reset = props => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={[styles.font]}>
          Type in your email address that you used when creating the account
        </Text>

        <Input
          placeholder="  Email Address"
          inputContainerStyle={styles.input}
          containerStyle={styles.padding_top_25}
        />

        <Button
          buttonStyle={styles.facebook}
          containerStyle={styles.padding_top_25}
          title="Reset password"
        />
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
  padding_top_25: {
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

export default Reset;
