import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabsNavigation from './navigation/TabsNavigation';
import { combineReducers, createStore } from 'redux';
import {mealsReducer} from './store/meals/reducer';
import { Provider } from 'react-redux';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
};

const rootReducer = combineReducers({
  meals: mealsReducer
});

const store = createStore(rootReducer);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }
  
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <TabsNavigation />
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});
