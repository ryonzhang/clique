import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import {Text, Divider, CheckBox} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useFocusEffect} from 'react-navigation-hooks';
import {STATUS} from '../../common/constants';

const Confidentiality = props => {
  const [user, setUser] = useState({});
  const [isSearchable, setSearchable] = useState(false);
  const [isPreviousClassesVisible, setPreviousClassesVisible] = useState(false);
  const [isComingClassesVisible, setComingClassesVisible] = useState(false);
  const [
    isFavoriteInstitutionVisible,
    setFavoriteInstitutionVisible,
  ] = useState(false);
  const [loading, setLoading] = useState(true);

  const upload = values => {
    const URL = 'http://127.0.0.1:3000/users/update';
    (async function() {
      let response = await fetch(URL, {
        headers: {
          Authorization: await AsyncStorage.getItem('@token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        method: 'POST',
      });
      if (response.status === STATUS.ACCEPTED) {
        const newUser = Object.assign(user, values);
        await AsyncStorage.setItem('@user', JSON.stringify(newUser));
        setUser(newUser);
        setFavoriteInstitutionVisible(newUser.is_favorite_institutions_visible);
        setComingClassesVisible(newUser.is_coming_classes_visible);
        setPreviousClassesVisible(newUser.is_previous_classes_visible);
        setSearchable(newUser.is_searchable);
        alert('Your account has been updated');
      } else {
        alert('Your account fails to be updated');
      }
    })();
  };
  useFocusEffect(
    React.useCallback(() => {
      (async function() {
        let data = await AsyncStorage.getItem('@user');
        setUser(JSON.parse(data));
        setFavoriteInstitutionVisible(user.is_favorite_institutions_visible);
        setComingClassesVisible(user.is_coming_classes_visible);
        setPreviousClassesVisible(user.is_previous_classes_visible);
        setSearchable(user.is_searchable);
        setLoading(false);
      })();
    }, [
      user.is_coming_classes_visible,
      user.is_favorite_institutions_visible,
      user.is_previous_classes_visible,
      user.is_searchable,
    ]),
  );
  if (!loading) {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView>
          <View style={{flexDirection: 'row', paddingVertical: 5}}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Settings');
              }}>
              <FontAwesome5Icon
                name="arrow-left"
                size={25}
                style={{paddingLeft: 20}}
                color={'black'}
              />
            </TouchableOpacity>
          </View>
          <Divider />
          <Text style={{alignSelf: 'center', fontSize: 20}}>
            Who can find me?
          </Text>
          <View style={{backgroundColor: 'white', margin: 20}}>
            <Divider style={{backgroundColor: 'gray'}} />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
              }}>
              <Text style={{padding: 5, fontSize: 18, color: '#333'}}>
                Authorize members to find me
              </Text>
              <CheckBox
                containerStyle={{padding: 0}}
                checked={isSearchable}
                onPress={() => upload({is_searchable: !isSearchable})}
              />
            </View>
            <Text style={{color: 'gray', padding: 20}}>
              Members can only search you by your phone,name or city, the rest
              of the information will not be shared with anyone.
            </Text>
            <Divider style={{backgroundColor: 'gray'}} />
          </View>
          <Text style={{alignSelf: 'center', fontSize: 20, paddingTop: 20}}>
            What can my friends see?
          </Text>
          <View style={{backgroundColor: 'white', margin: 20}}>
            <Divider style={{backgroundColor: 'gray'}} />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
              }}>
              <Text style={{padding: 5, fontSize: 18, color: '#333'}}>
                Previous classes
              </Text>
              <CheckBox
                containerStyle={{padding: 0}}
                checked={isPreviousClassesVisible}
                onPress={() =>
                  upload({
                    is_previous_classes_visible: !isPreviousClassesVisible,
                  })
                }
              />
            </View>
            <Divider style={{backgroundColor: 'gray', marginTop: 10}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
              }}>
              <Text style={{padding: 5, fontSize: 18, color: '#333'}}>
                Upcoming classes
              </Text>
              <CheckBox
                containerStyle={{padding: 0}}
                checked={isComingClassesVisible}
                onPress={() =>
                  upload({is_coming_classes_visible: !isComingClassesVisible})
                }
              />
            </View>
            <Divider style={{backgroundColor: 'gray', marginTop: 10}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
              }}>
              <Text style={{padding: 5, fontSize: 18, color: '#333'}}>
                Favorite institutions
              </Text>
              <CheckBox
                containerStyle={{padding: 0}}
                checked={isFavoriteInstitutionVisible}
                onPress={() =>
                  upload({
                    is_favorite_institutions_visible: !isFavoriteInstitutionVisible,
                  })
                }
              />
            </View>
            <Divider style={{backgroundColor: 'gray', marginTop: 10}} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator
          size="large"
          color="#00ff00"
          style={{alignSelf: 'center'}}
        />
      </View>
    );
  }
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
  padding_top_20: {
    paddingTop: 20,
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
    backgroundColor: '#ccc',
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
    backgroundColor: 'white',
    margin: 0,
    padding: 0,
    height: 36,
  },

  inputContainer: {
    padding: 5,
    margin: 0,
  },
});

export default Confidentiality;
