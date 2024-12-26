import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  BackHandler,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import PhoneInput from 'react-phone-number-input/react-native-input';
import Icon from 'react-native-vector-icons/Ionicons.js';
import api from '../../config/api.ts';
import {setStorage} from '../../helpers/Storage.ts';
import {useCustomContext} from '../../context/Context.tsx';
import Button from '../../components/helpers/Button.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigators/app-navigator.tsx';
import {useFocusEffect} from '@react-navigation/native';
import ToastCustom from '../../components/helpers/ToastCustom.tsx';
import {ToastPropTypes} from '../../types/Types.ts';

export const AuthScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {setToken} = useCustomContext();
  const [phone, setPhone] = useState<string>('+998');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [isLoginLoad, setIsLoginLoad] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [toastCustom, setToastcustom] = useState<ToastPropTypes>({
    type: 'error',
    message: 'custom toast',
    isToast: false,
    time: 3000,
  });
  const login = async () => {
    setIsSubmit(true);
    if (password === '' || password.length < 4) {
      setPasswordError('Parolni kiritmadingiz 4 tadan kam kiritmang');
    } else {
      setPasswordError('');
    }
    if (phone === '' || phone.length < 13) {
      setPhoneError("Telefon raqamingizni to'liq kiritng");
    } else {
      setPhoneError('');
    }
    if (password.length >= 4 && phone.length === 13) {
      try {
        setIsLoginLoad(true);
        const token = await api({
          url: '/api/login',
          method: 'POST',
          data: {
            phone: phone.slice(1),
            password,
          },
        });
        if (token.data?.access_token) {
          await setStorage('access_token', token.data?.access_token);
          setToken(token.data?.access_token);
          navigation.replace('Tabs');
        }
      } catch (error: any) {
        console.log(error, 'errors');
        setToastcustom({
          ...toastCustom,
          isToast: true,
          message: JSON.stringify(error?.message as string),
        });
      } finally {
        setIsLoginLoad(false);
      }
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handlePhoneChange = (value: string) => {
    if (value && !value.startsWith('+998')) {
      const formattedValue = '+998' + value.replace(/\D/g, '').slice(0, 9);
      setPhone(formattedValue);
    } else if (value === '') {
      setPhone('');
    } else {
      setPhone(value);
    }

    if ((value === '' || value.length < 13) && isSubmit) {
      setPhoneError("Telefon raqamingizni to'liq kiritng");
    } else {
      setPhoneError('');
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if ((value === '' || value.length < 4) && isSubmit) {
      setPasswordError('Parolni kiritmadingiz 4 tadan kam kiritmang');
    } else {
      setPasswordError('');
    }
  };

  // telefonda orqaga tugmani bosilgda ilovani yopish uchun
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert(
          'Ilovani yopish',
          'Haqiqatan ham ilovani yopishni xohlaysizmi?',
          [
            {
              text: 'Bekor qilish',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Ha',
              onPress: () => BackHandler.exitApp(),
            },
          ],
        );
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []),
  );

  return (
    <KeyboardAvoidingView
      className={'bg-white flex-1'}
      behavior={'padding'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          className={`flex-1 bg-white ${
            keyboardVisible ? 'pb-[300px]' : 'pb-0'
          }`}>
          <ToastCustom
            setToastcustom={setToastcustom}
            toastCustom={toastCustom}
          />
          <View className={'h-1/2'}>
            <Image
              className={'w-full h-full'}
              source={require('../../assets/img/loginImage.png')}
            />
          </View>
          <View className={'rounded-t-[40px] -mt-10 pt-14 px-5 bg-white'}>
            <Text className={'text-colorText text-[24px] font-bold pl-5 mb-10'}>
              XUSH KELIBSIZ
            </Text>
            <View>
              <Text
                className={`text-[13px] pl-6  mb-1 ${
                  phoneError ? 'text-red-400' : 'text-colorText'
                }`}>
                {phoneError ? phoneError : 'Telefon raqamingizni kiriting'}
              </Text>
              <PhoneInput
                placeholder="Telefon raqamingizni kiriting"
                value={phone}
                onChange={value => handlePhoneChange(String(value))}
                style={
                  phoneError && isSubmit ? styles.errorStyle : styles.input
                }
                maxLength={17}
              />
            </View>
            <View className={'mb-3'}>
              <Text
                className={`text-[13px] pl-6  mb-1 ${
                  passwordError ? 'text-red-400' : 'text-colorText'
                }`}>
                {passwordError ? passwordError : 'Parolingizni kiriting'}
              </Text>
              <View className={'relative'}>
                <TextInput
                  className={`  border rounded-md pl-4 pr-10  max-h-[40px] ${
                    passwordError
                      ? 'border-red-300 bg-red-200'
                      : 'border-[#DCDCDC] bg-[#f5f5f5]'
                  }`}
                  value={password}
                  onChangeText={value => handlePasswordChange(value)}
                  secureTextEntry={showPassword}
                  placeholder="Parolingizni kiriting"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className={'absolute left-[92%] top-3.5'}>
                  <Text className={'text-colorText'}>
                    <Icon name={showPassword ? 'eye-off' : 'eye'} size={18} />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className={'justify-end flex-row w-full flex items-center'}>
              <Text className={'text-[13px]'}>
                {' '}
                Parolingizni unutdingizmi?{' '}
              </Text>
              <TouchableOpacity>
                <Text className={'text-colorSpecial text-[13px]'}>
                  Parolni tiklash
                </Text>
              </TouchableOpacity>
            </View>
            <View className={'mt-14'}>
              <Button
                onPress={login}
                className={
                  'mt-2 bg-colorSpecial h-[45px] flex-row items-center justify-center text-center rounded-lg disabled:opacity-90'
                }
                titleStyle={'text-white text-[18px] font-bold'}
                loading={isLoginLoad}>
                Tizimga kirish
              </Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingLeft: 10,
    borderColor: '#DCDCDC',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 10,
    paddingRight: 45,
    maxHeight: 45,
    backgroundColor: '#F5F5F5',
  },
  errorStyle: {
    width: '100%',
    paddingLeft: 10,
    borderColor: '#feb2b2',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 10,
    paddingRight: 45,
    maxHeight: 45,
    backgroundColor: '#fed7d7',
  },

  toast: {
    position: 'absolute',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    top: 0,
    left: 0,
    zIndex: 100,
  },
});
