import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text, Image} from 'react-native-elements';
import colors from '../../common/assets/color/color';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Starter = props => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text h2 style={{alignSelf: 'center', paddingBottom: 20}}>
          Clique
        </Text>
        <Image
          source={require('../../common/assets/images/home_screen.jpeg')}
          style={{height: 200}}
        />

        <Text style={[styles.font]}>
          Why join us? Get ready for a world of available classes near you with
          only one membership at an even cheaper cost.
        </Text>

        <Button
          buttonStyle={styles.padding_top_20}
          containerStyle={styles.padding_top_20}
          icon={
            <FontAwesome5Icon name="hand-point-right" color="white" size={30} />
          }
          title="  Try out for free"
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
    paddingTop: 25,
  },
  font: {
    fontSize: 17,
    lineHeight: 26,
    alignSelf: 'center',
    color: 'rgba(0, 0, 0, 0.38)',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
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

export default Starter;
