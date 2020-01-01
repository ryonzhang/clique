import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from 'react-navigation-hooks';
import colors from '../../.././../../common/assets/color/color';
import {STATUS} from '../../../../../common/constants';
import axiosService from '../../../../../common/clients/api';
import {NavigationActions, StackActions} from 'react-navigation';
const CalendarClassList = props => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      (async function() {
        let response = await axiosService.get(
          '/institutions/' + props.institution_id + '/sessions/' + props.date,
        );
        if (response.status === STATUS.UNPROCESSED_ENTITY) {
          props.navigation.navigate('Login');
        } else {
          let {data} = response;
          setSessions(data);
          setLoading(false);
        }
      })();
    }, [props]),
  );
  if (!loading) {
    return (
      <ScrollView>
        {sessions.map(session => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ClassDetail', {
                id: session.id,
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
                  {new Date(session.time).toLocaleTimeString('en-us', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
                <Text style={styles.center_gray}>
                  {session.duration_in_min}
                </Text>
                <Text style={styles.center_gray}>min</Text>
              </View>
              <View style={{flex: 8, flexDirection: 'column'}}>
                <Text style={{fontSize: 17}} numberOfLines={1}>
                  {session.classinfo.name}
                </Text>
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

export default CalendarClassList;
