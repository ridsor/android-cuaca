import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import icon_location from '../../assets/image/icon/location.png';

export default function index() {
  return (
    <LinearGradient colors={['#646EE9', '#704BF1']} style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.defaultFont}>Today, 3 May 2023</Text>
        <TouchableWithoutFeedback style={styles.location}>
          <Image source={icon_location} />
        </TouchableWithoutFeedback>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 30,
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  defaultFont: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter',
  },
  location: {
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#c4c4c4',
    height: 34,
    width: '100%',
    flex: 1,
  },
});
