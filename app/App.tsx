import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import '../global.css';
import {ContextProvider} from './context/Context.tsx';
import {AppNavigator} from './navigators/app-navigator.tsx';

const App = () => {
  return (
    <NavigationContainer>
      <ContextProvider>
        <AppNavigator />
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;
