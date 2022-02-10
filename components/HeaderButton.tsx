import { FunctionComponent } from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../constants/Colors";
import { Platform } from "react-native";

interface HeaderButtonProps {
  
}
 
const CustomHeaderButton: FunctionComponent<any> = (props) => {
  return (
    <HeaderButton 
      {...props} 
      IconComponent={MaterialIcons} 
      iconSize={23} 
      color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}/>
  );
}
 
export default CustomHeaderButton;