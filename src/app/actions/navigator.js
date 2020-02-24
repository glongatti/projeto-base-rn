import React from 'react';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createReduxContainer, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import Home from '../../App';
import Home2 from '../../App2';
import Splash from '../../containers/splash';

export const ACTION_OPEN_SPLASH = {
  action: 'ACTION_OPEN_SPLASH',
  routeName: 'Splash'
};
export const ACTION_OPEN_LOGIN_FLOW = {
  action: 'ACTION_OPEN_LOGIN_FLOW',
  routeName: 'NavigatorScreen'
};

const NavigationMiddleware = createReactNavigationReduxMiddleware(state => state.navigation);


const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: () => <Icon name="rocket" size={30} color="#900" />,
        header: null,
        gesturesEnabled: false
      }
    },
    Home2: {
      screen: Home2,
      navigationOptions: {
        tabBarIcon: () => <Icon name="rocket" size={30} color="blue" />,
        header: null,
        gesturesEnabled: false
      }
    },
  },
  {
    initialRouteName: 'Home',
    barStyle: { backgroundColor: '#FFFFFF' },
    labeled: false,
    swipeEnabled: true,
    animationEnabled: true,
    shifting: true
  }
);

const RootNavigator = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  NavigatorScreen: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
});

const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.navigation
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, NavigationMiddleware };
