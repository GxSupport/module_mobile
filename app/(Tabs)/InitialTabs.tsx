import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import React from 'react';
import Home from '../pages/home/Home';
import {UserProfile} from '../pages/account/UserProfile';
import {HeaderTitle} from '../components/helpers/headerTilte.tsx';
import CustomTabBar from '../components/helpers/TabBarCustom.tsx';
import ChoosingDirection from '../pages/direction/ChoosingDirection.tsx';

export const InitialTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerStyle: styles.headerStyle,
      }}
      tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <HeaderTitle title={'Mening kurslarim'} />,
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="ChoosingDirection"
        component={ChoosingDirection}
        options={{
          headerTitle: () => <HeaderTitle title={'Yo’nalishingizni tanlang'} />,
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerTitle: () => <HeaderTitle title={'Profile'} />,
          headerTitleAlign: 'center',
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
});
