import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Text,
  Card,
  AirbnbRating,
  Button,
  Overlay,
  Input,
} from 'react-native-elements';
import colors from '../common/assets/color/color';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {STATUS} from '../common/constants';
import {useFocusEffect} from 'react-navigation-hooks';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView from 'react-native-maps';
import axiosService from '../common/clients/api';
const Upcoming = props => {
  const [classes, setClasses] = useState([]);
  const [classInfo, setClassInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const homePlace = {
    description: 'Home',
    geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
  };
  const workPlace = {
    description: 'Work',
    geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
  };

  useFocusEffect(
    React.useCallback(() => {
      (async function() {
        let response = await axiosService.get('/classinfos/upcoming');
        console.log(response.status);
        if (response.status === STATUS.UNPROCESSED_ENTITY) {
          props.navigation.navigate('Login');
        } else {
          let {data} = response;
          setClasses(data);
          setLoading(false);
        }
      })();
    }, [props.navigation]),
  );
  if (!loading) {
    return (
      <SafeAreaView style={styles.mainContainer}>
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
                  (async function() {
                    let response = await axiosService.post(
                      '/classinfos/delink/' + classInfo.id,
                    );
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
                key={classInfo.id}
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
