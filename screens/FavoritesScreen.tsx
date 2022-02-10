import { useQuery } from "@apollo/client";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { FunctionComponent, useLayoutEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import MealItem from "../components/MealItem";
import { GET_FAVORITE_MEALS } from "../graphql/queries/GetFavoriteMeals";
import { Meal } from "../models/meal";

interface FavoritesScreenProps {
  route: RouteProp<any>;
  navigation: NavigationProp<any>;
}
 
const FavoritesScreen: FunctionComponent<FavoritesScreenProps> = ({route, navigation}: {route: RouteProp<any>, navigation: NavigationProp<any>}) => {
  const { loading, error, data } = useQuery(GET_FAVORITE_MEALS);
  const favoriteMeals = data && data.favoriteMeals;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Favorites',
    });
  }, [navigation]);

  if(loading) {
    return (
      <ActivityIndicator style={styles.screen} size="large" />
    )
  }

  if (favoriteMeals.length === 0 || !favoriteMeals) {
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
      <FlatList data={favoriteMeals} renderItem={renderMealItem}/>
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