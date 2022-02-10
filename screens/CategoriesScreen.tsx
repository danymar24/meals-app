import { NavigationContainer } from "@react-navigation/native";
import { FunctionComponent, useLayoutEffect, useState } from "react";
import { Button, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
import { CATEGORIES } from "../constants/dummy-data";
import Colors from "../constants/Colors";
import Category from "../models/category";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import FiltersScreen from "./FiltersScreen";
import HeaderButton from "../components/HeaderButton";
import { useSelector } from "react-redux";
import { mealsState } from "../store/meals/model";
import { Meal } from "../models/meal";

interface CategoriesScreenProps {
  navigation: any,
}

const CategoriesScreen: FunctionComponent<CategoriesScreenProps> = ({navigation}: CategoriesScreenProps) => {
  const [modalVisibility, setModalVisibility] = useState(false);

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