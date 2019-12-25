/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from 'react-navigation-hooks';
import colors from '../../common/assets/color/color';
import {STATUS} from '../../common/constants';
import {NavigationActions, StackActions} from 'react-navigation';
const UpcomingList = props => {
  const URL =
    'http://127.0.0.1:3000/classinfos/upcoming/' + (props.user_id || '');

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      (async function() {
        let response = await fetch(URL, {
          headers: {
            Authorization: await AsyncStorage.getItem('@token'),
            'Content-Type': 'application/json',
          },
        });
        if (response.status === STATUS.UNPROCESSED_ENTITY) {
          props.navigation.navigate('Login');
        } else {
          let data = await response.json();
          setClasses(data);
          setLoading(false);
          props.onLoad(data.length);
        }
      })();
    }, []),
  );
  if (!loading) {
    return (
      <>
        {classes.map(classInfo => (
          <TouchableOpacity
            onPress={() => {
              const resetAction = StackActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({
                    routeName: 'Profile',
                    params: {
                      id: props.institution_id,
                      name: props.institution_name,
                    },
                  }),
                  NavigationActions.navigate({
                    routeName: 'ClassDetail',
                    params: {
                      id: classInfo.id,
                    },
                  }),
                ],
              });
              props.navigation.dispatch(resetAction);
            }}>
            <View
              tabLabel={{label: 'Previous', badge: 3}}
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#ddd',
                padding: 20,
              }}>
              <View style={{flex: 4, flexDirection: 'column'}}>
                <Text>
                  {new Date(classInfo.time).toLocaleTimeString('en-us', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>

                <Text style={styles.center_gray}>
                  {classInfo.duration_in_min} min
                </Text>
                <Text style={styles.center_gray}>
                  {new Date(classInfo.time).toLocaleDateString('en-us', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
              </View>
              <View style={{flex: 8, flexDirection: 'column'}}>
                <Text style={{fontSize: 17}} numberOfLines={1}>
                  {classInfo.name}
                </Text>
                <Text
                  style={{fontSize: 14, paddingTop: 5, color: 'gray'}}
                  numberOfLines={1}>
                  {classInfo.institution.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </>
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
  mainContainer: {
    flex: 1,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
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

export default UpcomingList;
