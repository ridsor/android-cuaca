import {Image, ListRenderItemInfo, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {weather} from '../../assets';

interface Props {
  data: ListRenderItemInfo<{id: string; when: string}>;
}

export default function WeatherItem(props: Props) {
  return (
    <View style={styles.background}>
      <View style={styles.timeWrapper}>
        <Image source={weather} style={styles.icon} />
        <View>
          <Text style={[styles.defaultFont, styles.informationLabel]}>
            {props.data.item.when}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: 180,
    backgroundColor: '#6530BC',
    flexShrink: 0,
    padding: 16,
    borderRadius: 8,
  },
  icon: {
    width: 58,
    height: 47,
    objectFit: 'cover',
  },
  defaultFont: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter',
  },
  informationLabel: {
    fontWeight: '600',
  },
  timeWrapper: {
    flexDirection: 'row',
    gap: 14,
  },
});
