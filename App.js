/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

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

// Experiment
import TabViewExample from './app/experiment/tab';

const AppNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
    Explorer: {
      screen: List,
    },
    Map: {
      screen: Map,
    },
    Calendar: {
      screen: Calendar,
    },
    ClassDetail: {
      screen: ClassDetail,
    },
    InstitutionDetail: {
      screen: InstitutionDetail,
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
  },
  {
    initialRouteName: 'Home',
    contentComponent: Drawer,
  },
);

export default createAppContainer(AppNavigator);
