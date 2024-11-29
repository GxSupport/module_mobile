import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {useCustomContext} from '../context/Context.tsx';
import {RootStackParamList} from '../navigators/app-navigator.tsx';

export const InitialScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {token, isLoadToken} = useCustomContext();
  useEffect(() => {
    if (!isLoadToken) {
      if (token) {
        navigation.replace('Tab');
      } else {
        navigation.replace('Auth');
      }
    }
  }, [navigation, token, isLoadToken]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View className="relative bg-colorSpecial flex-1 justify-center">
        <Text className="text-center text-white tracking-widest text-[28px] font-bold">
          iMEDIC
        </Text>
        <View className="absolute w-full bottom-14">
          <Text
            className={
              'text-center mb-1 text-white tracking-widest font-normal '
            }>
            loading
          </Text>
          <View
            className={'bg-green-300 w-10/12 m-auto h-[15px] rounded-xl '}
          />
        </View>
      </View>
    </>
  );
};
