import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  logoContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    resizeMode: 'contain',
    width: 150,
    height: 150,
  },
});

export default styles;
