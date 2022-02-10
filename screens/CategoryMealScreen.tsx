import { NavigationProp, RouteProp } from "@react-navigation/native";
import { FunctionComponent, useLayoutEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MealItem from "../components/MealItem";
import { CATEGORIES } from "../constants/dummy-data";
import Category from "../models/category";
import { Meal } from "../models/meal";
import { mealsState } from "../store/meals/model";

interface CategoryMealScreenProps {
  navigation: NavigationProp<any>,
  route: RouteProp<any>,
}
 
const CategoryMealScreen: FunctionComponent<CategoryMealScreenProps> = ({navigation, route}: CategoryMealScreenProps) => {
  const categoryId = route.params?.id;
  const selectedCategory = CATEGORIES.find((category: Category) => category.id === categoryId);

  const meals = useSelector((state: any) => state.meals.filteredMeals);

  const availableMeals = useSelector(({meals}: {meals: mealsState}) => meals.filteredMeals);
  const displayedMeals = availableMeals.filter((meal: Meal) => meal.categoryIds.indexOf(categoryId) >= 0);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedCategory?.title,
    });
  }, [navigation]);

  const onSelectMealHandler = (id: string) => {
    navigation.navigate('Meal', { id });
  }

  if(displayedMeals.length === 0) {
    return <View style={styles.screen}>
      <Text>No meals found, please check the filters</Text>
    </View>
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
      <FlatList data={displayedMeals} renderItem={renderMealItem}/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center'
  }
});
 
export default CategoryMealScreen;