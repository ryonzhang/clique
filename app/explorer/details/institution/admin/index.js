import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../../../common/assets/color/color';
import FavoriteInstitutionList from '../list';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const Admin = props => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <FavoriteInstitutionList {...props} />
    </SafeAreaView>
  );
};

Admin.navigationOptions = screenProps => ({
  headerTitle: 'Your Institutions',
  headerLeft: () => (
    <TouchableOpacity
      style={{paddingLeft: 20, flex: 1}}
      onPress={() => {
        screenProps.navigation.openDrawer();
      }}>
      <FontAwesome5Icon name="bars" size={25} color={'black'} />
    </TouchableOpacity>
  ),
});

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

export default Admin;
