import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Text, Divider} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import TabBar from 'react-native-underline-tabbar';
import CalendarClassList from './list';
import ScrollableTabView from 'react-native-scrollable-tab-view';
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
const Calendar = props => {
  const dates = Date.getDaysInDays(14);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              console.log('ryon');
              props.navigation.navigate('InstitutionDetail', {
                id: props.navigation.state.params.id,
              });
            }}>
            <FontAwesome5Icon
              name="arrow-left"
              size={25}
              style={{paddingLeft: 20, flex: 1}}
              color={'black'}
            />
          </TouchableOpacity>
          <Text style={{flex: 7, fontSize: 18, textAlign: 'center'}}>
            {props.navigation.state.params.name}
          </Text>
          <View style={{flex: 1, paddingRight: 5}}>
            <Text style={{fontSize: 18}}>50</Text>
            <Text style={{fontSize: 8}}>credits</Text>
          </View>
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
              <CalendarClassList
                tabLabel={{label: date.getLabel(dates)}}
                institution_id={props.navigation.state.params.id}
                date={date}
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

export default Calendar;
