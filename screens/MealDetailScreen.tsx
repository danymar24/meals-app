import { NavigationProp, RouteProp } from "@react-navigation/native";
import { FunctionComponent, useCallback, useLayoutEffect } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Meal } from "../models/meal";
import HeaderButton from '../components/HeaderButton';
import { useMutation, useQuery } from "@apollo/client";
import { GET_MEAL } from "../graphql/queries/GetMeal";
import { GET_FAVORITE_MEALS } from "../graphql/queries/GetFavoriteMeals";
import { TOGGLE_FAVORITE } from "../graphql/mutations/ToggleFavorite";

interface MealDetailScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}
 
const MealDetailScreen: FunctionComponent<MealDetailScreenProps> = ({navigation, route}: MealDetailScreenProps) => {
  const mealId = route.params?.id;
  const { loading: loadingMeal, error: errorMeal, data: mealResponse } = useQuery(GET_MEAL, {
    variables: {id: mealId}
  });
  const { loading: loadingFavorites, error: errorFavorites, data: favoritesResponse } = useQuery(GET_FAVORITE_MEALS);
  const [toggleFavorite, {loading: toggleFavoriteLoading, error: toggleFavoriteError, data: toggleFavoriteResponse}] = useMutation(TOGGLE_FAVORITE, {
    variables: {id: mealId},
    refetchQueries: [
      GET_FAVORITE_MEALS
    ]
  });

  const selectedMeal = mealResponse && mealResponse.meal;
  const favoriteMeals = favoritesResponse && favoritesResponse.favoriteMeals;
  const favoritedMeal = favoriteMeals && favoriteMeals.some((meal: Meal) => meal.id === mealId);

  const toggleFavoriteHandler = useCallback(() => {
    toggleFavorite();
  }, [mealId, toggleFavorite]);

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

  if(loadingMeal || toggleFavoriteLoading || loadingFavorites) {
    return (
      <ActivityIndicator style={styles.screen} size="large" />
    )
  }
  
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