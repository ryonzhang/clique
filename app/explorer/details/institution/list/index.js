/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Text, AirbnbRating} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from 'react-navigation-hooks';
import colors from '../../../../common/assets/color/color';
import {STATUS} from '../../../../common/constants';
import axiosService from '../../../../common/clients/api';
const FavoriteInstitutionList = props => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      (async function() {
        let response = await axiosService.get(
          '/institutions/favorites/' + (props.user_id ? props.user_id : ''),
        );
        if (response.status === STATUS.UNPROCESSED_ENTITY) {
          props.navigation.navigate('Login');
        } else {
          let {data} = response;
          setInstitutions(data);
          setLoading(false);
          props.onLoad(data.length);
        }
      })();
    }, []),
  );
  if (!loading) {
    return (
      <ScrollView>
        {institutions.map(institution => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('InstitutionDetail', {
                id: institution.id,
              });
            }}>
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
          </TouchableOpacity>
        ))}
      </ScrollView>
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
