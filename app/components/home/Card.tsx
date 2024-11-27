import React from 'react';
import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {BaseUrl} from '../../constants/urls.ts';

// const cardBg = require('../../assets/img/cardBg.png');
const profileImg = require('../../assets/img/profile.png');
export const Card = ({item}: {item: any}) => {
  return (
    <View>
      <View className={'w-full h-[180px] rounded-xl overflow-hidden relative '}>
        {/*<Text>{`${BaseUrl + item.image.file_url}`}</Text>*/}
        <Link url={BaseUrl + item.image.file_url}>
          {BaseUrl + item.image.file_url}
        </Link>
        {item?.image?.file_url ? (
          <Image
            source={{uri: BaseUrl + item?.image?.file_url}}
            className={'w-full h-full object-cover'}
          />
        ) : null}
        <View
          className={
            'bg-white absolute bottom-1.5 right-1.5  w-[40px] h-[40px] justify-center items-center rounded-full'
          }>
          {5 > 4 ? (
            <Text> 41% </Text>
          ) : (
            <Icon name={'checkmark-done-outline'} color={'blue'} size={20} />
          )}
        </View>
      </View>
      <View className={'flex-row items-center gap-3 my-1 px-3'}>
        <Image
          source={profileImg}
          className={'w-[35px] h-[35px] rounded-full object-cover'}
        />
        <View>
          <Text className={'text-colorParagreph font-[600] '}>{item.name}</Text>
          <View className={'flex-row justify-center gap-2'}>
            <Text className={'text-colorOpacityText text-[10px]'}>
              Xasanov Davron
            </Text>
            <Text
              className={
                'text-colorOpacityText border-colorOpacityText text-[10px] border border-y-0 px-2 '
              }>
              {item?.average_rate ? item?.average_rate : 0} o’rtacha reyting
            </Text>
            <Text className={'text-colorOpacityText text-[10px]'}>
              {item?.rate_count ? item?.rate_count : 0} baholovchilar soni
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const Link = ({url, children}: {url: any; children: any}) => {
  const handlePress = () => {
    if (url) {
      Linking.openURL(url).catch((err: any) =>
        console.error('Havolani ochishda xatolik:', err),
      );
    }
  };

  return (
    <Text style={styles.link} onPress={handlePress}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
