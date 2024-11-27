import React from 'react';
import {Image, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const cardBg = require('../../assets/img/cardBg.png');
const profileImg = require('../../assets/img/profile.png');
export const Card = () => {
  return (
    <View>
      <View className={'w-full h-[180px] rounded-xl overflow-hidden relative '}>
        <Image source={cardBg} className={'w-full h-full object-cover'} />
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
          <Text className={'text-colorParagreph font-[600] '}>
            Hamshiraning shahslar aro kommunikativ munosabatlari
          </Text>
          <View className={'flex-row justify-center gap-2'}>
            <Text className={'text-colorOpacityText text-[10px]'}>
              Xasanov Davron
            </Text>
            <Text
              className={
                'text-colorOpacityText border-colorOpacityText text-[10px] border border-y-0 px-2 '
              }>
              3.9 o’rtacha reyting
            </Text>
            <Text className={'text-colorOpacityText text-[10px]'}>
              29 107 baholovchilar soni
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
