import React, {useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {Text, AirbnbRating} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from 'react-navigation-hooks';
import colors from '../../../../common/assets/color/color';
import {STATUS} from '../../../../common/constants';
const FavoriteInstitutionList = props => {
  const URL = 'http://127.0.0.1:3000/institutions/favorites';

  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
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
          setInstitutions(data);
          setLoading(false);
          props.onLoad(data.length);
        }
      })();
    }, [props]),
  );
  if (!loading) {
    return (
      <>
        {institutions.map(institution => (
          <View
            tabLabel={{label: 'Previous', badge: 3}}
            style={{
              borderWidth: 1,
              borderColor: '#ddd',
              padding: 20,
            }}>
            <Text style={{fontSize: 17}} numberOfLines={1}>
              {institution.name}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <AirbnbRating
                count={5}
                defaultRating={institution.star_num}
                showRating={false}
                size={15}
                isDisabled={true}
              />
              <Text style={{color: 'gray', paddingLeft: 10, top: 3}}>
                {institution.star_num}/5 according to{' '}
                {institution.feedback_count} feedbacks
              </Text>
            </View>
          </View>
        ))}
      </>
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
  mainContainer: {
    flex: 1,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
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

export default FavoriteInstitutionList;
