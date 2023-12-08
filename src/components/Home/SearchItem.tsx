import {
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface Props {
  data: ListRenderItemInfo<{id: string; location: string}>;
  onSetLocation: (id: string) => void;
}

export default function SearchItem(props: Props) {
  return (
    <TouchableOpacity onPress={() => props.onSetLocation(props.data.item.id)}>
      <Text style={[styles.defaultFont, styles.searchValue]}>
        {props.data.item.location}
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
