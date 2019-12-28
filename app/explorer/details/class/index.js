import React, {useEffect, useState} from 'react';
import {useFocusEffect} from 'react-navigation-hooks';
// import { FloatingAction } from "react-native-floating-action";
import {Container, Header, View, Icon, Fab} from 'native-base';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Image,
  AirbnbRating,
  Badge,
  Button,
  Overlay,
  Card,
} from 'react-native-elements';
import colors from '../../../common/assets/color/color';
import AsyncStorage from '@react-native-community/async-storage';
import Divider from 'react-native-material-ui/src/Divider';
import {LEVELS, STATUS} from '../../../common/constants';
import MapView, {Marker} from 'react-native-maps';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import QRCode from '../../../common/components/QRCode';
import axiosService from '../../../common/clients/api';
Date.prototype.addMinutes = function(minutes) {
  var dat = new Date(this.valueOf());
  dat.setMinutes(dat.getMinutes() + minutes);
  return dat;
};

const actions = [
  {
    text: 'Accessibility',

    name: 'bt_accessibility',
    position: 2,
  },
  {
    text: 'Language',

    name: 'bt_language',
    position: 1,
  },
  {
    text: 'Location',

    name: 'bt_room',
    position: 3,
  },
  {
    text: 'Video',

    name: 'bt_videocam',
    position: 4,
  },
];

const ClassDetail = props => {
  const [classInfo, setClassInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isQR, setIsQR] = useState(false);
  const [action, setAction] = useState('');
  const [status, setStatus] = useState('');
  const [btnContent, setBtnContent] = useState('');
  const [user, setUser] = useState({});
  const {height, width} = Dimensions.get('window');
  useFocusEffect(
    React.useCallback(() => {
      (async function() {
        let data = await AsyncStorage.getItem('@user');
        setUser(JSON.parse(data));
      })();
      (async function() {
        let response = await axiosService.get(
          '/classinfos/' + props.navigation.state.params.id,
        );
        if (response.status === STATUS.UNPROCESSED_ENTITY) {
          props.navigation.navigate('Login');
        } else {
          let {data} = response;
          setClassInfo(data.classinfo);
          setStatus(data.status);
          switch (status) {
            case 'booked':
              setAction('Unbook this class');
              break;
            case 'missed':
              setAction('Class has already started');
              break;
            case 'attended':
              setAction('Thanks for joining, leave a comment?');
              break;
            case 'feedbacked':
              setAction('Hope to see you again');
              break;
            case 'open':
              setAction('Book this class');
              break;
          }
          setLoading(false);
        }
      })();
    }, [props.navigation, status]),
  );

  const _onPressStatus = () => {
    setIsQR(false);
    switch (status) {
      case 'booked':
        setVisible(true);
        setBtnContent('Confirm Cancellation');
        break;
      case 'missed':
        break;
      case 'attended':
        props.navigation.navigate('FeedbackClass', {
          classinfo: classInfo,
        });
        break;
      case 'feedbacked':
        props.navigation.navigate('FeedbackClass', {
          classinfo: classInfo,
        });
        break;
      case 'open':
        setVisible(true);
        setBtnContent('Confirm Booking');
        break;
    }
  };

  if (!loading) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <Overlay
          isVisible={visible}
          width={300}
          height={480}
          onBackdropPress={() => setVisible(false)}>
          <View style={{flex: 1}}>
            {isQR || (
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
                    }}>
                    <Text>
                      {new Date(classInfo.time).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                    <Text style={styles.center_gray}>
                      {classInfo.duration_in_min} min
                    </Text>
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
                  title={btnContent}
                  type="outline"
                  onPress={() => {
                    (async function() {
                      let response = await axiosService.post(
                        '/classinfos/' +
                          (status === 'open' ? 'link/' : 'delink/') +
                          classInfo.id,
                      );
                      if (response.status === STATUS.ACCEPTED) {
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
            )}

            {isQR && (
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  paddingLeft: 20,
                  paddingTop: 50,
                }}>
                <QRCode
                  value={user.id + ''}
                  size={280}
                  bgColor="green"
                  fgColor="white"
                />
              </View>
            )}
          </View>
        </Overlay>
        <Image
          source={require('../../../common/assets/images/explorer.detail.class.jpeg')}
          style={{height: 200}}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setIsQR(true);
            setVisible(true);
          }}
          style={styles.icon}>
          <FontAwesome5Icon
            name="qrcode"
            size={25}
            style={{paddingTop: 10}}
            color={'green'}
            regular
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={_onPressStatus}>
          <View style={{backgroundColor: 'rgba(14, 202, 168, 0.63)'}}>
            <Text
              style={{
                fontSize: 23,
                padding: 10,
                color: 'blue',
                alignSelf: 'center',
              }}>
              {action}
            </Text>
          </View>
        </TouchableOpacity>
        <ScrollView style={{padding: 14}}>
          <Text h3>{classInfo.name}</Text>
          <Text style={[styles.markedText, {paddingTop: 20}]}>
            {new Date(classInfo.time).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            })}{' '}
            -{' '}
            {new Date(classInfo.time)
              .addMinutes(classInfo.duration_in_min)
              .toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            ,{' '}
            {new Date(classInfo.time).toLocaleDateString('en-us', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
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
                key={c.id}
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
                key={c.id}
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
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Feedback', {
                institution: classInfo.institution,
              });
            }}>
            <Text style={[styles.mainText, {color: 'blue'}]}>
              See all the feedbacks
            </Text>
          </TouchableOpacity>
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
          <View style={{padding: 10, alignSelf: 'center'}}>
            <MapView
              style={{width: width * 0.8, height: 250}}
              region={{
                latitude: parseFloat(classInfo.institution.latitude),
                longitude: parseFloat(classInfo.institution.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={{
                  latitude: parseFloat(classInfo.institution.latitude),
                  longitude: parseFloat(classInfo.institution.longitude),
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                title={classInfo.institution.name}
                description={classInfo.institution.general_info}
              />
            </MapView>
          </View>
          <Divider />
          <Text style={styles.subtitle}>Preparation</Text>
          <Text style={styles.mainText}>{classInfo.preparation_info}</Text>
          <Divider />
          <Text style={styles.subtitle}>When to arrive?</Text>
          <Text style={styles.mainText}>
            {classInfo.arrival_ahead_in_min} minutes before
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
        <Fab
          active={active}
          direction="up"
          containerStyle={{}}
          style={{backgroundColor: '#5067FF'}}
          position="bottomRight"
          onPress={() => {
            setActive(!active);
          }}>
          <Icon name="plus" type={'AntDesign'} />
          <Button
            style={{backgroundColor: '#34A34F'}}
            onPress={() => {
              props.navigation.navigate('ClassEdit', {
                classInfo: classInfo,
              });
            }}>
            <Icon name="edit" type={'AntDesign'} />
          </Button>
          <Button style={{backgroundColor: '#3B5998'}}>
            <Icon name="qrcode" type={'AntDesign'} />
          </Button>
        </Fab>
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
  center_gray: {
    color: '#999',
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
});

export default ClassDetail;
