import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChoosingDirection from './ChoosingDirection.tsx';
import {DirectionList} from './(id).tsx';
import {HeaderTitle} from '../../components/helpers/headerTilte.tsx';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const ChoosingDirectionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
      }}>
      <Stack.Screen
        name="ChoosingDirection"
        component={ChoosingDirection}
        options={{
          headerTitle: () => <HeaderTitle title={'Yo’nalishingizni tanlang'} />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="DirectionList"
        component={DirectionList}
        options={{
          headerRight: () => (
            <TouchableOpacity className={'mr-2'}>
              <Icon
                name="ellipsis-vertical"
                size={20}
                className={'!text-colorText'}
              />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          headerTitle: () => (
            <HeaderTitle
              className={'text-colorText'}
              title={'Ichki kasalliklarda hamshiralik ishi'}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default ChoosingDirectionStack;

const styles = StyleSheet.create({
  headerStyle: {
    shadowColor: 'transparent',
    backgroundColor: 'white',
  },
});
