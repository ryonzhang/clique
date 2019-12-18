import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import {
  Input,
  Text,
  Divider,
  AirbnbRating,
  Overlay,
  Card,
  Button,
  Slider,
} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import CompletedList from '../../completed/list';
import FavoriteInstitutionList from '../details/institution/list';
import FriendsList from '../../friend/list';
import ExploreClassList from '../details/class/list';
import AsyncStorage from '@react-native-community/async-storage';
import {STATUS} from '../../common/constants';

Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
};

Date.getDaysInDays = function(days) {
  var dates = [];
  var currentDate = new Date();
  var endDate = currentDate.addDays(days);

  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = currentDate.addDays(1);
  }
  return dates;
};

Date.prototype.getLabel = function(days) {
  if (days.indexOf(this) == 0) {
    return 'Today';
  } else if (days.indexOf(this) == 1) {
    return 'Tomorrow';
  } else {
    return this.toLocaleDateString('en-us', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }
};

const List = props => {
  const dates = Date.getDaysInDays(14);
  const [visible, setVisible] = useState(false);
  const {height, width} = Dimensions.get('window');
  const [minCredit, setMinCredit] = useState(0);
  const [maxCredit, setMaxCredit] = useState(30);
  const [minDistance, setMinDistance] = useState(0.0);
  const [maxDistance, setMaxDistance] = useState(30.0);
  const [minHour, setMinHour] = useState(0.0);
  const [maxHour, setMaxHour] = useState(24);
  const [className, setClassName] = useState('');
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Overlay
        isVisible={visible}
        width={width * 0.8}
        onBackdropPress={() => setVisible(false)}>
        <View style={{flex: 1}}>
          <Text style={{alignSelf: 'center', fontSize: 26}}>Filters</Text>
          <Divider />
          <View style={{padding: 20}}>
            <Text style={{fontSize: 22}}>Credits</Text>
            <Text style={{fontSize: 15, color: 'gray'}}>0 to 30 credits</Text>

            <MultiSlider
              values={[minCredit, maxCredit]}
              sliderLength={280}
              onValuesChange={values => {
                setMinCredit(values[0]);
                setMaxCredit(values[1]);
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
              selected {minCredit} to {maxCredit} credits
            </Text>
          </View>
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
          <View style={{padding: 20}}>
            <Text style={{fontSize: 22}}>Hours</Text>
            <Text style={{fontSize: 15, color: 'gray'}}>0 to 24 o'clock </Text>

            <MultiSlider
              values={[minHour, maxHour]}
              sliderLength={280}
              onValuesChange={values => {
                setMinHour(values[0]);
                setMaxHour(values[1]);
              }}
              min={0}
              max={24}
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
              selected {minHour} to {maxHour} o'clock
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
              inputStyle={{paddingLeft: 10}}
              onChangeText={value => {
                setClassName(value);
              }}
            />
            <Input
              leftIcon={{type: 'font-awesome', name: 'map-marker'}}
              placeholder="  Singapore"
              inputContainerStyle={styles.input}
              containerStyle={styles.namingInput}
              inputStyle={{paddingLeft: 20}}
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
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}>
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
          </TouchableOpacity>
        </View>
        <Divider style={{backgroundColor: 'gray', marginTop: 10}} />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <ScrollableTabView
            tabBarUnderlineColor="#53ac49"
            tabBarActiveTextColor="#53ac49"
            renderTabBar={() => (
              <TabBar
                underlineColor="#53ac49"
                activeTabTextStyle={{color: '#53ac49'}}
              />
            )}>
            {dates.map(date => (
              <ExploreClassList
                {...props}
                tabLabel={{label: date.getLabel(dates)}}
                date={date}
                minHour={minHour}
                maxHour={maxHour}
                minDistance={minDistance}
                maxDistance={maxDistance}
                minCredit={minCredit}
                maxCredit={maxCredit}
                className={className}
              />
            ))}
          </ScrollableTabView>
        </View>
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
