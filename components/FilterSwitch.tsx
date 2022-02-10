import { FunctionComponent } from "react";
import { Platform, StyleSheet, Switch, Text, View } from "react-native";
import Colors from '../constants/Colors'

interface FilterSwitchProps {
  label: string;
  state: boolean;
  onChange: any;
}
 
const FilterSwitch: FunctionComponent<FilterSwitchProps> = ({label, state, onChange}: FilterSwitchProps) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{label}</Text>
      <Switch 
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
        value={state}
        onValueChange={onChange.bind(!state)} />
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    width: '100%',
    marginVertical: 5
  }
})
 
export default FilterSwitch;