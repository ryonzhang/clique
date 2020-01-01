import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {Text, Divider} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import TabBar from 'react-native-underline-tabbar';
import CalendarClassList from './list';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {useFocusEffect} from 'react-navigation-hooks';
import {STATUS} from '../../../../common/constants';
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
  const [user, setUser] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      (async function() {
        let data = await AsyncStorage.getItem('@user');
        setUser(JSON.parse(data));
        console.log(data);
      })();
    }, []),
  );
  Calendar.navigationOptions = screenProps => ({
    headerTitle: screenProps.navigation.getParam('name'),
    headerRight: () => (
      <TouchableOpacity
        style={{paddingRight: 20, flex: 1}}
        onPress={() => {
          screenProps.navigation.navigate('ClassEdit',{institution_id:screenProps.navigation.getParam('id')});
        }}>
        <FontAwesome5Icon name="plus" size={25} color={'black'} />
      </TouchableOpacity>
    ),
  });
  const dates = Date.getDaysInDays(14);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
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
                {...props}
                tabLabel={{label: date.getLabel(dates)}}
                institution_id={props.navigation.state.params.id}
                date={date}
                institution_name={props.navigation.state.params.name}
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
