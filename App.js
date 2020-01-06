/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { enableScreens } from 'react-native-screens';
import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';
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
import QRGen from './app/explorer/details/class/qr-gen';
import Admin from './app/explorer/details/institution/admin';

// Experiment
import TabViewExample from './app/experiment/tab';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerApp from './app/common/components/DateTimePicker';
enableScreens();
const AdminNavigator = createNativeStackNavigator(
  {
    Calendar: {
      screen: Calendar,
    },
    Admin: {
      screen: Admin,
    },
    InstitutionDetail: {
      screen: InstitutionDetail,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Institution Detail',
      }),
    },
    InstitutionEdit: {
      screen: InstitutionEdit,
    },
    ClassDetail: {
      screen: ClassDetail,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Class Detail',
      }),
    },
    FeedbackClass: {
      screen: FeedbackClass,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Feedback',
      }),
    },

    ClassEdit: {
      screen: ClassEdit,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Input your class information',
      }),
    },
    Profile: {
      screen: Profile,
    },
    Feedback: {
      screen: Feedback,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Feedback',
      }),
    },
  },
  {
    initialRouteName: 'Admin',
  },
);

const ProfileNavigator = createNativeStackNavigator(
  {
    ClassDetail: {
      screen: ClassDetail,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Class Detail',
      }),
    },
    InstitutionDetail: {
      screen: InstitutionDetail,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Institution Detail',
      }),
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null,
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Settings',
      }),
    },
    Confidentiality: {
      screen: Confidentiality,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Confidentiality',
      }),
    },
    Account: {
      screen: Account,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Account',
      }),
    },
    OthersProfile: {
      screen: OthersProfile,
    },
    UserSearch: {
      screen: UserSearch,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Search Friend',
      }),
    },
  },
  {
    initialRouteName: 'Profile',
  },
);

const ExploreNavigator = createNativeStackNavigator(
  {
    FeedbackClass: {
      screen: FeedbackClass,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Feedback',
      }),
    },
    Feedback: {
      screen: Feedback,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Feedback',
      }),
    },
    Map: {
      screen: Map,
      navigationOptions: {
        header: null,
      },
    },
    Calendar: {
      screen: Calendar,
    },
    Explorer: {
      screen: List,
      navigationOptions: {
        header: null,
      },
    },
    InstitutionDetail: {
      screen: InstitutionDetail,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Institution Detail',
      }),
    },

    ClassDetail: {
      screen: ClassDetail,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Class Detail',
      }),
    },
  },
  {
    initialRouteName: 'Explorer',
  },
);

const HomeNavigator = createNativeStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      },
    },
    Upcoming: {
      screen: Upcoming,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Upcoming Cliques',
      }),
    },
    Completed: {
      screen: Completed,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Completed Cliques',
      }),
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const SettingNavigator = createNativeStackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Settings',
        headerLeft: (
          <TouchableOpacity
            style={{paddingLeft: 20, flex: 1}}
            onPress={() => {
              navigation.openDrawer();
            }}>
            <FontAwesome5Icon name="bars" size={25} color={'black'} />
          </TouchableOpacity>
        ),
      }),
    },
    Confidentiality: {
      screen: Confidentiality,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Confidentiality',
      }),
    },
    Account: {
      screen: Account,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Account',
      }),
    },
  },
  {
    initialRouteName: 'Settings',
  },
);

const DrawerNavigator = createDrawerNavigator(
  {
    Admin: {
      screen: AdminNavigator,
    },
    Explorer: {
      screen: ExploreNavigator,
    },
    Home: {
      screen: HomeNavigator,
    },
    Settings: {
      screen: SettingNavigator,
    },
    Profile: {
      screen: ProfileNavigator,
    },
  },
  {
    initialRouteName: 'Home',
    contentComponent: Drawer,
  },
);

const StarterNavigator = createNativeStackNavigator(
  {
    Login: {
      screen: Login,
      //     navigationOptions: () => ({
      //     drawerLockMode: 'locked-closed',
      // }),
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
    Home: {
      screen: DrawerNavigator,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(StarterNavigator);
