import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Search} from '../pages';

type RootStackParamList = {
  Home?: {
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
  Search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
