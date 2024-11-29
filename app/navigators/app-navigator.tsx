import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {InitialScreen} from '../screens/Index.tsx';
import {AuthScreen} from '../pages/authScreen/AuthScreen.tsx';
import {Tabs} from '../(Tabs)';

export type RootStackParamList = {
  Auth: undefined;
  Tab: undefined;
  Initial: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="Initial">
      <RootStack.Screen
        name="Initial"
        component={InitialScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          headerShown: false,
          animation: 'simple_push',
        }}
      />
      <RootStack.Screen
        name="Tab"
        component={Tabs}
        options={{
          headerShown: false,
          animation: 'ios_from_right',
        }}
      />
    </RootStack.Navigator>
  );
};
