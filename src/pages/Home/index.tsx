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
import {icon_location, icon_weather} from '../../assets';
import WeatherItem from '../../components/Home/WeatherItem';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as React from 'react';
import {
  convertionDate,
  convertionFahrenheit,
  getWeather,
} from '../../helper/Weather';

const widthScreen = Dimensions.get('screen').width;

interface Props {
  navigation: NativeStackNavigationProp<{Search: undefined}>;
  route: any;
}

interface Weather {
  Temperature: {
    Minimum: {
      Value: number;
    };
    Maximum: {
      Value: number;
    };
  };
  Date: string;
  Day: {
    ShortPhrase: string;
    Wind: {
      Speed: {
        Value: number;
        Unit: string;
      };
    };
  };
}

export default function Home({navigation, route}: Props) {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [location, setLocation] = React.useState<string>('');
  const [weather, setWeather] = React.useState<Weather[]>([]);

  const separator = () => {
    return <View style={styles.mx7} />;
  };

  React.useEffect(() => {
    if (!route.params) {
      getWeather().then(res => {
        setLocation(res?.location as string);
        setWeather(res?.data);
        setLoading(false);
      });
    } else {
      setWeather(route.params);
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
          <Text style={styles.defaultFont}>
            {convertionDate(weather[0].Date)}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Search')}>
            <View style={styles.wrapperLocation}>
              <Image source={icon_location} style={styles.location} />
              <Text style={[styles.defaultFont, styles.fontLocation]}>
                {location}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.weatherWrapper1}>
            <Text style={[styles.defaultFont, styles.temp]}>
              {convertionFahrenheit(weather[0].Temperature.Minimum.Value)}
              °C / {convertionFahrenheit(weather[0].Temperature.Maximum.Value)}
              °C
            </Text>
            <View style={styles.weatherWrapper2}>
              <Image source={icon_weather} style={styles.weather} />
              <View style={styles.informationWrapper}>
                <View>
                  <Text style={[styles.defaultFont, styles.informationLabel]}>
                    Angin
                  </Text>
                  <Text style={[styles.defaultFont, styles.informationValue]}>
                    {weather[0].Day.Wind.Speed.Value +
                      ' ' +
                      weather[0].Day.Wind.Speed.Unit}
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
            data={weather.filter((x, i) => i !== 0)}
            horizontal
            showsHorizontalScrollIndicator={true}
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
    fontSize: 44,
    marginBottom: 16,
  },
  weather: {
    width: 190,
    height: 170,
    objectFit: 'cover',
  },
  weatherWrapper1: {
    marginBottom: 50,
  },
  weatherWrapper2: {
    flexDirection: 'row',
    columnGap: widthScreen >= 300 ? 15 : 10,
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
