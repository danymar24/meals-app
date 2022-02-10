import { FunctionComponent } from "react";
import { Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import Category from "../models/category";

interface CategoryGridTileProps {
  category: Category,
  onSelect: (id: string) => void
}
 
const CategoryGridTile: FunctionComponent<CategoryGridTileProps> = ({category, onSelect}: CategoryGridTileProps) => {
  const {id, title, color} = category;

  let TouchableComponent: any = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.gridItem}>
      <TouchableComponent 
        onPress={() => onSelect(id)}>
        <View style={{...styles.listItem, backgroundColor: color}}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
        </View>
      </TouchableComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible'
  },
  listItem: {
    margin: 15,
    height: 150,
    borderRadius: 5,
    elevation: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 15
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
    textAlign: 'right'
  }
})
 
export default CategoryGridTile;