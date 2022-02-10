import { NavigationProp, RouteProp } from "@react-navigation/native";
import { FunctionComponent, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MEALS } from "../constants/dummy-data";
import { Meal } from "../models/meal";
import HeaderButton from '../components/HeaderButton';
import { useDispatch, useSelector } from "react-redux";
import { mealsState } from "../store/meals/model";
import { toggleFavorite } from "../store/meals/actions";

interface MealDetailScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}
 
const MealDetailScreen: FunctionComponent<MealDetailScreenProps> = ({navigation, route}: MealDetailScreenProps) => {
  const mealId = route.params?.id;
  const meals = useSelector(({meals}: {meals: mealsState}) => meals.meals);
  const selectedMeal = meals.find((meal: Meal) => meal.id === mealId);
  const favoritedMeal = useSelector(({meals}: {meals: mealsState}) => meals.favoriteMeals.some((meal: Meal) => meal.id === mealId));
  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedMeal?.title,

      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item 
            title="Favorite" 
            iconName={favoritedMeal ? "star" : 'star-outline'} 
            onPress={toggleFavoriteHandler}/>
        </HeaderButtons>
      )
    });
  }, [navigation, toggleFavoriteHandler, favoritedMeal]);

  const renderListItem = (item: string) => (
    <View style={styles.listItem} key={Math.random()}>
      <Text>{item}</Text>
    </View>
  )
  
  return (
    <ScrollView>
        <Image 
          source={{uri: selectedMeal?.imageUrl}}
          style={styles.image}/>
        <View style={styles.mealDetails}>
          <Text>{selectedMeal?.duration}</Text>
          <Text>{selectedMeal?.complexity.toUpperCase()}</Text>
          <Text>{selectedMeal?.affordability.toUpperCase()}</Text>
        </View>
        <Text style={styles.title}>Ingredients</Text>
        <View>
          {selectedMeal?.ingredients.map(renderListItem)}
        </View>
        <Text style={styles.title}>Steps</Text>
        <View>
          {selectedMeal?.steps.map(renderListItem)}
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200 
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center'
  },
  mealDetails: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'open-sans-bold',
    // color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 12,
    textAlign: 'center'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white'
  }

});
 
export default MealDetailScreen;