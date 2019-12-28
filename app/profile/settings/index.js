import React, {useState} from 'react';
import {
  AsyncStorage,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text, Divider, Header} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Settings = props => {
  const [user, setUser] = useState({});
  (async function() {
    let data = await AsyncStorage.getItem('@user');
    setUser(JSON.parse(data));
  })();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Text h4 style={{padding: 20}}>
          Account
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Account');
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
            }}>
            <View>
              <Text style={{fontSize: 18, color: '#333'}}>{user.name}</Text>
              <Text style={{fontSize: 14, color: '#999'}}>{user.email}</Text>
              <Text style={{fontSize: 14, color: '#999'}}>{user.username}</Text>
            </View>

            <FontAwesome5Icon
              name="chevron-right"
              size={16}
              style={{paddingTop: 10}}
              color={'gray'}
              regular
            />
          </View>
        </TouchableOpacity>
        <Divider style={{backgroundColor: 'gray', marginTop: 10}} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Confidentiality');
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
            }}>
            <View>
              <Text h4>Preferences</Text>
              <Text style={{fontSize: 18, color: '#333', paddingTop: 10}}>
                Confidentialities
              </Text>
            </View>

            <FontAwesome5Icon
              name="chevron-right"
              size={16}
              style={{paddingTop: 10, alignSelf: 'center'}}
              color={'gray'}
              regular
            />
          </View>
        </TouchableOpacity>
        <Divider style={{backgroundColor: 'gray', marginTop: 10}} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Confidentiality');
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
            }}>
            <View>
              <Text h4>Subscription</Text>
              <Text style={{fontSize: 18, color: '#333', paddingTop: 10}}>
                Become a member
              </Text>
            </View>

            <FontAwesome5Icon
              name="chevron-right"
              size={16}
              style={{paddingTop: 10, alignSelf: 'center'}}
              color={'gray'}
              regular
            />
          </View>
        </TouchableOpacity>
        <Divider style={{backgroundColor: 'gray', marginTop: 10}} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabItemHignlighted: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 7,
    paddingRight: 4,
    color: 'black',
  },
  tabItemDisabled: {
    fontSize: 20,
    paddingLeft: 7,
    paddingTop: 3,
    paddingRight: 4,
    fontWeight: 'bold',
    color: 'gray',
  },
  tabHighlighted: {
    borderBottomColor: 'blue',
    borderBottomWidth: 3,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 6,
  },
  tabDisabled: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
    paddingBottom: 6,
  },
  mainContainer: {
    flex: 1,
  },
  center_gray: {
    paddingLeft: 10,
    color: '#999',
  },
  container: {
    flex: 1,
  },
  font: {
    fontSize: 17,
    lineHeight: 26,
    alignSelf: 'center',
    color: 'rgba(0, 0, 0, 0.38)',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.18)',
    borderRadius: 10,
    margin: 0,
    padding: 0,
    height: 36,
  },
  inputContainer: {
    padding: 5,
    margin: 0,
  },
});

export default Settings;
