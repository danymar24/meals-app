import { FunctionComponent, useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
import { CATEGORIES } from "../constants/dummy-data";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import FiltersScreen from "./FiltersScreen";
import HeaderButton from "../components/HeaderButton";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_MEALS } from "../graphql/queries/GetMeals";
import { setFilteredMeals, setMeals } from "../store/meals/actions";

interface CategoriesScreenProps {
  navigation: any,
}

const CategoriesScreen: FunctionComponent<CategoriesScreenProps> = ({navigation}: CategoriesScreenProps) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const { loading: loadingMeals, error: errorMeals, data: mealsResponse } = useQuery(GET_MEALS);
  const meals = mealsResponse && mealsResponse.meals;
  const dispatch = useDispatch();

  const openFilterModalHandler = () => {
    setModalVisibility(!modalVisibility);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Filters" 
            iconName='filter-list' 
            onPress={openFilterModalHandler}/>
        </HeaderButtons>
      )
    });
  }, [navigation]);

  const onSelectHandler = (id: string) => {
    navigation.navigate('Category', { id });
  }

  const renderGridItem = (itemData: any) => {
    return <CategoryGridTile onSelect={onSelectHandler} category={itemData.item}/>
  }

  useEffect(() => {
    dispatch(setMeals(meals));
    dispatch(setFilteredMeals(meals));
  }, [dispatch, meals])

  return (
    <View>
      <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2}/>
      <FiltersScreen modalVisible={modalVisibility} onClose={openFilterModalHandler}/>
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
 
export default CategoriesScreen;