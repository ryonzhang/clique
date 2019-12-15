import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Input, Text, Divider, AirbnbRating} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const List = props => {
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
                props.navigation.navigate('Map');
                props.navigation.closeDrawer();
              }}>
              <FontAwesome5Icon
                name="globe-asia"
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
          <View
            style={{
              flexDirection: 'row',
              borderColor: '#ccc',
              borderRadius: 10,
              borderWidth: 1,
              marginLeft: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                paddingLeft: 7,
                paddingRight: 4,
                fontWeight: '300',
              }}>
              Hours
            </Text>
            <FontAwesome5Icon
              name="chevron-down"
              size={14}
              style={{
                paddingTop: 2,
                paddingLeft: 7,
                paddingRight: 4,
                fontWeight: '200',
              }}
              color={'down-arrow'}
              light
            />
          </View>
        </View>
        <Divider style={{backgroundColor: 'gray', marginTop: 10}} />
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}>
          <ScrollView horizontal={true}>
            <View style={styles.dateHighlighted}>
              <Text style={styles.dateItemHignlighted}>Today</Text>
            </View>
            <View style={styles.dateDisabled}>
              <Text style={styles.dateItemDisabled}>Tomorrow</Text>
            </View>
            <View style={styles.dateDisabled}>
              <Text style={styles.dateItemDisabled}>3 Dec</Text>
            </View>

            <View style={styles.dateDisabled}>
              <Text style={styles.dateItemDisabled}>4 Dec</Text>
            </View>

            <View style={styles.dateDisabled}>
              <Text style={styles.dateItemDisabled}>5 Dec</Text>
            </View>
            <View style={styles.dateDisabled}>
              <Text style={styles.dateItemDisabled}>6 Dec</Text>
            </View>

            <View style={styles.dateDisabled}>
              <Text style={styles.dateItemDisabled}>7 Dec</Text>
            </View>
          </ScrollView>
        </View>
      </View>
      <View>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#ddd',
              padding: 20,
            }}>
            <View style={{flex: 2, flexDirection: 'column'}}>
              <Text>17:30</Text>
              <Text style={styles.center_gray}>85</Text>
              <Text style={styles.center_gray}>min</Text>
            </View>
            <View style={{flex: 8, flexDirection: 'column'}}>
              <Text style={{fontSize: 17}} numberOfLines={1}>
                Reformer Introduction + Weight Lifting
              </Text>
              <Text style={{color: '#999'}}>Pilates education Serangoon</Text>
              <View style={{flexDirection: 'row'}}>
                <AirbnbRating
                  count={5}
                  showRating={false}
                  size={15}
                  isDisabled={true}
                />
                <Text style={styles.center_gray}>4.0/5</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#ddd',
              padding: 20,
            }}>
            <View style={{flex: 2, flexDirection: 'column'}}>
              <Text>17:30</Text>
              <Text style={styles.center_gray}>85</Text>
              <Text style={styles.center_gray}>min</Text>
            </View>
            <View style={{flex: 8, flexDirection: 'column'}}>
              <Text style={{fontSize: 17}} numberOfLines={1}>
                Reformer Introduction + Weight Lifting
              </Text>
              <Text style={{color: '#999'}}>Pilates education Serangoon</Text>
              <View style={{flexDirection: 'row'}}>
                <AirbnbRating
                  count={5}
                  showRating={false}
                  size={15}
                  isDisabled={true}
                />
                <Text style={styles.center_gray}>4.0/5</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#ddd',
              padding: 20,
            }}>
            <View style={{flex: 2, flexDirection: 'column'}}>
              <Text>17:30</Text>
              <Text style={styles.center_gray}>85</Text>
              <Text style={styles.center_gray}>min</Text>
            </View>
            <View style={{flex: 8, flexDirection: 'column'}}>
              <Text style={{fontSize: 17}} numberOfLines={1}>
                Reformer Introduction + Weight Lifting
              </Text>
              <Text style={{color: '#999'}}>Pilates education Serangoon</Text>
              <View style={{flexDirection: 'row'}}>
                <AirbnbRating
                  count={5}
                  showRating={false}
                  size={15}
                  isDisabled={true}
                />
                <Text style={styles.center_gray}>4.0/5</Text>
              </View>
            </View>
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

export default List;
