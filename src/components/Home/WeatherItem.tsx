import {Image, ListRenderItemInfo, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {weather} from '../../assets';

interface Props {
  data: ListRenderItemInfo<{id: string; when: string}>;
}

export default function WeatherItem(props: Props) {
  return (
    <View style={styles.background}>
      <View style={styles.infoWrapper1}>
        <Image source={weather} style={styles.icon} />
        <View>
          <Text
            style={[styles.defaultFont, styles.informationLabel, styles.mb4]}>
            {props.data.item.when}
          </Text>
          <Text style={[styles.defaultFont, styles.informationLabel]}>
            Berawan
          </Text>
        </View>
      </View>
      <View style={styles.infoWrapper2}>
        <View>
          <Text style={[styles.defaultFont, styles.informationLabel]}>
            Angin
          </Text>
          <Text style={[styles.defaultFont, styles.infoValue]}>365</Text>
        </View>
        <View>
          <Text style={[styles.defaultFont, styles.informationLabel]}>
            Suhu
          </Text>
          <Text style={[styles.defaultFont, styles.infoValue]}>18°C</Text>
        </View>
        <View>
          <Text style={[styles.defaultFont, styles.informationLabel]}>
            Kelembapan
          </Text>
          <Text style={[styles.defaultFont, styles.infoValue]}>365</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
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
  mb4: {
    marginBottom: 4,
  },
  infoWrapper1: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 18,
  },
  infoWrapper2: {
    flexDirection: 'row',
    gap: 11,
  },
  infoValue: {
    fontWeight: '600',
    fontSize: 16,
  },
});
