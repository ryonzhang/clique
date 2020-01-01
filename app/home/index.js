import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from 'react-navigation-hooks';
import {Button, Text, Card} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '../common/assets/color/color';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {STATUS} from '../common/constants';
import axiosService from '../common/clients/api';
const Home = props => {
  const [sessions, setSessions] = useState([]);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      (async function() {
        let response = await axiosService.get('/sessions/new');
        if (response.status === STATUS.UNPROCESSED_ENTITY) {
          props.navigation.navigate('Login');
        } else {
          let {data} = response;
          setSessions(data.sessions);
          setUpcomingCount(data.upcoming_count);
          setCompletedCount(data.completed_count);
          setLoading(false);
        }
      })();
    }, [props.navigation]),
  );
  if (!loading) {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={{flex: 3, backgroundColor: '#02CDBE'}}>
          <FontAwesome5Icon
            name="bars"
            size={25}
            style={{padding: 20}}
            color={'white'}
            onPress={() => props.navigation.toggleDrawer()}
          />
          <Text h2 style={{color: 'white', alignSelf: 'center', flex: 7}}>
            Ignite your passion
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 20,
              flex: 3,
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Upcoming')}>
              <Text style={{fontSize: 15, color: 'white'}}>
                {upcomingCount} booked
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Completed')}>
              <Text style={{fontSize: 15, color: 'white'}}>
                {completedCount} accomplished
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 7}}>
          <ScrollView style={{padding: 20}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#666'}}>
              Try Clique
            </Text>
            <Card image={require('../common/assets/images/home.screen.1.jpeg')}>
              <Text style={{marginBottom: 10, fontSize: 17}}>
                Your most flexible education membership
              </Text>
              <Text style={{marginBottom: 10, color: '#999'}}>
                Book classes,watch videos and build a community that taps into
                your healthiest self
              </Text>
              <Button
                type="clear"
                title="Find a class"
                style={{alignSelf: 'flex-start'}}
                onPress={() => props.navigation.navigate('Explorer')}
              />
            </Card>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#666',
                paddingTop: 20,
              }}>
              Join your friends
            </Text>

            <Card image={require('../common/assets/images/home.screen.2.png')}>
              <Text style={{marginBottom: 10, fontSize: 17}}>
                See what your friends are taking
              </Text>
              <Text style={{marginBottom: 10, color: '#999'}}>
                Add friends to take classes together, see each other’s
                activities and share favorite classes.
              </Text>
              <Button
                type="clear"
                title="Connect with friends on Clique"
                style={{alignSelf: 'flex-start'}}
                onPress={() => props.navigation.navigate('Profile')}
              />
            </Card>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#666',
                paddingTop: 20,
              }}>
              New
            </Text>
            {sessions.map(s => (
              <Card
                key={sessions.indexOf(s)}
                image={require('../common/assets/images/home.screen.3.jpeg')}>
                <Text style={{marginBottom: 10, fontSize: 17}}>
                  {s.classinfo.name}
                </Text>
                <Text
                  style={{marginBottom: 10, color: '#999'}}
                  numberOfLines={3}>
                  {s.classinfo.general_info}
                </Text>
                <Button
                  type="clear"
                  title="Book now"
                  style={{alignSelf: 'flex-start'}}
                  onPress={() => {
                    props.navigation.navigate('ClassDetail', {
                      id: s.classinfo.id,
                    });
                  }}
                />
              </Card>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator
          size="large"
          color="#00ff00"
          style={{alignSelf: 'center'}}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  facebook: {
    backgroundColor: colors.facebook,
  },
  google: {
    backgroundColor: colors.google,
  },
  padding_top_25: {
    paddingTop: 10,
  },
  font: {
    fontSize: 17,
    lineHeight: 26,
    alignSelf: 'center',
    color: 'rgba(0, 0, 0, 0.38)',
    justifyContent: 'center',
  },
  or: {
    paddingBottom: 50,
    paddingTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.18)',
    padding: 0,
  },
});

export default Home;
