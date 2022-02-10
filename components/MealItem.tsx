import { FunctionComponent } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Meal } from "../models/meal";

interface MealItemProps {
  id: string;
  title: string;
  duration: number;
  complexity: string;
  affordability: string;
  imageUrl: string;
  onSelectMeal: (id: string) => void;
}
 
const MealItem: FunctionComponent<MealItemProps> = (props: MealItemProps) => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity 
        onPress={() => props.onSelectMeal(props.id)}>
        <View style={{...styles.mealRow, ...styles.mealHeader}}>
          <ImageBackground source={{uri: props.imageUrl}} style={styles.bgImage}>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{...styles.mealRow, ...styles.mealDetails}}>
          <Text>{props.duration}m</Text>
          <Text>{props.complexity.toUpperCase()}</Text>
          <Text>{props.affordability.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 5
  },
  mealRow: {
    flexDirection: 'row'
  },
  mealHeader: {
    height: '85%'
  },
  mealDetails: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: 'center',
    height: '15%'
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  titleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 20,
    fontFamily: 'open-sans-bold',
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 12,
    textAlign: 'center'
  }
});
 
export default MealItem;