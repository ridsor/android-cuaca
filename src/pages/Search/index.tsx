import {FlatList, StyleSheet, TextInput, View} from 'react-native';
import React, {useCallback} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SearchItem from '../../components/Home/SearchItem';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Props {
  navigation: NativeStackNavigationProp<{Home: HomeParam}>;
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

export default function Search(props: Props) {
  const handleSetLocation = useCallback(
    (id: string) => {
      props.navigation.navigate('Home', {
        id: '',
        today: '',
        location: 'Ambon',
        temp: 0,
        wind: 0,
        humidity: 0,
        yesterday: {
          id: '',
          temp: 0,
          wind: 0,
          humidity: 0,
        },
        tomorrow: {
          id: '',
          temp: 0,
          wind: 0,
          humidity: 0,
        },
      });
    },
    [props.navigation],
  );

  return (
    <LinearGradient colors={['#646EE9', '#704BF1']} style={styles.body}>
      <View style={styles.container}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor={'#c4c4c4'}
          autoFocus
          style={[styles.defaultFont, styles.searchInput]}
        />
        <View style={styles.searchWrapper}>
          <FlatList
            data={[
              {id: '1', location: 'kemarin'},
              {id: '1', location: 'kemarin'},
              {id: '1', location: 'kemarin'},
              {id: '1', location: 'kemarin'},
            ]}
            keyExtractor={item => item.id}
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
