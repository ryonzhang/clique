import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import {Text, Divider} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Calendar = props => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <FontAwesome5Icon
            name="arrow-left"
            size={25}
            style={{paddingLeft: 20, flex: 1}}
            color={'black'}
          />
          <Text style={{flex: 7, fontSize: 18, textAlign: 'center'}}>
            Pilates education Serangoon
          </Text>
          <View style={{flex: 1, paddingRight: 5}}>
            <Text style={{fontSize: 18}}>50</Text>
            <Text style={{fontSize: 8}}>credits</Text>
          </View>
        </View>

        <Divider style={{backgroundColor: 'gray', marginTop: 10}} />
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}>
          <ScrollView horizontal={true}>
            <View style={styles.dateHighlighted}>
              <Text style={styles.dateItemHignlighted}>Today</Text>
            </View>
            <View style={styles.dateDisabled}>
              <Text style={styles.dateItemDisabled}>Tomorrow</Text>
            </View>
            <View style={styles.dateDisabled}>
              <Text style={styles.dateItemDisabled}>3 Dec</Text>
            </View>

            <View style={styles.dateDisabled}>
              <Text style={styles.dateItemDisabled}>4 Dec</Text>
            </View>

            <View style={styles.dateDisabled}>
              <Text style={styles.dateItemDisabled}>5 Dec</Text>
            </View>
            <View style={styles.dateDisabled}>
              <Text style={styles.dateItemDisabled}>6 Dec</Text>
            </View>

            <View style={styles.dateDisabled}>
              <Text style={styles.dateItemDisabled}>7 Dec</Text>
            </View>
          </ScrollView>
        </View>
      </View>
      <View>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#ddd',
              padding: 20,
            }}>
            <View style={{flex: 2, flexDirection: 'column'}}>
              <Text>17:30</Text>
              <Text style={styles.center_gray}>85</Text>
              <Text style={styles.center_gray}>min</Text>
            </View>
            <View style={{flex: 8, flexDirection: 'column'}}>
              <Text style={{fontSize: 17}} numberOfLines={1}>
                Reformer Introduction + Weight Lifting
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#ddd',
              padding: 20,
            }}>
            <View style={{flex: 2, flexDirection: 'column'}}>
              <Text>17:30</Text>
              <Text style={styles.center_gray}>85</Text>
              <Text style={styles.center_gray}>min</Text>
            </View>
            <View style={{flex: 8, flexDirection: 'column'}}>
              <Text style={{fontSize: 17}} numberOfLines={1}>
                Reformer Introduction + Weight Lifting
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#ddd',
              padding: 20,
            }}>
            <View style={{flex: 2, flexDirection: 'column'}}>
              <Text>17:30</Text>
              <Text style={styles.center_gray}>85</Text>
              <Text style={styles.center_gray}>min</Text>
            </View>
            <View style={{flex: 8, flexDirection: 'column'}}>
              <Text style={{fontSize: 17}} numberOfLines={1}>
                Reformer Introduction + Weight Lifting
              </Text>
            </View>
          </View>
        </ScrollView>
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
