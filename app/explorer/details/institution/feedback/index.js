/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import {useFocusEffect} from 'react-navigation-hooks';
import {Text, AirbnbRating, Card} from 'react-native-elements';
import colors from '../../../../common/assets/color/color';
import {STATUS} from '../../../../common/constants';
import axiosService from '../../../../common/clients/api';

const Feedback = props => {
  const institution = props.navigation.state.params.institution;
  const URL =
    'http://127.0.0.1:3000/institutions/' + institution.id + '/feedbacks';
  console.log(URL);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const {height, width} = Dimensions.get('window');
  const _renderFooter = () => {
    if (!loading) {
      return null;
    }

    return (
      <View
        style={{
          position: 'relative',
          width: width,
          height: height,
          paddingVertical: 20,
          borderTopWidth: 1,
          marginTop: 10,
          marginBottom: 10,
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  const _loadMore = async () => {
    let response = await axiosService.get(
        '/institutions/' + institution.id + '/feedbacks?limit=' + limit + '&offset=' + offset,
    );
    if (response.status === STATUS.UNPROCESSED_ENTITY) {
      props.navigation.navigate('Login');
    } else {
      let {data} = response;
      console.log(data);
      setFeedbacks([...feedbacks, ...data]);
      setOffset(limit + offset);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      _loadMore();
    }, []),
  );
  if (!loading) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <Text h4 style={{alignSelf: 'center'}}>
          {institution.name}
        </Text>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
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
        <ScrollView>
          <FlatList
            contentContainerStyle={{
              flex: 1,
              flexDirection: 'column',
              height: '100%',
              width: '100%',
            }}
            data={feedbacks}
            renderItem={({item}) => (
              <Card>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderBottomWidth: 1,
                      borderBottomColor: '#ccc',
                    }}>
                    <Text style={{fontSize: 16}}>{item.user.name}</Text>
                    <AirbnbRating
                      count={5}
                      defaultRating={item.star_num}
                      showRating={false}
                      size={15}
                      isDisabled={true}
                    />
                  </View>
                  <Text style={{color: 'gray'}}>{item.comment}</Text>
                </View>
              </Card>
            )}
            onEndReached={_loadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            ListFooterComponent={_renderFooter}
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

export default Feedback;
