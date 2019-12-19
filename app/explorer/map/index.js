import React from 'react';
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
import MapView, {Marker} from "react-native-maps";

const Map = props => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{paddingLeft: 20, flex: 1}}
            onPress={() => {
              props.navigation.openDrawer();
            }}>
            <FontAwesome5Icon name="bars" size={25} color={'black'} />
          </TouchableOpacity>
          <View style={{flex: 10, left: -8, top: -6}}>
            <Input
              leftIcon={{type: 'font-awesome', name: 'search'}}
              placeholder="  Find a nearby class"
              inputContainerStyle={styles.input}
              containerStyle={styles.inputContainer}
            />
            <Input
              leftIcon={{type: 'font-awesome', name: 'map-marker'}}
              placeholder="   Singapore"
              inputContainerStyle={styles.input}
              containerStyle={styles.namingInput}
            />
          </View>
          <View style={{flex: 1, paddingRight: 5}}>
            <Text style={{fontSize: 18}}>50</Text>
            <Text style={{fontSize: 8}}>credits</Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Explorer');
                props.navigation.closeDrawer();
              }}>
              <FontAwesome5Icon
                name="list"
                size={25}
                style={{paddingTop: 10}}
                color={'black'}
                regular
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', paddingTop: 5}}>
          <View
            style={{
              flexDirection: 'row',
              borderColor: '#ccc',
              borderRadius: 10,
              borderWidth: 1,
              marginLeft: 10,
            }}>
            <FontAwesome5Icon
              name="filter"
              size={14}
              style={{paddingTop: 2, paddingLeft: 7, paddingRight: 4}}
              color={'black'}
              regular
            />
            <Text style={{fontSize: 14, paddingRight: 10, fontWeight: '300'}}>
              Filters
            </Text>
          </View>
        </View>
        <Divider style={{backgroundColor: 'gray', marginTop: 10}} />
      </View>
      <MapView
          style={{flex:1}}
          region={{
            latitude: 1,
            longitude: 1,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
        <Marker
            coordinate={{
              latitude: 1,
              longitude: 1,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            title={'classInfo.institution.name'}
            description={'classInfo.institution.general_info'}
        />
      </MapView>
      <View>

        <ScrollView>
          <View>
            <Card>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../common/assets/images/home_screen.jpeg')}
                  style={{
                    width: 200,
                    height: 150,
                    shadowOffset: {width: 30, height: 3},
                    shadowColor: 'gray',
                    shadowOpacity: 1.0,
                  }}
                />
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../../common/assets/images/home_screen.jpeg')}
                    style={{height: 200}}
                  />
                  <View>
                    <Text
                      numberOfLines={1}
                      style={{paddingLeft: 20, paddingTop: 20}}>
                      PIRATE EDUCATION
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingLeft: 20,
                        paddingTop: 10,
                      }}>
                      <Text>4.0</Text>
                      <AirbnbRating size={10} count={1} showRating={false} />
                      <Text>500+</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Divider style={{backgroundColor: 'gray', marginTop: -40}} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{padding: 5}}>Explore the calendar</Text>
                <FontAwesome5Icon
                  name="chevron-right"
                  size={10}
                  style={{paddingTop: 10}}
                  color={'black'}
                  regular
                />
              </View>
            </Card>
          </View>
        </ScrollView>
      </View>
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
