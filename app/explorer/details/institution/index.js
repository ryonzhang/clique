import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from 'react-navigation-hooks';
import {
  Button,
  Text,
  Image,
  AirbnbRating,
  Badge,
  Overlay,
  Card,
} from 'react-native-elements';
import {Container, Header, Icon, Fab} from 'native-base';
import * as Animatable from 'react-native-animatable';
import colors from '../../../common/assets/color/color';
import Divider from 'react-native-material-ui/src/Divider';
import {STATUS} from '../../../common/constants';
import MapView, {Marker} from 'react-native-maps';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import axiosService from '../../../common/clients/api';

const InstitutionDetail = props => {
  const [institution, setInstitution] = useState({});
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(true);
  const {height, width} = Dimensions.get('window');
  const [user, setUser] = useState({});
  const [active, setActive] = useState(false);
  const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

  useFocusEffect(
    React.useCallback(() => {
      (async function() {
        let data = await AsyncStorage.getItem('@user');
        setUser(JSON.parse(data));
        console.log(data);
      })();
      (async function() {
        let response = await axiosService.get(
          '/institutions/' + props.navigation.state.params.id,
        );
        if (response.status === STATUS.UNPROCESSED_ENTITY) {
          props.navigation.navigate('Login');
        } else {
          let {data} = response;
          setInstitution(data.institution);
          setLiked(data.liked);
          setLoading(false);
        }
      })();
    }, [props.navigation]),
  );
  if (!loading) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <Image
          source={require('../../../common/assets/images/institution.detail.jpeg')}
          style={{height: 200}}
        />
        {user.role === 'consumer' && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              (async function() {
                let response = await axiosService.post(
                  '/institutions/' +
                    (liked ? 'defan/' : 'fan/') +
                    institution.id,
                );
                if (response.status === STATUS.UNPROCESSED_ENTITY) {
                  props.navigation.navigate('Login');
                } else {
                  setLiked(!liked);
                }
              })();
            }}
            style={styles.icon}>
            <AnimatedIcon
              ref={this.handleSmallAnimatedIconRef}
              name={liked ? 'heart' : 'hearto'}
              color={liked ? colors.heartColor : colors.textPrimary}
              size={30}
            />
          </TouchableOpacity>
        )}

        <ScrollView style={{padding: 14}}>
          <Text h3>{institution.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <Text style={styles.markedText}>Category:</Text>
            {institution.categories.map(c => (
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
            }}>
            <Text style={styles.markedText}>Tag:</Text>
            {institution.tags.map(c => (
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
              defaultRating={institution.star_num}
              showRating={false}
              size={15}
              isDisabled={true}
            />
            <Text style={{color: 'gray', paddingLeft: 10, top: 3}}>
              {institution.star_num}/5 according to {institution.feedback_count}
              feedbacks
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Feedback', {
                institution: institution,
              });
            }}>
            <Text style={[styles.mainText, {color: 'blue'}]}>
              See all the feedbacks
            </Text>
          </TouchableOpacity>
          <Divider />
          <Text style={styles.subtitle}>About us</Text>
          <Text style={styles.mainText}>{institution.general_info}</Text>
          <Divider />
          <Text style={styles.subtitle}>Location</Text>
          <Text style={styles.mainText}>
            {institution.unit} {institution.building} {institution.street},
            {institution.city},{institution.province},{institution.country},
            {institution.zipcode}
          </Text>
          <View style={{padding: 10, alignSelf: 'center'}}>
            <MapView
              style={{width: width * 0.8, height: 250}}
              region={{
                latitude: institution.latitude,
                longitude: institution.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={{
                  latitude: institution.latitude,
                  longitude: institution.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                title={institution.name}
                description={institution.general_info}
              />
            </MapView>
          </View>
          <Divider />
          <Text style={styles.subtitle}>How to arrive?</Text>
          <Text style={styles.mainText}>
            {institution.location_instruction}
          </Text>
          <Button
            title="Explore the calendar"
            type="solid"
            containerStyle={{paddingBottom: 40}}
            onPress={() => {
              props.navigation.navigate('Calendar', {
                name: institution.name,
                id: institution.id,
              });
            }}
          />
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
          {(user.role === 'partner' || user.role === 'admin') && (
            <Button
              style={{backgroundColor: '#34A34F'}}
              onPress={() => {
                props.navigation.navigate('InstitutionEdit', {
                  institution: institution,
                });
              }}>
              <Icon name="edit" type={'AntDesign'} />
            </Button>
          )}
          <Button
            style={{backgroundColor: '#3B5998'}}
            onPress={() => {
              props.navigation.navigate('Calendar', {
                name: institution.name,
                id: institution.id,
              });
            }}>
            <Icon name="calendar" type={'AntDesign'} />
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
  icon: {
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
});

export default InstitutionDetail;
