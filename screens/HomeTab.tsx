import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FunctionComponent } from "react";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
import CategoriesScreen from "./CategoriesScreen";
import CategoryMealScreen from "./CategoryMealScreen";
import FavoritesScreen from "./FavoritesTab";
import FiltersScreen from "./FiltersScreen";
import MealDetailScreen from "./MealDetailScreen";

interface HomeTabProps {
  
}
 

const Stack = createNativeStackNavigator();

const HomeTab: FunctionComponent<HomeTabProps> = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Categories"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : 'black',
        headerTitleStyle: {
          fontFamily: 'open-sans-bold'
        }
      }}>
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Category" component={CategoryMealScreen} />
      <Stack.Screen name="Filters" component={FiltersScreen} />
      <Stack.Screen name="Meal" component={MealDetailScreen} />
    </Stack.Navigator>
  );
}
 
export default HomeTab;