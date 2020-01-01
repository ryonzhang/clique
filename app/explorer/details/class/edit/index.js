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
import axiosService from '../../../../common/clients/api';
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
  // email: Yup.string()
  //   .required('please! email?')
  //   .email("well that's not an email"),
  // first_name: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  // last_name: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  // username: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
});

const validate = (values, props /* only available when using withFormik */) => {
  const errors = {};
  try {
    // console.log(values.birthday && values.birthday > Date.now());
    // if (values.birthday && values.birthday > Date.now()) {
    //   errors.birthday = 'You should be borned';
    // }
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
  const [classInfo, setClass] = useState(
    props.navigation.getParam('classInfo') || {},
  );
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
          <ScrollView>
            <Formik
              initialValues={classInfo}
              validate={validate}
              onSubmit={values => {
                (async function() {
                  values.institution_id = props.navigation.getParam('institution_id');
                  let response = classInfo.id
                    ? await axiosService.post(
                        '/classinfos/update/' + classInfo.id,
                        values,
                      )
                    : await axiosService.post('/classinfos/', values);
                  if (
                    response.status === STATUS.ACCEPTED ||
                    response.status === STATUS.CREATED
                  ) {
                    setClass(values);
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
                    label="Start Datetime"
                    name="time"
                    type="time"
                    value={
                      values.time
                        ? new Date(values.time).toLocaleString()
                        : null
                    }
                    values={values}
                  />
                  <FocusedDatePicker
                    label="End Datetime"
                    name="endtime"
                    type="endtime"
                    value={
                      values.endtime
                        ? new Date(values.endtime).toLocaleString()
                        : null
                    }
                    values={values}
                  />
                  <MyInput
                      label="Duration in mins"
                      name="duration_in_min"
                      type="duration_in_min"
                      value={values.duration_in_min}
                      onChange={handleChange}
                  />
                  <MyInput
                    label="Frequency in days"
                    name="days_in_between"
                    type="days_in_between"
                    value={values.days_in_between}
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
