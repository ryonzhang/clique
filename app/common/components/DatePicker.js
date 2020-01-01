import React, {useState, useRef} from 'react';
import DisableKeyboard from 'react-native-formik/src/withPickerValues/DisableKeyboard';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {FilledTextField} from 'react-native-material-textfield';

const DatePicker = props => {
  const [pickerOpened, setPickerOpened] = useState(false);

  const refDate = useRef(null);

  const openPicker = () => {
    setPickerOpened(true);
  };

  const closePicker = () => {
    setPickerOpened(false);
    props.setFieldTouched();
  };

  const handleDatePicked = value => {
    closePicker();
    console.log(props);
    if (props.type.endsWith('time')) {
      refDate.current.setValue(value.toLocaleString());
    } else {
      refDate.current.setValue(value.toLocaleDateString());
    }

    if (props.values && props.name) {
      props.values[props.name] = value;
    }
    if (props.onSubmitEditing) {
      props.onSubmitEditing();
    }
  };

  return (
    <React.Fragment>
      <DisableKeyboard onPress={openPicker}>
        <FilledTextField {...props} ref={refDate} />
      </DisableKeyboard>

      <DateTimePicker
        isVisible={pickerOpened}
        onConfirm={handleDatePicked}
        onCancel={closePicker}
        {...props}
        mode={'datetime'}
      />
    </React.Fragment>
  );
};

export default DatePicker;
