import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/pages/home/Home.tsx';

const App = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'my home',
            headerTitleAlign: 'center',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
