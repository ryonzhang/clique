import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, TouchableOpacity} from 'react-native';

import {Text, Image} from 'react-native-elements';
import colors from '../common/assets/color/color';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Divider from 'react-native-material-ui/src/Divider';

const Drawer = props => {
  const [user, setUser] = useState({});
  (async function() {
    data = await AsyncStorage.getItem('@user');
    // eslint-disable-next-line no-undef
    if (!data) {
      props.navigation.navigate('Login');
    }
    setUser(JSON.parse(data));
  })();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{backgroundColor: '#02CDBE'}}>
        <View style={{padding: 20}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Account');
              props.navigation.closeDrawer();
            }}>
            <Image
              source={require('../common/assets/images/dummy_profile.jpeg')}
              style={{height: 100, width: 100}}
              borderRadius={100}
            />
          </TouchableOpacity>
        </View>
        <Text h4 style={{color: 'white', paddingLeft: 20, paddingBottom: 20}}>
          Morning,{user && user.first_name}
        </Text>
      </View>
      <View style={{flex: 7}}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Home');
            props.navigation.closeDrawer();
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <FontAwesome5Icon
              style={{width: 30}}
              name="home"
              size={25}
              onPress={() => props.navigation.toggleDrawer()}
            />

            <Text style={{fontSize: 20, paddingLeft: 50}}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Explorer');
            props.navigation.closeDrawer();
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <FontAwesome5Icon
              style={{width: 30}}
              name="search"
              size={25}
              onPress={() => props.navigation.toggleDrawer()}
            />

            <Text style={{fontSize: 20, paddingLeft: 50}}>Explorer</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Settings');
            props.navigation.closeDrawer();
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <FontAwesome5Icon
              style={{width: 30}}
              name="video"
              size={25}
              onPress={() => props.navigation.toggleDrawer()}
            />

            <Text style={{fontSize: 20, paddingLeft: 50}}>Video</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Upcoming');
            props.navigation.closeDrawer();
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <FontAwesome5Icon
              name="calendar"
              style={{width: 30}}
              size={25}
              onPress={() => props.navigation.toggleDrawer()}
            />

            <Text style={{fontSize: 20, paddingLeft: 50}}>Upcoming</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Profile');
            props.navigation.closeDrawer();
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <FontAwesome5Icon
              name="user"
              style={{width: 30}}
              size={25}
              onPress={() => props.navigation.toggleDrawer()}
            />

            <Text style={{fontSize: 20, paddingLeft: 50}}>Profile</Text>
          </View>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Settings');
            props.navigation.closeDrawer();
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <FontAwesome5Icon
              name="cog"
              size={25}
              style={{width: 30}}
              onPress={() => props.navigation.toggleDrawer()}
            />

            <Text style={{fontSize: 20, paddingLeft: 50}}>Settings</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
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

export default Drawer;
