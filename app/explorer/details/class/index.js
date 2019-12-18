import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Text,
  Image,
  AirbnbRating,
  Badge,
  Overlay,
  Card,
} from 'react-native-elements';
import colors from '../../../common/assets/color/color';
import AsyncStorage from '@react-native-community/async-storage';
import Divider from 'react-native-material-ui/src/Divider';
import {LEVELS, STATUS} from '../../../common/constants';

const ClassDetail = props => {
  const URL =
    'http://127.0.0.1:3000/classinfos/' + props.navigation.state.params.id;
  console.log(URL);
  const [classInfo, setClassInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
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
        setClassInfo(data);
        setLoading(false);

      }
    })();
  }, [URL, props.navigation, props.navigation.state.params.id]);


  if (!loading) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <Overlay
          isVisible={visible}
          width={300}
          height={480}
          onBackdropPress={() => setVisible(false)}>
          <View style={{flex: 1}}>
            <Text h4>Nice to have you onboard!</Text>
            <Card
              image={require('../../../common/assets/images/home.screen.1.jpeg')}>
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
                      {classInfo.institution.star_num}/5{' '}
                    </Text>
                  </View>
                </View>
              </View>
              <Button
                title={'Confirm Booking'}
                type="outline"
                onPress={() => {
                  const URL =
                    'http://127.0.0.1:3000/classinfos/link/' + classInfo.id;
                  (async function() {
                    let response = await fetch(URL, {
                      headers: {
                        Authorization: await AsyncStorage.getItem('@token'),
                        'Content-Type': 'application/json',
                      },
                      method: 'POST',
                    });
                    if (response.status === STATUS.CREATED) {
                      setVisible(false);
                      props.navigation.navigate('Upcoming', {
                        id: classInfo.id,
                      });
                    } else {
                      alert('Not link the class, contact us please');
                    }
                  })();
                }}
              />
            </Card>
          </View>
        </Overlay>
        <Image
          source={require('../../../common/assets/images/explorer.detail.class.jpeg')}
          style={{height: 200}}
        />
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}>
          <View style={{backgroundColor: 'rgba(14, 202, 168, 0.63)'}}>
            <Text
              style={{
                fontSize: 23,
                padding: 10,
                color: 'blue',
                alignSelf: 'center',
              }}>
              Book this class
            </Text>
          </View>
        </TouchableOpacity>
        <ScrollView style={{padding: 14}}>
          <Text h3>{classInfo.name}</Text>
          <Text style={[styles.markedText, {paddingTop: 20}]}>
            {new Date(classInfo.time).toLocaleString()} Monday 1 Dec,
            17:30-18:55
          </Text>
          <Text style={[styles.markedText, {paddingBottom: 20}]}>
            {classInfo.institution.name}
          </Text>
          <Divider />
          <Text style={[styles.markedText, {paddingTop: 20}]}>
            Level: {LEVELS[classInfo.level]}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <Text style={styles.markedText}>Category:</Text>
            {classInfo.categories.map(c => (
              <Badge
                key={classInfo.categories.indexOf(c)}
                status="success"
                value={c.name}
                containerStyle={{padding: 0.5}}
                badgeStyle={{backgroundColor: '#999'}}
              />
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              paddingVertical: 10,
            }}>
            <Text style={styles.markedText}>Tags:</Text>
            {classInfo.tags.map(c => (
              <Badge
                key={classInfo.tags.indexOf(c)}
                status="success"
                value={c.name}
                containerStyle={{padding: 0.5}}
                badgeStyle={{backgroundColor: '#999'}}
              />
            ))}
          </View>

          <Divider />
          <Text style={styles.subtitle}>Evaluation of the instituation</Text>
          <View style={{flexDirection: 'row'}}>
            <AirbnbRating
              count={5}
              defaultRating={classInfo.institution.star_num}
              showRating={false}
              size={15}
              isDisabled={true}
            />
            <Text style={{color: 'gray', paddingLeft: 10, top: 3}}>
              {classInfo.institution.star_num}/5 according to{' '}
              {classInfo.institution.feedback_count} feedbacks
            </Text>
          </View>

          <Text style={[styles.mainText, {color: 'blue'}]}>
            See all the feedbacks
          </Text>
          <Divider />
          <Text style={styles.subtitle}>About the class</Text>
          <Text style={styles.mainText}>{classInfo.general_info}</Text>
          <Divider />
          <Text style={styles.subtitle}>Location</Text>
          <Text style={styles.mainText}>
            {classInfo.institution.unit} {classInfo.institution.building}{' '}
            {classInfo.institution.street},{classInfo.institution.city},
            {classInfo.institution.province},{classInfo.institution.country},
            {classInfo.institution.zipcode}
          </Text>
          <View style={{padding: 10}}>
            <Image
              source={require('../../../common/assets/images/class.detail.map.png')}
              style={{height: 200}}
            />
          </View>
          <Divider />
          <Text style={styles.subtitle}>Preparation</Text>
          <Text style={styles.mainText}>{classInfo.preparation_info}</Text>
          <Divider />
          <Text style={styles.subtitle}>When to arrive?</Text>
          <Text style={styles.mainText}>
            {classInfo.duration_in_min} minutes before
          </Text>
          <Divider />
          <Text style={styles.subtitle}>How to arrive?</Text>
          <Text style={styles.mainText}>
            {classInfo.institution.location_instruction}
          </Text>
          <Button
            title={classInfo.institution.name}
            type="outline"
            onPress={() => {
              props.navigation.navigate('InstitutionDetail', {
                id: classInfo.institution_id,
              });
            }}
          />
          <Text style={[styles.mainText, {color: 'gray'}]}>
            {classInfo.additional_info}
          </Text>
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

export default ClassDetail;
