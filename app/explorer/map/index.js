import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Input,
  Text,
  Divider,
  AirbnbRating,
  Card,
  Image,
} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useFocusEffect} from 'react-navigation-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {STATUS} from '../../common/constants';
import {getLocation} from '../../common/functions';

const Map = props => {
  const URL = 'http://127.0.0.1:3000/institutions/nearby';

  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [loc, setLoc] = useState('');
  useFocusEffect(
    React.useCallback(() => {
      (async function() {
        if (lat == 0 && long == 0) {
          const location = await getLocation();
          setLat(parseFloat(location.coords.latitude));
          setLong(parseFloat(location.coords.longitude));
        }

        let response = await fetch(
          URL + '?latitude=' + lat + '&longitude=' + long,
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
      })();
    }, [lat, long, props.navigation]),
  );
  return (
    <SafeAreaView style={[StyleSheet.absoluteFillObject, styles.mainContainer]}>
      <MapView
        style={[StyleSheet.absoluteFillObject, styles.mainContainer]}
        region={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {institutions.map((institution, index) => (
          <MapView.Marker
            pinColor={'green'}
            coordinate={{
              latitude: parseFloat(institution.latitude),
              longitude: parseFloat(institution.longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            key={index}
            title={institution.name}
            description={institution.general_info}
          />
        ))}
        <MapView.Marker
          pinColor={'blue'}
          coordinate={{
            latitude: lat,
            longitude: long,
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
          setLat(parseFloat(details.geometry.location.lat));
          setLong(parseFloat(details.geometry.location.lng));
          console.log(data.description);
          setLoc(data.description);
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
                props.navigation.openDrawer();
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
