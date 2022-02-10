import { FunctionComponent, useCallback, useState } from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import FilterSwitch from "../components/FilterSwitch";
import { setFilters } from "../store/meals/actions";

interface FiltersScreenProps {
  modalVisible: boolean;
  onClose: () => void;
}
 
const FiltersScreen: FunctionComponent<FiltersScreenProps> = ({modalVisible, onClose}: FiltersScreenProps) => {
  const [isGlutenFree, setIsGlutenFree] = useState<boolean>(false);
  const [isLactoseFree, setIsLactoseFree] = useState<boolean>(false);
  const [isVegan, setIsVegan] = useState<boolean>(false);
  const [isVegetarian, setIsVegetarian] = useState<boolean>(false);
  const dispatch = useDispatch();

  const saveFiltersHandler = useCallback(() => {
    const appliedFilters = {
      isGlutenFree,
      isLactoseFree,
      isVegan,
      isVegetarian
    }
    dispatch(setFilters(appliedFilters));
    onClose();
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}>
      <View style={styles.screen}>
        <View style={styles.modalView}>
          <FilterSwitch label="Is Gluten Free" state={isGlutenFree} onChange={setIsGlutenFree}/>
          <FilterSwitch label="Is Lactose Free" state={isLactoseFree} onChange={setIsLactoseFree} />
          <FilterSwitch label="Is Vegan" state={isVegan} onChange={setIsVegan} />
          <FilterSwitch label="Is Vegetarian" state={isVegetarian} onChange={setIsVegetarian} />
          <View style={styles.buttons}>
            <Button title="Cancel" onPress={onClose}/>
            <Button title="Save" onPress={saveFiltersHandler}/>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttons: {
    flexDirection: 'row'
  }
});
 
export default FiltersScreen;