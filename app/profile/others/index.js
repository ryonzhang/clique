import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {Text, Divider, Image} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import CompletedList from '../../completed/list';
import FavoriteInstitutionList from '../../explorer/details/institution/list';
import FriendsList from '../../friend/list';
import Upcoming from '../../upcoming';
import UpcomingList from '../../upcoming/list';
const OthersProfile = props => {
  const [user, setUser] = useState({});
  (async function() {
    setUser(props.navigation.state.params.user);
    console.log(user);
  })();
  const [numberOfCompletedList, setNumberOfCompletedList] = React.useState(0);
  const [
    numberOfFavorititeInstitutionList,
    setNumberOfFavorititeInstitutionList,
  ] = React.useState(0);
  const [numberOfFriendList, setNumberOfFriendList] = React.useState(0);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Home');
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              paddingLeft: 20,
              fontWeight: 'bold',
              paddingTop: 20,
              width: 250,
            }}
            h3>
            {user.name}
          </Text>
          <View style={{paddingTop: -10, paddingLeft: 20}}>
            <Image
              source={require('../../common/assets/images/dummy_profile.jpeg')}
              style={{height: 100, width: 100}}
              borderRadius={100}
            />
          </View>
        </View>
      </TouchableOpacity>

      <Divider style={{backgroundColor: 'gray', marginTop: 10}} />

      <ScrollableTabView
        tabBarUnderlineColor="#53ac49"
        tabBarActiveTextColor="#53ac49"
        tabBarStyle={{width: 200}}
        renderTabBar={() => (
          <TabBar
            underlineColor="#53ac49"
            tabMargin={Platform.OS === 'ios' ? 40 : 30}
            activeTabTextStyle={{color: '#53ac49'}}
          />
        )}>
        {user.is_previous_classes_visible && (
          <CompletedList
            user_id={user.id}
            {...props}
            tabLabel={{label: 'Previous', badge: numberOfCompletedList}}
            onLoad={value => setNumberOfCompletedList(value)}
          />
        )}

        {user.is_coming_classes_visible && (
          <UpcomingList
            user_id={user.id}
            {...props}
            tabLabel={{label: 'Upcoming', badge: numberOfCompletedList}}
            onLoad={value => setNumberOfCompletedList(value)}
          />
        )}
        {user.is_favorite_institutions_visible && (
          <FavoriteInstitutionList
            user_id={user.id}
            {...props}
            tabLabel={{
              label: 'Favorites',
              badge: numberOfFavorititeInstitutionList,
            }}
            onLoad={value => setNumberOfFavorititeInstitutionList(value)}
          />
        )}
      </ScrollableTabView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 28,
  },
  tabStyle: {},
  scrollStyle: {
    backgroundColor: 'white',
    paddingLeft: 65,
    paddingRight: 65,
    // justifyContent: 'center',
  },
  tabBarTextStyle: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  underlineStyle: {
    height: 3,
    backgroundColor: 'red',
    borderRadius: 3,
    width: 15,
  },
  tabItemHignlighted: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 7,
    paddingRight: 4,
    color: 'black',
  },
  tabItemDisabled: {
    fontSize: 20,
    paddingLeft: 7,
    paddingTop: 3,
    paddingRight: 4,
    fontWeight: 'bold',
    color: 'gray',
  },
  tabHighlighted: {
    borderBottomColor: 'blue',
    borderBottomWidth: 3,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 6,
  },
  tabDisabled: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
    paddingBottom: 6,
  },
  mainContainer: {
    flex: 1,
  },
  center_gray: {
    paddingLeft: 10,
    color: '#999',
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

export default OthersProfile;
