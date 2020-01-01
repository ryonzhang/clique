import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Text, Card, AirbnbRating, Button, Overlay} from 'react-native-elements';
import {useFocusEffect} from 'react-navigation-hooks';
import colors from '../common/assets/color/color';
import {STATUS} from '../common/constants';
import axiosService from '../common/clients/api';
const Completed = props => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      (async function() {
        let response = await axiosService.get('/sessions/completed');
        if (response.status === STATUS.UNPROCESSED_ENTITY) {
          props.navigation.navigate('Login');
        } else {
          let {data} = response;
          setSessions(data);
          setLoading(false);
        }
      })();
    }, [props.navigation]),
  );
  if (!loading) {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={{flex: 7}}>
          <ScrollView style={{padding: 20}}>
            {sessions.map(session => (
              <Card
                image={require('../common/assets/images/home.screen.1.jpeg')}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('ClassDetail', {
                      id: session.id,
                    });
                  }}>
                  <Text style={{marginBottom: 10, fontSize: 17}}>
                    {session.classinfo.name}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: '#ddd',
                    padding: 20,
                    margin: 5,
                  }}>
                  <View
                    style={{
                      flex: 3,
                      flexDirection: 'column',
                      paddingHorizontal: 5,
                    }}>
                    <Text>
                      {new Date(session.time).toLocaleTimeString([], {
                        timeStyle: 'short',
                      })}
                    </Text>
                    <Text style={styles.center_gray}>
                      {session.duration_in_min}
                    </Text>
                    <Text style={styles.center_gray}>min</Text>
                  </View>
                  <View style={{flex: 8, flexDirection: 'column'}}>
                    <TouchableOpacity
                      onPress={() => {
                        console.log('ryon');
                        props.navigation.navigate('InstitutionDetail', {
                          id: session.classinfo.institution.id,
                        });
                      }}>
                      <Text style={{color: '#999'}}>
                        {session.classinfo.institution.name}
                      </Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                      <AirbnbRating
                        count={5}
                        defaultRating={session.classinfo.institution.star_num}
                        showRating={false}
                        size={15}
                        isDisabled={true}
                      />
                      <Text style={styles.center_gray}>
                        {session.classinfo.institution.star_num}/5{' '}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </ScrollView>
        </View>
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

export default Completed;
