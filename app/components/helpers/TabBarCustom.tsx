import React, {useState} from 'react';
import {View, TouchableOpacity, SafeAreaView, Text} from 'react-native';

interface TabBarPropsTypes {
  state: any;
  navigation: any;
  className?: string;
}

const CustomTabBar = ({state, navigation, className}: TabBarPropsTypes) => {
  const [pressedState, setPressedState] = useState<{[key: number]: boolean}>(
    {},
  );
  const handlePressIn = (index: number) => {
    setPressedState(prevState => ({
      ...prevState,
      [index]: true,
    }));
  };

  const handlePressOut = (index: number) => {
    setPressedState(prevState => ({
      ...prevState,
      [index]: false,
    }));
  };
  return (
    <SafeAreaView>
      <View
        className={`h-[60px] flex-row bg-colorTabBarBg  items-center justify-evenly ${className}`}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const isPressed = pressedState[index] || false;

          const handlePress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <TouchableOpacity
              key={index}
              onPress={handlePress}
              onPressIn={() => handlePressIn(index)}
              onPressOut={() => handlePressOut(index)}
              className={`w-14 h-14 flex items-center justify-center rounded-full ${
                isPressed ? 'bg-zinc-400' : 'bg-transparent'
              }`}>
              <View className="text-center">
                {getTabIcon(route.name, isFocused)}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default CustomTabBar;

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';

const getTabIcon = (routeName: string, focused: boolean) => {
  switch (routeName) {
    case 'Home':
      return (
        <Icon
          name="home"
          className={`${focused ? '!text-blue-600' : '!text-gray-500'}`}
          size={27}
        />
      );
    case 'ChoosingDirection':
      return (
        <Icon
          name="add-circle-outline"
          className={`${focused ? '!text-blue-600' : '!text-gray-500'}`}
          size={27}
        />
      );
    case 'UserProfile':
      return (
        <Icon
          name="person-circle-outline"
          className={`${focused ? '!text-blue-600' : '!text-gray-500'}`}
          size={27}
        />
      );
    case 'ViewPdf': {
      return (
        <FontAwesome6
          name={'clipboard-list'}
          className={`pb-0.5 !border-b-2 ${
            focused
              ? '!text-green-500 px-1 !border-green-500'
              : '!text-gray-400 !border-transparent'
          }`}
          size={22}
        />
      );
    }
    case 'ViewVideo': {
      return (
        <Entypo
          name={'folder-video'}
          size={22}
          className={`pb-0.5 !border-b-2 ${
            focused
              ? '!text-green-500 px-1  !border-green-500'
              : '!text-gray-400 !border-transparent'
          }`}
        />
      );
    }
    case 'ViewComment': {
      return (
        <Fontisto
          name={'comment'}
          size={20}
          className={`pb-1 !border-b-2 ${
            focused
              ? '!text-green-500 px-1 !border-green-500'
              : '!text-gray-400 !border-transparent'
          }`}
        />
      );
    }
  }
};
export {getTabIcon};

import {NavigationState, Route} from 'react-native-tab-view';

interface CustomTabBarProps {
  navigationState: NavigationState<Route>;
  setIndex: (index: number) => void;
}

export const CustomTabComponent: React.FC<CustomTabBarProps> = ({
  navigationState,
  setIndex,
}) => {
  return (
    <View className="flex-row justify-evenly items-center left-1/2 -translate-x-[50%] bg-colorBoxWhite border-gray-200 border rounded-xl border-b z-20 absolute bottom-2 w-[97%] h-[60px]">
      {navigationState.routes.map((route, i) => {
        const isActive = navigationState.index === i;
        return (
          <TouchableOpacity
            key={route.key}
            className={`items-center w-14 h-14  rounded-full justify-center`}
            onPress={() => setIndex(i)}>
            <View>
              {getTabIcon(route.title as string, isActive)}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
