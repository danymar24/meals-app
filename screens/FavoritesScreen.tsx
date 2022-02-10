import { NavigationProp, RouteProp } from "@react-navigation/native";
import { FunctionComponent, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import MealItem from "../components/MealItem";
import { CATEGORIES } from "../constants/dummy-data";
import Category from "../models/category";
import { Meal } from "../models/meal";
import { mealsState } from "../store/meals/model";

interface FavoritesScreenProps {
  route: RouteProp<any>;
  navigation: NavigationProp<any>;
}
 
const FavoritesScreen: FunctionComponent<FavoritesScreenProps> = ({route, navigation}: {route: RouteProp<any>, navigation: NavigationProp<any>}) => {
  const meals = useSelector(({meals}: {meals: mealsState}) => meals.favoriteMeals);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Favorites',
    });
  }, [navigation]);

  if (meals.length === 0 || !meals) {
    return (
      <View style={styles.screen}>
        <Text>No favorite meals found. Start adding some!</Text>
      </View>
    )
  }

  const onSelectMealHandler = (id: string) => {
    navigation.navigate('Meal', { id });
  }

  const renderMealItem = ({item}: {item: Meal}) => {
    const {
      id,
      title,
      duration,
      complexity,
      affordability,
      imageUrl
    } = item;
    return (
      <MealItem
        key={id}
        id={id}
        title={title}
        duration={duration}
        complexity={complexity}
        affordability={affordability}
        imageUrl={imageUrl}
        onSelectMeal={onSelectMealHandler}
        />
    )
  };

  return (
    <View style={styles.screen}>
      <FlatList data={meals} renderItem={renderMealItem}/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center'
  },
});
 
export default FavoritesScreen;