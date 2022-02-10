import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FunctionComponent } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import FavoritesScreen from "./FavoritesScreen";
import MealDetailScreen from "./MealDetailScreen";

interface FavoritesTabProps {
  
}

const FavoritesStack = createNativeStackNavigator();
 
const FavoritesTab: FunctionComponent<FavoritesTabProps> = (props: FavoritesTabProps) => {
  return (
    <FavoritesStack.Navigator 
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
      <FavoritesStack.Screen name="Favs" component={FavoritesScreen}/>
      <FavoritesStack.Screen name="Meal" component={MealDetailScreen} />
    </FavoritesStack.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center'
  }
});
 
export default FavoritesTab;