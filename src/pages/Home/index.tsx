import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {location, weather} from '../../assets';
import WeatherItem from '../../components/Home/WeatherItem';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const widthScreen = Dimensions.get('screen').width;

interface Props {
  navigation: NativeStackNavigationProp<{Search: undefined}>;
  route: any;
}

type HomeParam = {
  id: string;
  today: string;
  location: string;
  temp: number;
  wind: number;
  humidity: number;
  yesterday: {
    id: string;
    temp: number;
    wind: number;
    humidity: number;
  };
  tomorrow: {
    id: string;
    temp: number;
    wind: number;
    humidity: number;
  };
};

export default function Home({navigation, route}: Props) {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [dataWeather, setDataWeather] = React.useState<HomeParam | undefined>();

  const separator = () => {
    return <View style={styles.mx7} />;
  };

  React.useEffect(() => {
    async function getWeather() {
      try {
        let result = await AsyncStorage.getItem('weather');
        if (!result) {
          const value = {
            id: '1',
            today: '',
            location: 'Wayame',
            temp: 1,
            wind: 1,
            humidity: 1,
            yesterday: {
              id: '2',
              temp: 1,
              wind: 1,
              humidity: 1,
            },
            tomorrow: {
              id: '3',
              temp: 1,
              wind: 1,
              humidity: 1,
            },
          };
          await AsyncStorage.setItem('weather', JSON.stringify(value));
          result = await AsyncStorage.getItem('weather');
        }
        return JSON.parse(result as string);
      } catch (e) {
        console.error(e);
      }
    }

    if (!route.params) {
      getWeather().then(res => {
        setDataWeather(res);
        setLoading(false);
      });
    } else {
      setDataWeather(route.params);
    }
  }, [route.params]);

  return (
    <LinearGradient colors={['#646EE9', '#704BF1']} style={styles.body}>
      {isLoading ? (
        <View style={[styles.container, styles.allCenter]}>
          <ActivityIndicator size={'large'} color={'#fff'} />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <Text style={styles.defaultFont}>Today, 3 May 2023</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Search')}>
            <View style={styles.wrapperLocation}>
              <Image source={location} style={styles.location} />
              <Text style={[styles.defaultFont, styles.fontLocation]}>
                {dataWeather?.location}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.weatherWrapper1}>
            <Text style={[styles.defaultFont, styles.temp]}>18°C</Text>
            <View style={styles.weatherWrapper2}>
              <Image source={weather} style={styles.weather} />
              <View style={styles.informationWrapper}>
                <View>
                  <Text style={[styles.defaultFont, styles.informationLabel]}>
                    Angin
                  </Text>
                  <Text style={[styles.defaultFont, styles.informationValue]}>
                    342
                  </Text>
                </View>
                <View>
                  <Text style={[styles.defaultFont, styles.informationLabel]}>
                    Kelembapan
                  </Text>
                  <Text style={[styles.defaultFont, styles.informationValue]}>
                    25%
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <FlatList
            ItemSeparatorComponent={separator}
            data={[
              {id: '1', when: 'kemarin'},
              {id: '2', when: 'hari ini'},
              {id: '3', when: 'besok'},
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={data => <WeatherItem data={data} />}
          />
        </ScrollView>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 30,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  allCenter: {alignItems: 'center', justifyContent: 'center'},
  defaultFont: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter',
  },
  fontLocation: {color: '#4a4a4a', fontWeight: '500'},
  wrapperLocation: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#c4c4c4',
    height: 43,
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: 38,
  },
  location: {
    width: '100%',
    maxWidth: 24,
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    marginHorizontal: 14,
    display: 'flex',
  },
  temp: {
    fontWeight: '700',
    fontSize: 64,
  },
  weather: {
    width: 190,
    height: 170,
    objectFit: 'cover',
  },
  weatherWrapper1: {
    paddingHorizontal: 15,
    marginBottom: 50,
  },
  weatherWrapper2: {
    flexDirection: 'row',
    columnGap: widthScreen >= 300 ? 30 : 15,
  },
  informationLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  informationValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  informationWrapper: {
    rowGap: 40,
  },
  mx7: {
    marginHorizontal: 7,
  },
});
