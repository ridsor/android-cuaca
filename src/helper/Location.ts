import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const getCurrentPosition = (): Promise<{
  coords: {latitude: number; longitude: number};
}> => {
  const result = requestLocationPermission();
  return new Promise((resolve, rej) => {
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            resolve(position);
          },
          error => {
            // See error code charts below.
            rej(error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  });
};

export const getCurrentLocation = async () => {
  try {
    let location = await AsyncStorage.getItem('location');
    if (!location) {
      const geolocation = await getCurrentPosition();
      location = await fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=COjK0Fselq4JKAdsESjwsYrWRjygYGuG&q=${geolocation?.coords.latitude},${geolocation?.coords.longitude}`,
      ).then(res => res.json());

      await AsyncStorage.setItem('location', JSON.stringify(location));
      location = await AsyncStorage.getItem('location');
    }
    return JSON.parse(location as string);
  } catch (err) {
    console.error(err);
  }
};

export const searchLocation = async (search: string) => {
  try {
    const location = await fetch(
      `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=COjK0Fselq4JKAdsESjwsYrWRjygYGuG&q=${search}`,
    ).then(res => res.json());

    return location;
  } catch (err) {
    console.error(err);
  }
};

interface Location {
  Key: string;
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
  Region: {
    LocalizedName: string;
  };
  AdministrativeArea: {
    LocalizedName: string;
  };
}

export const setSearchHistoryLocation = async (location: Location) => {
  let historys = JSON.parse(
    ((await AsyncStorage.getItem('history')) as string) || '[]',
  );

  if (!historys.some((x: Location) => x.Key === location.Key)) {
    if (historys.length > 7) {
      historys.pop();
    }
    historys.unshift(location);
  }

  await AsyncStorage.setItem('history', JSON.stringify(historys));
};
