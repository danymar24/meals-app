import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabsNavigation from './navigation/TabsNavigation';
import { combineReducers, createStore } from 'redux';
import {mealsReducer} from './store/meals/reducer';
import { Provider } from 'react-redux';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
};

const client = new ApolloClient({
  uri: 'https://us-central1-bbred-b99f1.cloudfunctions.net/graphql',
  cache: new InMemoryCache()
});

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
    <ApolloProvider client={client}>
      <Provider store={store}>
        <View style={{flex: 1}}>
          <NavigationContainer>
            <TabsNavigation />
          </NavigationContainer>
        </View>
      </Provider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});
