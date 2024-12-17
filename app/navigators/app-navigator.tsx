import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {InitialScreen} from '../screens/Index.tsx';
import {AuthScreen} from '../pages/authScreen/AuthScreen.tsx';
import {InitialTabs} from '../(Tabs)/InitialTabs.tsx';
import {DirectionList} from '../pages/direction/(id).tsx';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NourseCourseListCategoryID} from '../pages/direction/(id2).tsx';
import CourseTabs from '../(Tabs)/CourseTabs.tsx';

export type RootStackParamList = {
  Auth: undefined;
  Tabs: undefined;
  Initial: undefined;
  CourseTabs: {id: number | string; route: string};
  DirectionList: {id: number | string; route: string};
  NourseCourseListCategoryID: {id: number | string; route: string};
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
        name="Tabs"
        component={InitialTabs}
        options={{
          headerShown: false,
          animation: 'ios_from_right',
        }}
      />
      <RootStack.Screen
        name="CourseTabs"
        component={CourseTabs}
        options={{
          headerShown: false,
          animation: 'ios_from_right',
        }}
      />
      <RootStack.Screen
        name="DirectionList"
        component={DirectionList}
        options={{
          headerRight: () => (
            <TouchableOpacity className={'ml-[15px]'}>
              <Icon name="ellipsis-vertical" size={20} />
            </TouchableOpacity>
          ),
          title: 'Ichki kasalliklarda \n hamshiralik ishi',
          headerTitleAlign: 'center',
        }}
      />
      <RootStack.Screen
        name="NourseCourseListCategoryID"
        component={NourseCourseListCategoryID}
        options={{
          headerStyle: styles.headerStyle,
          headerTitleAlign: 'center',
          title: 'Sanitariya epidemalogik \n tartib meyorlari...',
        }}
      />
    </RootStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    height: 120,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
});
