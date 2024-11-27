import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {removeStorage} from '../../helpers/Storage.ts';
import {useNavigation} from '@react-navigation/native';

export const UserProfile = () => {
  const navigation = useNavigation();
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const logOut = async () => {
    setIsLogout(true);
    const result = await removeStorage('access_token').catch(err => {
      console.error(err, 'Token o`chirishda xatolik bor');
      return false;
    });
    console.log('Token o`chirildi:', result);
    setIsLogout(false);
    if (result) {
      navigation.navigate('Login');
    }
  };
  return (
    <ScrollView>
      <View>
        <TouchableOpacity onPress={logOut} style={styles.logOutBtn}>
          <Text>Log out {isLogout ? 'loading' : ''} </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logOutBtn: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
