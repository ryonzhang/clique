import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Text,
  Image,
  AirbnbRating,
  Badge,
  Overlay,
  Card,
} from 'react-native-elements';
import colors from '../../../common/assets/color/color';
import Divider from 'react-native-material-ui/src/Divider';
import {STATUS} from '../../../common/constants';

const InstitutionDetail = props => {
  const URL =
    'http://127.0.0.1:3000/institutions/' + props.navigation.state.params.id;
  console.log(URL);
  const [institution, setInstitution] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async function() {
      let response = await fetch(URL, {
        headers: {
          Authorization: await AsyncStorage.getItem('@token'),
          'Content-Type': 'application/json',
        },
      });
      if (response.status === STATUS.UNPROCESSED_ENTITY) {
        props.navigation.navigate('Login');
      } else {
        let data = await response.json();
        setInstitution(data);
        setLoading(false);
      }
    })();
  }, [URL, props.navigation, props.navigation.state.params.id]);
  if (!loading) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <Image
          source={require('../../../common/assets/images/institution.detail.jpeg')}
          style={{height: 200}}
        />

        <ScrollView style={{padding: 14}}>
          <Text h3>{institution.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <Text style={styles.markedText}>Category:</Text>
            {institution.categories.map(c => (
              <Badge
                status="success"
                value={c.name}
                containerStyle={{padding: 0.5}}
                badgeStyle={{backgroundColor: '#999'}}
              />
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <Text style={styles.markedText}>Tag:</Text>
            {institution.tags.map(c => (
              <Badge
                status="success"
                value={c.name}
                containerStyle={{padding: 0.5}}
                badgeStyle={{backgroundColor: '#999'}}
              />
            ))}
          </View>

          <Divider />
          <Text style={styles.subtitle}>Evaluation of the instituation</Text>

          <View style={{flexDirection: 'row'}}>
            <AirbnbRating
              count={5}
              defaultRating={institution.star_num}
              showRating={false}
              size={15}
              isDisabled={true}
            />
            <Text style={{color: 'gray', paddingLeft: 10, top: 3}}>
              {institution.star_num}/5 according to {institution.feedback_count}{' '}
              feedbacks
            </Text>
          </View>

          <Text style={[styles.mainText, {color: 'blue'}]}>
            See all the feedbacks
          </Text>
          <Divider />
          <Text style={styles.subtitle}>About us</Text>
          <Text style={styles.mainText}>{institution.general_info}</Text>
          <Divider />
          <Text style={styles.subtitle}>Location</Text>
          <Text style={styles.mainText}>
            {institution.unit} {institution.building} {institution.street},
            {institution.city},{institution.province},{institution.country},
            {institution.zipcode}
          </Text>
          <View style={{padding: 10}}>
            <Image
              source={require('../../../common/assets/images/class.detail.map.png')}
              style={{height: 200}}
            />
          </View>
          <Divider />
          <Text style={styles.subtitle}>How to arrive?</Text>
          <Text style={styles.mainText}>
            {institution.location_instruction}
          </Text>
          <Button
            title="Explore the calendar"
            type="solid"
            containerStyle={{paddingBottom: 40}}
            onPress={() => {
              props.navigation.navigate('Calendar', {
                name: institution.name,
                id: institution.id,
              });
            }}
          />
        </ScrollView>
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
  subtitle: {
    fontSize: 17,
    padding: 5,
    fontWeight: 'bold',
  },
  markedText: {
    fontSize: 17,
    padding: 3,
  },
  mainText: {
    padding: 5,
  },
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 30,
  },
  facebook: {
    backgroundColor: colors.facebook,
  },
  google: {
    backgroundColor: colors.google,
  },
  padding_top_25: {
    paddingTop: 25,
  },
  font: {
    fontSize: 17,
    lineHeight: 26,
    alignSelf: 'center',
    color: 'rgba(0, 0, 0, 0.38)',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
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

export default InstitutionDetail;
