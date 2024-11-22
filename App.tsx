import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/pages/home/Home.tsx';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CourseList from './src/pages/courses/CourseList.tsx';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';
import {UserProfile} from './src/pages/account/UserProfile.tsx';
import {COLORS} from './src/constants/Colors.ts';
import {Login} from './src/pages/login/Login.tsx';

const App = () => {
  const [token] = useState<string | null>('token');
  if (token) {
    return <Login />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Layout />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

export const Layout = () => {
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
              style={focused ? styles.activeIcon : styles.iconDefault}
              size={27}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Courses'}
        component={CourseList}
        options={{
          title: 'Courses',
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => (
            <Icon
              name="add-circle-outline"
              style={focused ? styles.activeIcon : styles.iconDefault}
              size={27}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'UserProfile'}
        component={UserProfile}
        options={{
          title: 'Courses',
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => (
            <Icon
              name="person-circle-outline"
              style={focused ? styles.activeIcon : styles.iconDefault}
              size={27}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeIcon: {
    color: COLORS.colorSpecial,
  },
  iconDefault: {
    color: COLORS.colorText,
  },
  headerStyle: {
    backgroundColor: 'white',
    shadowColor: 'transparent',
  },
  tabBarStyle: {
    backgroundColor: COLORS.tabBarBg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 60,
    paddingTop: 10,
  },
});
