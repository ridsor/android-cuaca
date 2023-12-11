import AsyncStorage from '@react-native-async-storage/async-storage';
import {getLocation} from './Location';

export const getWeather = async () => {
  try {
    let locationKey = await AsyncStorage.getItem('locationKey');
    let currentLocation = await AsyncStorage.getItem('currentLocation');
    if (!locationKey || !currentLocation) {
      const geolocation = await getLocation();
      const location = await fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=2QIol6KLJHG5ceKDkpCGVtVkx9k1Imkk&q=${geolocation?.coords.latitude},${geolocation?.coords.longitude}`,
      ).then(res => res.json());

      await AsyncStorage.setItem('locationKey', location.Key);
      await AsyncStorage.setItem('currentLocation', location.LocalizedName);
      locationKey = await AsyncStorage.getItem('locationKey');
    }

    const dataWeather = await fetch(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=2QIol6KLJHG5ceKDkpCGVtVkx9k1Imkk&language=id-id&details=true`,
    ).then(res => res.json());

    return {
      data: dataWeather.DailyForecasts,
      location: currentLocation,
    };
  } catch (e) {
    console.error(e);
  }
};

export const convertionFahrenheit = (weather: number) => {
  const result = ((weather - 32) * 5) / 9;
  return Math.round(result);
};

export const convertionDate = (date: string) => {
  const result = new Date(date);

  return Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }).format(result);
};
