import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Picker,
  PickerItem,
  Button,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Input, Text, Header} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useFocusEffect} from 'react-navigation-hooks';
import {compose} from 'recompose';
import DatePicker from '../../../../common/components/DatePicker';
import {Dropdown} from 'react-native-material-dropdown';
import moment from 'moment';
import makeInput, {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
  KeyboardModal,
  withFormikControl,
  withPickerValues,
} from 'react-native-formik';
import {FilledTextField} from 'react-native-material-textfield';
import {STATUS} from '../../../../common/constants';
import {Platform} from 'react-native';
const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(FilledTextField);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false,
});
const FocusedDatePicker = compose(
  withFormikControl,
  withNextInputAutoFocusInput,
)(DatePicker);

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('please! email?')
    .email("well that's not an email"),
  first_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  last_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const validate = (values, props /* only available when using withFormik */) => {
  const errors = {};
  try {
    console.log(values.birthday && values.birthday > Date.now());
    if (values.birthday && values.birthday > Date.now()) {
      errors.birthday = 'You should be borned';
    }
    validationSchema.validateSync(values, {abortEarly: false});
  } catch (error) {
    return {...getErrorsFromValidationError(error), ...errors};
  }

  return errors;
};

function getErrorsFromValidationError(validationError) {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    };
  }, {});
}

const ClassEdit = props => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    React.useCallback(
      React.useCallback(() => {
        (async function() {
          let data = await AsyncStorage.getItem('@user');
          setUser(JSON.parse(data));
          setLoading(false);
          console.log(data);
        })();
      }, []),
    ),
  );
  if (!loading) {
    return (
      <>
        <SafeAreaView style={styles.mainContainer}>
          <Header
            containerStyle={{
              backgroundColor: '#ccc',
              justifyContent: 'space-around',
              marginTop: Platform.OS === 'ios' ? -60 : -30,
            }}
            leftComponent={
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Settings');
                }}>
                <FontAwesome5Icon name="arrow-left" size={20} color={'black'} />
              </TouchableOpacity>
            }
            centerComponent={<Text style={{fontSize: 20}}>Class</Text>}
          />
          <ScrollView>
            <Formik
              initialValues={{}}
              validate={validate}
              onSubmit={values => {
                const URL = 'http://127.0.0.1:3000/users/update';
                (async function() {
                  let response = await fetch(URL, {
                    headers: {
                      Authorization: await AsyncStorage.getItem('@token'),
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                    method: 'POST',
                  });
                  if (response.status === STATUS.ACCEPTED) {
                    await AsyncStorage.setItem('@user', JSON.stringify(values));
                    setUser(values);
                    alert('Your account has been updated');
                  } else {
                    alert('Your account fails to be updated');
                  }
                })();
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <Form>
                  <MyInput
                    label="Name"
                    name="name"
                    type="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  <MyInput
                    label="About the class"
                    name="general_info"
                    type="general_info"
                    multiline={true}
                    value={values.general_info}
                    onChange={handleChange}
                  />

                  <MyInput
                    label="How many minutes in advance"
                    name="arrival_ahead_in_min"
                    type="arrival_ahead_in_min"
                    value={values.arrival_ahead_in_min}
                    onChange={handleChange}
                  />
                  <MyInput
                    label="Vacancies"
                    name="vacancies"
                    type="vacancies"
                    value={values.vacancies}
                    onChange={handleChange}
                  />
                  <MyInput
                    label="How to prepare"
                    name="preparation_info"
                    type="preparation_info"
                    multiline={true}
                    value={values.general_info}
                    onChange={handleChange}
                  />
                  <MyInput
                    label="Additional Information"
                    name="additional_info"
                    type="additional_info"
                    multiline={true}
                    value={values.additional_info}
                    onChange={handleChange}
                  />
                  <FocusedDatePicker
                    label="Bookable before"
                    name="bookable_before"
                    type="bookable_before"
                    value={
                      values.bookable_before
                        ? new Date(values.bookable_before).toLocaleDateString()
                        : null
                    }
                    values={values}
                  />
                  <FocusedDatePicker
                    label="Bookable after"
                    name="bookable_after"
                    type="bookable_after"
                    value={
                      values.bookable_after
                        ? new Date(values.bookable_after).toLocaleDateString()
                        : null
                    }
                    values={values}
                  />
                  <MyInput
                    label="Credit"
                    name="credit"
                    type="credit"
                    value={values.credit}
                    values={values}
                  />
                  <Button onPress={handleSubmit} title="SUBMIT" />
                </Form>
              )}
            </Formik>
          </ScrollView>
        </SafeAreaView>
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
  padding_top_20: {
    paddingTop: 20,
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
    backgroundColor: '#ccc',
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
    backgroundColor: 'white',
    margin: 0,
    padding: 0,
    height: 36,
  },

  inputContainer: {
    padding: 5,
    margin: 0,
  },
});

export default ClassEdit;
