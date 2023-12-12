import {
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface Props {
  data: ListRenderItemInfo<Location>;
  onSetLocation: (location: Location) => void;
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

export default function SearchItem(props: Props) {
  return (
    <TouchableOpacity onPress={() => props.onSetLocation(props.data.item)}>
      <Text style={[styles.defaultFont, styles.searchValue]}>
        {props.data.item.LocalizedName +
          ', ' +
          props.data.item.AdministrativeArea.LocalizedName +
          ', ' +
          props.data.item.Country.LocalizedName +
          ', ' +
          props.data.item.Region.LocalizedName}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultFont: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter',
  },
  searchValue: {
    paddingVertical: 14,
    backgroundColor: '#fff',
    color: '#8c8989',
    verticalAlign: 'middle',
    paddingHorizontal: 14,
  },
});
