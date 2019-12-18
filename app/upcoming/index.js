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
import colors from '../common/assets/color/color';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {STATUS} from '../common/constants';
import {useFocusEffect} from 'react-navigation-hooks';
const Upcoming = props => {
  const URL = 'http://127.0.0.1:3000/classinfos/upcoming';

  const [classes, setClasses] = useState([]);
  const [classInfo, setClassInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

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
    }, [props.navigation]),
  );
  if (!loading) {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.openDrawer();
            }}>
            <FontAwesome5Icon name="bars" size={25} style={{padding: 20}} />
          </TouchableOpacity>
          <Text style={{paddingLeft: 30, paddingTop: 17, fontSize: 20}}>
            Upcoming Cliques
          </Text>
        </View>
        <Overlay
          isVisible={visible}
          width={300}
          height={480}
          onBackdropPress={() => setVisible(false)}>
          <View style={{flex: 1}}>
            <Text h4>Nice to have you onboard!</Text>
            <Card image={require('../common/assets/images/home.screen.1.jpeg')}>
              <Text style={{marginBottom: 10, fontSize: 17}}>
                {classInfo.name}
              </Text>
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
                    {new Date(classInfo.time).toLocaleTimeString([], {
                      timeStyle: 'short',
                    })}
                  </Text>
                  <Text style={styles.center_gray}>
                    {classInfo.duration_in_min}
                  </Text>
                  <Text style={styles.center_gray}>min</Text>
                </View>
                <View style={{flex: 8, flexDirection: 'column'}}>
                  <Text style={{color: '#999'}}>
                    {classInfo.institution && classInfo.institution.name}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <AirbnbRating
                      count={5}
                      defaultRating={
                        classInfo.institution && classInfo.institution.star_num
                      }
                      showRating={false}
                      size={15}
                      isDisabled={true}
                    />
                    <Text style={styles.center_gray}>
                      {classInfo.institution && classInfo.institution.star_num}
                      /5{' '}
                    </Text>
                  </View>
                </View>
              </View>
              <Button
                title={'Confirm Cancellation'}
                type="outline"
                onPress={() => {
                  const URL =
                    'http://127.0.0.1:3000/classinfos/delink/' + classInfo.id;

                  (async function() {
                    let response = await fetch(URL, {
                      headers: {
                        Authorization: await AsyncStorage.getItem('@token'),
                        'Content-Type': 'application/json',
                      },
                      method: 'POST',
                    });
                    if (response.status === STATUS.ACCEPTED) {
                      setVisible(false);
                    } else {
                      alert('Failure in cancellation, contact us please');
                    }
                  })();
                }}
              />
            </Card>
          </View>
        </Overlay>
        <View style={{flex: 7, paddingBottom: 20}}>
          <ScrollView style={{padding: 20}}>
            {classes.map(classInfo => (
              <Card
                image={require('../common/assets/images/home.screen.1.jpeg')}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('ClassDetail', {
                      id: classInfo.id,
                    });
                  }}>
                  <Text style={{marginBottom: 10, fontSize: 17}}>
                    {classInfo.name}
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
                      {new Date(classInfo.time).toLocaleTimeString([], {
                        timeStyle: 'short',
                      })}
                    </Text>
                    <Text style={styles.center_gray}>
                      {classInfo.duration_in_min}
                    </Text>
                    <Text style={styles.center_gray}>min</Text>
                  </View>
                  <View style={{flex: 8, flexDirection: 'column'}}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('InstitutionDetail', {
                          id: classInfo.institution.id,
                        });
                      }}>
                      <Text style={{color: '#999'}}>
                        {classInfo.institution.name}
                      </Text>
                    </TouchableOpacity>
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
                <Button
                  title={'Cancel Booking'}
                  type="outline"
                  onPress={() => {
                    setClassInfo(classInfo);
                    setVisible(true);
                  }}
                />
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

export default Upcoming;
