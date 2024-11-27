import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {COLORS} from '../../constants/Colors.ts';
import PhoneInput from 'react-phone-number-input/react-native-input';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../../config/api.ts';
import {setStorage} from '../../helpers/Storage.ts';
import {useNavigation} from '@react-navigation/native';

export const Login = () => {
  const navigation = useNavigation();
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const scrollViewRef = useRef(null);
  const [phone, setPhone] = useState('');
  const [inputValue, setInputValue] = useState({
    password: '',
    smsCode: '',
    newPassword: '',
    recoveryPassword: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isModalTab, setIsModalTab] = useState<boolean>(true);
  const handleGetValue = (value: string, name: string) => {
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const showModal = () => {
    setIsShowModal(true);
    setIsModalTab(true);
    clearInputs();
  };
  const closeModal = () => {
    setIsShowModal(false);
    setIsModalTab(true);
    clearInputs();
  };

  const sendForResetPassword = () => {
    if (isModalTab) {
      setIsModalTab(false);
    } else {
      closeModal();
    }
    console.log(inputValue);
  };

  const login = async () => {
    try {
      const token = await api({
        url: '/api/login',
        method: 'POST',
        data: {
          phone: phone.slice(1),
          password: inputValue.password,
        },
      });
      await setStorage('access_token', token.data?.access_token);
      if (token.data?.access_token) {
        // navigation.navigate('Home');
        navigation.navigate('Main', {screen: "Home"});
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setIsShowModal(false);
    }
  };

  const clearInputs = () => {
    setInputValue({
      password: '',
      smsCode: '',
      newPassword: '',
      recoveryPassword: '',
    });
    setPhone('');
  };

  const handleKeyboardShow = useCallback(
    (e: any) => {
      if (!isShowModal) {
        setKeyboardOffset(e.endCoordinates.height);
      }
    },
    [isShowModal],
  );

  const handleKeyboardHide = useCallback(() => {
    setKeyboardOffset(0);
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      handleKeyboardShow,
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      handleKeyboardHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [handleKeyboardShow, handleKeyboardHide]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* modal content start */}
      <Modal transparent={true} visible={isShowModal} animationType="fade">
        <View style={styles.modalContainer} onTouchEnd={closeModal}>
          <View
            style={styles.modalContent}
            onTouchEnd={e => e.stopPropagation()}>
            <Text style={styles.resetTitle}> Parolni tiklash </Text>
            {isModalTab ? (
              <View>
                <Text style={styles.inputLabel}>
                  Telefon raqamingizni kiriting
                </Text>
                <PhoneInput
                  placeholder="Telefon raqamingizni kiriting"
                  value={phone}
                  onChange={value => setPhone(String(value))}
                  style={styles.input}
                  country={'UZ'}
                  maxLength={12}
                />
              </View>
            ) : (
              <View>
                <View>
                  <Text style={styles.inputLabel}>Kodni kiriting</Text>
                  <TextInput
                    placeholder="_ _ _ _"
                    value={inputValue.smsCode}
                    onChangeText={e => handleGetValue(e, 'smsCode')}
                    style={styles.input}
                    maxLength={4}
                  />
                </View>
                <Text style={styles.resetTitle}> Yangi parol yaratish </Text>
                <View>
                  <Text style={styles.inputLabel}>Yangi parol kiriting</Text>
                  <TextInput
                    placeholder="00000"
                    value={inputValue.newPassword}
                    onChangeText={value => handleGetValue(value, 'newPassword')}
                    style={styles.input}
                  />
                </View>
                <View>
                  <Text style={styles.inputLabel}>Parolni qayta kiriting </Text>
                  <TextInput
                    placeholder="00000"
                    value={inputValue.recoveryPassword}
                    onChangeText={value =>
                      handleGetValue(value, 'recoveryPassword')
                    }
                    style={styles.input}
                  />
                </View>
              </View>
            )}
            <TouchableOpacity
              style={styles.sendButton}
              onPress={sendForResetPassword}>
              <Text style={styles.sendButtonText}>
                {isModalTab ? 'Tasdiqlash' : 'Kod yuborish'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* modal content end */}
      <View
        style={[styles.container, {paddingBottom: keyboardOffset}]}
        ref={scrollViewRef}>
        <View style={styles.figure}>
          <Image
            style={styles.loginImg}
            source={require('../../assets/img/loginImage.png')}
          />
        </View>
        <View style={styles.loginBox}>
          <Text style={styles.welcomeText}> XUSH KELIBSIZ </Text>
          <View>
            <Text style={styles.inputLabel}>Telefon raqamingizni kiriting</Text>
            <PhoneInput
              placeholder="Telefon raqamingizni kiriting"
              value={phone}
              onChange={value => setPhone(String(value))}
              style={styles.input}
              country={'UZ'}
              maxLength={12}
            />
          </View>
          <View>
            <Text style={styles.inputLabel}> Parolingizni kiriting </Text>
            <View style={styles.passwordBox}>
              <TextInput
                style={styles.input}
                value={inputValue.password}
                onChangeText={value => handleGetValue(value, 'password')}
                secureTextEntry={showPassword}
                placeholder="Parolingizni kiriting"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.toggleButton}>
                <Text style={styles.toggleText}>
                  <Icon name={showPassword ? 'eye-off' : 'eye'} size={18} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.forgetPasswordBox}>
            <Text style={styles.inputLabel}> Parolingizni unutdingizmi? </Text>
            <TouchableOpacity onPress={showModal}>
              <Text style={styles.forgetPassword}> Parolni tiklash </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sendButtonBox}>
            <TouchableOpacity style={styles.clickButton} onPress={login}>
              <Text style={styles.buttonText}> tizimga kirish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  figure: {
    backgroundColor: 'blue',
    height: '50%',
  },
  loginImg: {
    width: '100%',
    height: '100%',
  },
  loginBox: {
    marginTop: -28,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 50,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.colorText,
    paddingLeft: 15,
    marginBottom: 30,
    // fontFamily: 'monstserrat',
  },
  inputLabel: {
    fontSize: 12,
    paddingLeft: 20,
    color: COLORS.colorText,
  },
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
  forgetPasswordBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  forgetPassword: {
    color: COLORS.colorSpecial,
    fontSize: 12,
  },
  sendButtonBox: {
    paddingTop: 50,
  },
  clickButton: {
    backgroundColor: COLORS.colorSpecial,
    borderRadius: 7,
    paddingVertical: 10,
  },
  passwordBox: {
    position: 'relative',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: 'white',
    textAlign: 'center',
  },
  toggleButton: {
    marginLeft: 10,
    position: 'absolute',
    top: 12,
    left: '89%',
  },
  toggleText: {
    color: COLORS.colorText,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    margin: 'auto',
    padding: 20,
    paddingBottom: 30,
  },
  sendButton: {
    backgroundColor: COLORS.colorSpecial,
    borderRadius: 10,
  },
  sendButtonText: {
    color: 'white',
    paddingVertical: 14,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resetTitle: {
    color: COLORS.colorText,
    fontSize: 16,
    paddingLeft: 15,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});
