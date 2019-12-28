import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
  Button,
  Platform,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {AirbnbRating, Card, Text} from 'react-native-elements';
import {StackActions, NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from 'react-navigation-hooks';
import colors from '../../../../common/assets/color/color';
import {STATUS} from '../../../../common/constants';
const ExploreClassList = props => {
  const URL =
    'http://127.0.0.1:3000/classinfos/date/' +
    props.date +
    '?min_hour=' +
    props.minHour +
    '&max_hour=' +
    props.maxHour +
    '&min_distance=' +
    props.minDistance +
    '&max_distance=' +
    props.maxDistance +
    '&min_credit=' +
    props.minCredit +
    '&max_credit=' +
    props.maxCredit +
    '&class_name=' +
    props.className +
    '&longitude=' +
    props.longitude +
    '&latitude=' +
    props.latitude;

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
        }
      })();
    }, [URL, props]),
  );
  if (!loading) {
    return (
      <ScrollView>
        {classes.map(classInfo => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ClassDetail', {
                id: classInfo.id,
              });
            }}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#ddd',
                padding: 20,
              }}>
              <View style={{flex: 2, flexDirection: 'column'}}>
                <Text>
                  {new Date(classInfo.time).toLocaleTimeString('en-us', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
                <Text style={styles.center_gray}>
                  {classInfo.duration_in_min}
                </Text>
                <Text style={styles.center_gray}>min</Text>
              </View>
              <View style={{flex: 8, flexDirection: 'column'}}>
                <Text style={{fontSize: 17}} numberOfLines={1}>
                  {classInfo.name}
                </Text>
                <Text style={{color: '#999'}}>
                  {classInfo.institution.name}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <AirbnbRating
                    count={5}
                    defaultRating={classInfo.institution.star_num}
                    showRating={false}
                    size={15}
                    isDisabled={true}
                  />
                  <Text style={styles.center_gray}>
                    {classInfo.institution.star_num}/5
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  center_gray: {
    paddingLeft: 10,
    color: '#999',
  },
});

export default ExploreClassList;
