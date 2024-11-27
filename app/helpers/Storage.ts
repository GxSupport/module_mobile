import AsyncStorage from '@react-native-async-storage/async-storage';

const setStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('storagga malumot saqlandi');
  } catch (error) {
    throw error;
  }
};

const getStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return value;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const removeStorage = async (key: string) => {
  if (!key) {
    console.warn('Key mavjud emas');
    return;
  }
  try {
    await AsyncStorage.removeItem(key);
    console.log(`${key} muvaffaqiyatli o‘chirildi`);
  } catch (error) {
    console.error(`Storage o‘chirishda xatolik: ${error}`);
  }
};
export {setStorage, getStorage, removeStorage};
