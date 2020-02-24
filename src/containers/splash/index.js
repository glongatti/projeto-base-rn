import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import styles from './style';

import * as UserActions from '../../app/actions/user';

class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.onInitialFlowVerification();
    }, 2000);
  }

  render() {
    return (
      <View style={styles.background}>
        <LinearGradient
          colors={['#ece4f3', '#e1d3eb']}
          style={styles.logoContainer}
        >
          <Image
            style={styles.logo}
            source={require('../../assets/images/img_splash.gif')}
          />
        </LinearGradient>

        <Image
          style={{ width: '100%', marginTop: -80 }}
          resizeMode="contain"
          source={require('../../assets/images/img_splash_top_design.png')}
        />
        <Text>Splash Screen</Text>
        <Text>Loading...</Text>
        <View style={{ flex: 1 }} />

        <Image
          style={{ marginBottom: 50 }}
          resizeMode="contain"
          source={require('../../assets/images/img_background_bubbles_shape_white.png')}
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialFlowVerification: () => dispatch(UserActions.verifyInitialFlow()),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(SplashScreen);
