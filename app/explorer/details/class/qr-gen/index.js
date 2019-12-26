import React, {Component} from 'react';
import QRCode from '../../../../common/components/QRCode';
import {StyleSheet, View, TextInput} from 'react-native';

const QRGen = props => {
  // const [starNum, setStarNum] = useState(5);
  // const [loading, setLoading] = useState(true);
  // const [comment, setComment] = useState('');
  // const classinfo = props.navigation.state.params.classinfo;
  // useFocusEffect(
  //     React.useCallback(
  //         React.useCallback(() => {
  //             (async function() {
  //                 const URL =
  //                     'http://127.0.0.1:3000/classinfos/' + classinfo.id + '/feedback';
  //                 let response = await fetch(URL, {
  //                     headers: {
  //                         Authorization: await AsyncStorage.getItem('@token'),
  //                         'Content-Type': 'application/json',
  //                     },
  //                 });
  //                 if (response.status === STATUS.UNPROCESSED_ENTITY) {
  //                     props.navigation.navigate('Login');
  //                 } else {
  //                     let data = await response.json();
  //                     console.log(data);
  //                     setStarNum(data.star_num);
  //                     setComment(data.comment);
  //                     setLoading(false);
  //                 }
  //             })();
  //         }, [classinfo.id, props.navigation]),
  //     ),
  // );
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={text => {}}
          value={'tstate.text'}
        />
        <QRCode
          value={'thtis.state.texdasfdsaf'}
          size={400}
          bgColor="black"
          fgColor="white"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
});

export default QRGen;
