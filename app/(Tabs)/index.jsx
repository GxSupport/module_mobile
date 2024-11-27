import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import React from 'react';
import Home from '../pages/home/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import CourseList from '../pages/courses/CourseList';
import {UserProfile} from '../pages/account/UserProfile';

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
          headerTitle: 'Mening kurslarim',
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              className={`${
                focused ? '!text-colorSpecial' : '!text-colorText'
              }`}
              size={27}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Courses"
        component={CourseList}
        options={{
          title: 'Courses',
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => (
            <Icon
              name="add-circle-outline"
              className={`${
                focused ? '!text-colorSpecial' : '!text-colorText'
              }`}
              size={27}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          title: 'Profile',
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => (
            <Icon
              name="person-circle-outline"
              className={`${
                focused ? '!text-colorSpecial' : '!text-colorText'
              }`}
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
    backgroundColor: 'rgb(173,216,230)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 60,
    paddingTop: 10,
  },
});
