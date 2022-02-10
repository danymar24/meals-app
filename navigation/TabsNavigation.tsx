import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { FunctionComponent } from "react";
import HomeTab from "../screens/HomeTab";
import { Ionicons } from '@expo/vector-icons';
import { Platform } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import FavoritesTab from "../screens/FavoritesTab";

const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();

interface TabsNavigationProps {
  
}
 
const TabsNavigation: FunctionComponent<TabsNavigationProps> = () => {
  return (
    <Tab.Navigator size={150}
      screenOptions={({route}: {route: RouteProp<any>}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}: {focused: boolean, color: string, size: number}) => {
          let iconName: any = '';

          switch(route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Favorites':
              iconName = focused ? 'heart' : 'heart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color}/>
        }
      })}>
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Favorites" component={FavoritesTab} />
    </Tab.Navigator>
  );
}
 
export default TabsNavigation;