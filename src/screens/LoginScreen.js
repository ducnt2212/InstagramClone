import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import LoginForm from '../components/loginScreen/LoginForm';

function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={{width: 100, height: 100}}
          source={{uri: INSTAGRAM_LOGO}}
        />
      </View>
      <LoginForm navigation={navigation} />
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 12,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
});

const INSTAGRAM_LOGO =
  'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-256.png';
