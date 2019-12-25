/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, ButtonGroup, Text} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from 'react-navigation-hooks';
import colors from '../../common/assets/color/color';
import {STATUS} from '../../common/constants';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const FriendsList = props => {
  const [friends, setFriends] = useState([]);
  const [requestedFriends, setRequestedFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      (async function() {
        const URL =
          'http://127.0.0.1:3000/users/friends/' +
          (props.user_id ? props.user_id : '');
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
          setFriends(data);
          setLoading(false);
          props.onLoad(data.length);
        }
      })();
      if (!props.user_id) {
        (async function() {
          const URL = 'http://127.0.0.1:3000/users/requested_friends/';
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
            setRequestedFriends(data);
            setLoading(false);
          }
        })();
      }
    }, []),
  );
  if (!loading) {
    return (
      <>
        <ScrollView>
          {props.user_id || (
            <Button
              title={'Add a friend'}
              type="outline"
              onPress={() => {
                props.navigation.navigate('UserSearch');
              }}
            />
          )}
          {!props.user_id &&
            requestedFriends.map(friend => (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('OthersProfile', {
                    user: friend,
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: '#ddd',
                    padding: 20,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 17}} numberOfLines={1}>
                    {friend.name}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={async () => {
                        const URL =
                          'http://127.0.0.1:3000/users/accept/' + friend.id;
                        let response = await fetch(URL, {
                          headers: {
                            Authorization: await AsyncStorage.getItem('@token'),
                            'Content-Type': 'application/json',
                          },
                          method: 'POST',
                        });
                        if (response.status === STATUS.UNPROCESSED_ENTITY) {
                          props.navigation.navigate('Login');
                        } else {
                          let data = await response.json();
                        }
                      }}>
                      <Text style={{color: 'green', paddingRight: 10}}>
                        Accept
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={async () => {
                        const URL =
                          'http://127.0.0.1:3000/users/reject/' + friend.id;
                        let response = await fetch(URL, {
                          headers: {
                            Authorization: await AsyncStorage.getItem('@token'),
                            'Content-Type': 'application/json',
                          },
                          method: 'POST',
                        });
                        if (response.status === STATUS.UNPROCESSED_ENTITY) {
                          props.navigation.navigate('Login');
                        } else {
                          let data = await response.json();
                        }
                      }}>
                      <Text style={{color: 'gray', paddingRight: 10}}>
                        Reject
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          {friends.map(friend => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('OthersProfile', {
                  user: friend,
                });
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#ddd',
                  padding: 20,
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 17}} numberOfLines={1}>
                  {friend.name}
                </Text>
                <FontAwesome5Icon
                  name="chevron-right"
                  size={18}
                  // style={{paddingTop: 10}}
                  color={'black'}
                  regular
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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

export default FriendsList;
