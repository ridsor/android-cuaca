import {FlatList, StyleSheet, TextInput, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SearchItem from '../../components/Home/SearchItem';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {searchLocation, setSearchHistoryLocation} from '../../helper/Location';
import {getWeather} from '../../helper/Weather';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: NativeStackNavigationProp<{
    Home: {weather: Weather; location: Location};
  }>;
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
    SolarIrradiance: {
      Value: number;
      Unit: string;
    };
  };
}

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

export default function Search(props: Props) {
  const [searchResult, setSearchResult] = useState<Location[]>([]);
  const [delaySearch, setDelaySearch] = useState<NodeJS.Timeout>();
  const [search, setSearch] = useState<string>('');

  const handleSetLocation = useCallback(
    async (location: Location) => {
      const weather = await getWeather(location.Key);
      setSearchHistoryLocation(location);

      props.navigation.navigate('Home', {
        weather,
        location: location,
      });
    },
    [props.navigation],
  );

  const handeSearch = useCallback(
    (value: string) => {
      if (value) {
        if (value.length >= 3) {
          clearTimeout(delaySearch);

          setDelaySearch(
            setTimeout(() => {
              searchLocation(value).then(result => setSearchResult(result));
            }, 500),
          );
        }
      }
    },
    [delaySearch],
  );

  useEffect(() => {
    if (search.length < 1) {
      AsyncStorage.getItem('history', (err, result) => {
        if (err) {
          console.error(err);
        }

        setSearchResult(JSON.parse(result as string) || []);
      });
    }
  }, [search]);

  return (
    <LinearGradient colors={['#646EE9', '#704BF1']} style={styles.body}>
      <View style={styles.container}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor={'#c4c4c4'}
          autoFocus
          style={[styles.defaultFont, styles.searchInput]}
          onChangeText={text => {
            handeSearch(text);
            setSearch(text);
          }}
        />
        <View style={styles.searchWrapper}>
          <FlatList
            data={searchResult}
            renderItem={data => (
              <SearchItem data={data} onSetLocation={handleSetLocation} />
            )}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 65,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  defaultFont: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter',
  },
  searchInput: {
    height: 43,
    backgroundColor: '#fff',
    borderRadius: 8,
    color: '#4a4a4a',
    paddingHorizontal: 14,
    marginBottom: 6,
  },
  searchWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});
