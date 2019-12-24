/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Icon,
  TouchableOpacity,
} from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './app/starter/login';
import Signup from './app/starter/signup';
import Reset from './app/starter/reset';
import Starter from './app/starter/starter';
import Home from './app/home';
import List from './app/explorer/list';
import Map from './app/explorer/map';
import ClassDetail from './app/explorer/details/class';
import InstitutionDetail from './app/explorer/details/institution';
import ApplicationDetail from './app/explorer/details/institution';
import Calendar from './app/explorer/details/institution/calendar';
import Profile from './app/profile';
import Account from './app/profile/account';
import Settings from './app/profile/settings';
import Confidentiality from './app/profile/confidentiality';
import Upcoming from './app/upcoming';
import Drawer from './app/drawer';
import Completed from './app/completed';
import InstitutionEdit from './app/explorer/details/institution/edit';
import ClassEdit from './app/explorer/details/class/edit';
import ExploreClassList from './app/explorer/details/class/list';
import {StackActions} from 'react-navigation';
import Feedback from './app/explorer/details/institution/feedback';
import FeedbackClass from './app/explorer/details/class/feedback';
import OthersProfile from './app/profile/others';
import UserSearch from './app/friend/searchable';
import GooglePlacesAutocomplete from 'react-native-google-places-autocomplete';

// Experiment
import TabViewExample from './app/experiment/tab';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const AppStackNavigator = createStackNavigator(
  {
    ClassDetail: {
      screen: ClassDetail,
      navigationOptions: ({navigation}) => ({
        headerLeft: (
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                StackActions.pop({
                  n: 1,
                }),
              )
            }>
            <FontAwesome5Icon
              name="arrow-left"
              size={25}
              style={{paddingLeft: 20}}
              color={'black'}
            />
          </TouchableOpacity>
        ),
        headerTitle: 'Class Detail',
      }),
    },
    InstitutionDetail: {
      screen: InstitutionDetail,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Institution Detail',
      }),
    },
    Explorer: {
      screen: List,
      navigationOptions: {
        header: null,
      },
    },
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      },
    },
    Map: {
      screen: Map,
      navigationOptions: {
        header: null,
      },
    },

    Calendar: {
      screen: Calendar,
      navigationOptions: {
        header: null,
      },
    },
    ExploreClassList: {
      screen: ExploreClassList,
    },
    Feedback: {
      screen: Feedback,
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null,
      },
    },
    OthersProfile: {
      screen: OthersProfile,
    },
    UserSearch: {
      screen: UserSearch,
    },
    FeedbackClass: {
      screen: FeedbackClass,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Feedback',
      }),
    },
  },
  {
    headerMode: 'screen',
  },
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    UserSearch: {
      screen: UserSearch,
    },
    ExploreClassList: {
      screen: ExploreClassList,
    },
    Stack: {
      screen: AppStackNavigator,
    },
    Map: {
      screen: Map,
    },

    Home: {
      screen: Home,
    },
    Explorer: {
      screen: List,
    },

    Calendar: {
      screen: Calendar,
    },

    Login: {
      screen: Login,
    },
    ApplicationDetail: {
      screen: ApplicationDetail,
    },
    Signup: {
      screen: Signup,
    },
    Reset: {
      screen: Reset,
    },
    Starter: {
      screen: Starter,
    },
    Confidentiality: {
      screen: Confidentiality,
    },
    Upcoming: {
      screen: Upcoming,
    },
    Completed: {
      screen: Completed,
    },
    Profile: {
      screen: Profile,
    },
    Settings: {
      screen: Settings,
    },
    Account: {
      screen: Account,
    },
    InstitutionEdit: {
      screen: InstitutionEdit,
    },
    ClassEdit: {
      screen: ClassEdit,
    },
    OthersProfile: {
      screen: OthersProfile,
    },
  },
  {
    initialRouteName: 'Home',
    contentComponent: Drawer,
  },
);

export default createAppContainer(AppDrawerNavigator);
