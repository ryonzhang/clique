import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Input,
  Text,
  Divider,
  AirbnbRating,
  Card,
  Image,
  Button,
  Overlay,
} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useFocusEffect} from 'react-navigation-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {STATUS} from '../../common/constants';
import {getLocation, hasLocationPermission} from '../../common/functions';
import Geolocation from 'react-native-geolocation-service';
import {getIn, setIn} from 'formik';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const Map = props => {
  const URL = 'http://127.0.0.1:3000/institutions/nearby';
  const [visible, setVisible] = useState(false);
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minDistance, setMinDistance] = useState(0.0);
  const [maxDistance, setMaxDistance] = useState(30.0);
  const {width, height} = Dimensions.get('window');
  const [lat, setLat] = useState(1.29027);
  const [long, setLong] = useState(103.851959);
  const [searchLat, setSearchLat] = useState(1.29027);
  const [searchLng, setSearchLng] = useState(103.851959);
  const [index, setIndex] = useState(0);
  const [loc, setLoc] = useState('');
  const refCarousel = useRef(null);

  const _renderItem = ({item, index}) => {
    return (
      <Card>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../common/assets/images/home_screen.jpeg')}
            style={{
              width: 200,
              height: 150,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../common/assets/images/home_screen.jpeg')}
              style={{height: 200}}
            />
            <View>
              <Text
                numberOfLines={2}
                style={{paddingLeft: 20, paddingTop: 20, width: 150}}>
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 20,
                  paddingTop: 10,
                }}>
                <Text>{item.star_num}</Text>
                <AirbnbRating size={10} count={1} showRating={false} />
                <Text>{item.feedback_count}</Text>
              </View>
            </View>
          </View>
        </View>
        <Divider style={{backgroundColor: 'gray', marginTop: -40}} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('InstitutionDetail', {
              id: item.id,
            });
            console.log(item);
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{padding: 5}}>Browse more info</Text>
            <FontAwesome5Icon
              name="chevron-right"
              size={10}
              style={{paddingTop: 10}}
              color={'black'}
              regular
            />
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  const getInstitutions = async () => {
    let response = await fetch(
      URL +
        '?latitude=' +
        searchLat +
        '&longitude=' +
        searchLng +
        '&min_distance=' +
        minDistance +
        '&max_distance=' +
        maxDistance,
      {
        headers: {
          Authorization: await AsyncStorage.getItem('@token'),
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.status === STATUS.UNPROCESSED_ENTITY) {
      props.navigation.navigate('Login');
    } else {
      let data = await response.json();
      setInstitutions(data);
      console.log(data);
      setLoading(false);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      console.log('pppppppp');
      (async function() {
        if (searchLng == 0 && searchLat == 0) {
          const hasLocationPermissionValue = await hasLocationPermission();
          //
          if (!hasLocationPermissionValue) {
            return;
          }

          await Geolocation.getCurrentPosition(
            async position => {
              setSearchLat(parseFloat(position.coords.latitude));
              setSearchLng(parseFloat(position.coords.longitude));
              setLat(parseFloat(position.coords.latitude));
              setLong(parseFloat(position.coords.longitude));
              await getInstitutions();
            },
            error => {
              console.log(error);
            },
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 10000,
              distanceFilter: 50,
              forceRequestLocation: true,
            },
          );
        } else {
          await getInstitutions();
        }
      })();
    }, [searchLng, searchLat, getInstitutions]),
  );
  return (
    <SafeAreaView style={[StyleSheet.absoluteFillObject, styles.mainContainer]}>
      <Overlay
        isVisible={visible}
        width={width * 0.8}
        height={height * 0.3}
        onBackdropPress={() => setVisible(false)}>
        <View style={{flex: 1}}>
          <Text style={{alignSelf: 'center', fontSize: 26}}>Filters</Text>
          <Divider />

          <View style={{padding: 20}}>
            <Text style={{fontSize: 22}}>Distance</Text>
            <Text style={{fontSize: 15, color: 'gray'}}>0 to 30 km</Text>

            <MultiSlider
              values={[minDistance, maxDistance]}
              sliderLength={280}
              onValuesChange={values => {
                setMinDistance(values[0]);
                setMaxDistance(values[1]);
              }}
              min={0}
              max={30}
              step={1}
              allowOverlap
              snapped
              selectedStyle={{
                backgroundColor: 'green',
              }}
              unselectedStyle={{
                backgroundColor: 'silver',
              }}
            />

            <Text style={{fontSize: 12, color: 'green'}}>
              selected {minDistance} to {maxDistance} km
            </Text>
          </View>

          <Divider />
          <Button
            title={'Confirm'}
            type="outline"
            onPress={() => {
              setVisible(false);
            }}
          />
        </View>
      </Overlay>
      <MapView
        style={[StyleSheet.absoluteFillObject, styles.mainContainer]}
        region={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {institutions.map((institution, i) => (
          <MapView.Marker
            pinColor={
              institutions.indexOf(institution) == index ? 'orange' : 'green'
            }
            coordinate={{
              latitude: parseFloat(institution.latitude),
              longitude: parseFloat(institution.longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            key={i}
            title={institution.name}
            description={institution.general_info}
            onPress={() => {
              setIndex(institutions.indexOf(institution));
              refCarousel.current.snapToItem(
                institutions.indexOf(institution),
                true,
                true,
              );
            }}
          />
        ))}
        <MapView.Marker
          pinColor={institutions.indexOf}
          coordinate={{
            latitude: searchLat,
            longitude: searchLng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title={loc}
        />
      </MapView>

      <GooglePlacesAutocomplete
        styles={{
          listView: {
            position: 'absolute',
            marginTop: 40,
            backgroundColor: 'white',
            elevation: 1,
          },
        }}
        enablePoweredByContainer={false}
        listViewDisplayed={false}
        placeholder="Search"
        minLength={2} // minimum length of text to search
        autoFocus={true}
        fetchDetails={true}
        zoomEnabled={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          //console.log(details);
          setSearchLat(parseFloat(details.geometry.location.lat));
          setSearchLng(parseFloat(details.geometry.location.lng));
          setLat(parseFloat(details.geometry.location.lat));
          setLong(parseFloat(details.geometry.location.lng));
          console.log(details.geometry.location.lat);
        }}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyC9kfnV1Go-bY35xKYC3lCHgguM1Aqo28o',
          language: 'en', // language of the results
        }}
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        debounce={50}
        renderLeftButton={() => (
          <TouchableOpacity
            style={{paddingVertical: 9, paddingLeft: 3}}
            onPress={() => {
              props.navigation.openDrawer();
            }}>
            <FontAwesome5Icon name="bars" size={25} color={'black'} />
          </TouchableOpacity>
        )}
        renderRightButton={() => (
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <TouchableOpacity
              style={{paddingVertical: 9, paddingRight: 10}}
              onPress={() => {
                setVisible(true);
              }}>
              <FontAwesome5Icon name="filter" size={25} color={'black'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{paddingVertical: 9, paddingRight: 5}}
              onPress={() => {
                props.navigation.navigate('Explorer');
                props.navigation.closeDrawer();
              }}>
              <FontAwesome5Icon name="list" size={25} color={'black'} />
            </TouchableOpacity>
          </View>
        )}
      />
      <Carousel
        ref={refCarousel}
        containerCustomStyle={{
          position: 'absolute',
          bottom: 20,
          elevation: 1,
        }}
        layout={'default'}
        data={institutions}
        renderItem={_renderItem}
        sliderWidth={width}
        onSnapToItem={index => {
          setLong(institutions[index].longitude);
          setLat(institutions[index].latitude);
          setIndex(index);
        }}
        itemWidth={width}
        hasParallaxImages={true}
        enableMomentum={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dateItemHignlighted: {
    fontSize: 14,
    paddingLeft: 7,
    paddingRight: 4,
    fontWeight: '300',
    color: 'blue',
  },
  dateItemDisabled: {
    fontSize: 12,
    paddingLeft: 7,
    paddingTop: 3,
    paddingRight: 4,
    fontWeight: '300',
    color: 'gray',
  },
  dateHighlighted: {
    borderBottomColor: 'blue',
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 6,
  },
  dateDisabled: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 6,
  },
  mainContainer: {
    flex: 1,
  },
  center_gray: {
    paddingLeft: 10,
    color: '#999',
  },
  container: {
    flex: 1,
  },
  font: {
    fontSize: 17,
    lineHeight: 26,
    alignSelf: 'center',
    color: 'rgba(0, 0, 0, 0.38)',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.18)',
    borderRadius: 10,
    margin: 0,
    padding: 0,
    height: 36,
  },
  inputContainer: {
    padding: 5,
    margin: 0,
  },
});

export default Map;
