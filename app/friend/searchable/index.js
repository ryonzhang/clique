/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from 'react-navigation-hooks';
import {Text, AirbnbRating, Card, SearchBar} from 'react-native-elements';
import colors from '../../common/assets/color/color';
import {STATUS} from '../../common/constants';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import axiosService from '../../common/clients/api';

const UserSearch = props => {
  const [users, setUsers] = useState([]);
  const [intendingUsers, setIntendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const {height, width} = Dimensions.get('window');
  const [search, setSearch] = useState('');
  const [user, setUser] = useState({});
  const _renderFooter = () => {
    if (!loading) {
      return null;
    }

    return (
      <View
        style={{
          position: 'relative',
          width: width,
          height: height,
          paddingVertical: 20,
          borderTopWidth: 1,
          marginTop: 10,
          marginBottom: 10,
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const _loadMore = async (reload) => {
    let response = await axiosService.get(
      '/users/searchable' +
        '?limit=' +
        limit +
        '&offset=' +
        offset +
        '&search=' +
        search,
    );
    if (response.status === STATUS.UNPROCESSED_ENTITY) {
      props.navigation.navigate('Login');
    } else {
      let {data} = response;

      setUsers(reload?data.users:[...users, ...data.users]);
      setIntendingUsers(reload?data.intending:[...intendingUsers, ...data.intending]);
      setOffset(limit + (reload? 0:offset));
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      _loadMore(true);
    }, [search]),
  );
  console.log(users);
  if (!loading) {
    return (
      <SafeAreaView style={styles.safeContainer}>

        <SearchBar
          placeholder="Type Here..."
          onChangeText={value => {
            setSearch(value);
            setOffset(0);
          }}
          value={search}
        />
        <ScrollView>
          <FlatList
            contentContainerStyle={{
              flex: 1,
              flexDirection: 'column',
              height: '100%',
              width: '100%',
            }}
            data={users}
            renderItem={({item}) => (
              <Card key={item.id + Date.now()}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 16}}>{item.name}</Text>
                    {intendingUsers.includes(item.id) || (
                      <TouchableOpacity
                        onPress={() => {
                          (async function() {
                            let response = await axiosService.post(
                              '/users/invite/' + item.id,
                            );
                            if (response.status === STATUS.CREATED) {
                              setIntendingUsers([...intendingUsers, item.id]);
                              setUsers(users);
                            } else {
                              alert(
                                'Failure in cancellation, contact us please',
                              );
                            }
                          })();
                        }}>
                        <FontAwesome5Icon
                          name="plus"
                          size={16}
                          color={'black'}
                          regular
                        />
                      </TouchableOpacity>
                    )}
                    {intendingUsers.includes(item.id) && (
                      <Text style={{color: 'gray'}}>Pending acceptance</Text>
                    )}
                  </View>
                </View>
              </Card>
            )}
            onEndReached={() => {
              _loadMore(false);
            }}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            ListFooterComponent={_renderFooter}
          />
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
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  subtitle: {
    fontSize: 17,
    padding: 5,
    fontWeight: 'bold',
  },
  markedText: {
    fontSize: 17,
    padding: 3,
  },
  mainText: {
    padding: 5,
  },
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

export default UserSearch;
