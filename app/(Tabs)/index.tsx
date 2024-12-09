import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import React from 'react';
import Home from '../pages/home/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import {UserProfile} from '../pages/account/UserProfile';
import {HeaderTitle} from '../components/helpers/headerTilte.tsx';
import ChoosingDirectionStack from '../pages/direction/ChoosingStack.tsx';

export const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerStyle: styles.headerStyle,
        tabBarStyle: styles.tabBarStyle,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <HeaderTitle title={'Mening kurslarim'} />,
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <Icon
              name="home"
              className={`${focused ? '!text-blue-600' : '!text-gray-500'}`}
              size={27}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ChoosingDirectionStack"
        component={ChoosingDirectionStack}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <Icon
              name="add-circle-outline"
              className={`${focused ? '!text-blue-600' : '!text-gray-500'}`}
              size={27}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerTitle: () => <HeaderTitle title={'Profile'} />,
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <Icon
              name="person-circle-outline"
              className={`${focused ? '!text-blue-600' : '!text-gray-500'}`}
              size={27}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'white',
    shadowColor: 'transparent',
  },
  tabBarStyle: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 60,
    paddingTop: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
