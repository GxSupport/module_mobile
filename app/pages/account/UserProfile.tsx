import {Alert, ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {removeStorage} from '../../helpers/Storage.ts';
import Button from '../../components/helpers/Button.tsx';
import {useCustomContext} from '../../context/Context.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigators/app-navigator.tsx';

export const UserProfile = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const {setToken} = useCustomContext();
  const logOut = async () => {
    Alert.alert(
      'Ilovadan chiqish',
      'Haqiqatan ham ilovadan chiqishni xohlaysizmi?',
      [
        {
          text: 'Bekor qilish',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Ha',
          onPress: async () => {
            setIsLogout(true);
            await removeStorage('access_token')
              .catch(err => {
                console.error(err, 'Token o`chirishda xatolik bor');
                return false;
              })
              .finally(() => {
                setToken(null);
                navigation.replace('Auth');
                console.log('Token o`chirildi');
                setIsLogout(false);
              });
          },
        },
      ],
    );
  };
  return (
    <ScrollView className={'panel'}>
      <View>
        <Button
          onPress={logOut}
          className={
            'mt-2 bg-red-400 h-[45px] flex justify-center py-2 text-center rounded-lg'
          }
          titleStyle={'text-white text-[16px]'}
          loading={isLogout}>
          LogOut
        </Button>
      </View>
    </ScrollView>
  );
};
