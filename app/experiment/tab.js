import React from 'react';
import {Animated, View, StatusBar, StyleSheet, Text} from 'react-native';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={[styles.container, {backgroundColor: '#ff4081'}]}>
    <Text>zzaaaaaaaaa</Text>
  </View>
);
const SecondRoute = () => (
  <View style={[styles.container, {backgroundColor: '#673ab7'}]} />
);

export default class TabViewExample extends React.Component {
  static title = 'Custom indicator';
  static backgroundColor = '#263238';
  static appbarElevation = 4;
  state = {
    index: 0,
    routes: [
      {key: '1', title: 'First', icon: 'ios-paper'},
      {icon: 'ios-paper', key: '2', title: 'Second'},
      {icon: 'ios-paper', key: '3', title: 'Second'},
    ],
  };

  _handleIndexChange = index => {
    this.setState({index});
  };

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = SceneMap({
    '1': FirstRoute,
    '2': SecondRoute,
    '3': SecondRoute,
  });
  //
  _renderIndicator = props => {
    const {width, position} = props;
    const inputRange = [
      0,
      0.48,
      0.49,
      0.51,
      0.52,
      1,
      1.48,
      1.49,
      1.51,
      1.52,
      2,
    ];
    const scale = position.interpolate({
      inputRange,
      outputRange: inputRange.map(x => (Math.trunc(x) === x ? 2 : 0.1)),
    });
    const opacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map(x => {
        const d = x - Math.trunc(x);
        return d === 0.49 || d === 0.51 ? 0 : 1;
      }),
    });
    const translateX = position.interpolate({
      inputRange: inputRange,
      outputRange: inputRange.map(x => Math.round(x) * width),
    });
    const backgroundColor = position.interpolate({
      inputRange,
      outputRange: inputRange.map(
        x => props.navigationState.routes[Math.round(x)].color,
      ),
    });
    return (
      <Animated.View
        style={[styles.container, {width, transform: [{translateX}]}]}>
        <Animated.View
          style={[
            styles.indicator,
            {backgroundColor, opacity, transform: [{scale}]},
          ]}
        />
      </Animated.View>
    );
  };
  //

  _renderBadge = ({route}) => {
    if (route.key === '2') {
      return (
        <View style={styles.badge}>
          <Text style={styles.count}>42</Text>
        </View>
      );
    }
    return null;
  };
  ////
  _renderFooter = props => (
    <TabBar
      {...props}
      renderBadge={this._renderBadge}
      // renderIndicator={this._renderIndicator}
      style={styles.tabbar}
    />
  );
  render() {
    return (
      <>
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderFooter={this._renderFooter}
          onRequestChangeTab={this._handleIndexChange}
          useNativeDriver
        />
        <StatusBar barStyle="light-content" />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#369',
    overflow: 'hidden',
  },
  icon: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  indicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0084ff',
    margin: 6,
  },
  badge: {
    marginTop: 4,
    marginRight: 32,
    backgroundColor: '#f44336',
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  count: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -2,
  },
});
