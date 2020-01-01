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
import axiosService from '../../common/clients/api';
const UpcomingList = props => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      (async function() {
        let response = await axiosService.get(
          '/sessions/upcoming/' + (props.user_id || ''),
        );
        if (response.status === STATUS.UNPROCESSED_ENTITY) {
          props.navigation.navigate('Login');
        } else {
          let {data} = response;
          setSessions(data);
          setLoading(false);
          props.onLoad(data.length);
        }
      })();
    }, []),
  );
  if (!loading) {
    return (
      <>
        {sessions.map(session => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ClassDetail', {
                id: session.id,
              });
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
                  {new Date(session.time).toLocaleTimeString('en-us', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>

                <Text style={styles.center_gray}>
                  {session.duration_in_min} min
                </Text>
                <Text style={styles.center_gray}>
                  {new Date(session.time).toLocaleDateString('en-us', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
              </View>
              <View style={{flex: 8, flexDirection: 'column'}}>
                <Text style={{fontSize: 17}} numberOfLines={1}>
                  {session.classinfo.name}
                </Text>
                <Text
                  style={{fontSize: 14, paddingTop: 5, color: 'gray'}}
                  numberOfLines={1}>
                  {session.classinfo.institution.name}
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
