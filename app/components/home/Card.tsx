import React from 'react';
import {Image, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {BaseUrl} from '../../constants/urls.ts';

const profileImg = require('../../assets/img/profile.png');
export const Card = ({item}: {item: any}) => {
  return (
    <View className={'my-1'}>
      <View className={'w-full h-[180px] rounded-xl overflow-hidden relative'}>
        {item?.course?.image.file_url ? (
          <Image
            source={{uri: BaseUrl + item?.course?.image.file_url}}
            className={'w-full h-full object-cover'}
          />
        ) : null}
        <View
          className={
            'bg-white absolute bottom-1.5 right-1.5  w-[40px] h-[40px] justify-center items-center rounded-full'
          }>
          {+item?.percent === 100 ? (
            <Icon name={'checkmark-done-outline'} color={'#0C61B0'} size={20} />
          ) : (
            <Text> {item?.percent}% </Text>
          )}
        </View>
      </View>
      <View className={'flex-row gap-3 my-2 mb-2 px-1'}>
        <View
          className={
            'w-[35px] h-[35px] rounded-full overflow-hidden bg-blue-400 flex-row items-center justify-center'
          }>
          {item?.user?.image ? (
            <Image
              source={profileImg}
              className={'w-full h-full rounded-full object-cover'}
            />
          ) : (
            <Text className={'text-[12px] text-white '}>
              {item?.course?.user?.first_name.slice(0, 1)}
              {item?.course?.user?.last_name.slice(0, 1)}
            </Text>
          )}
        </View>
        <View>
          <Text className={'text-colorParagreph font-[600] '}>
            {item?.course?.name}
          </Text>
          <View className={'flex-row gap-1'}>
            <Text className={'text-colorOpacityText text-[10px]'}>
              {item?.course?.user?.first_name} {item?.course?.user?.last_name}
            </Text>
            <Text
              className={
                'text-colorOpacityText border-colorOpacityText text-[10px] border border-y-0 px-1 '
              }>
              {item?.course?.average_rate ? item?.course?.average_rate : 0}
              o’rtacha reyting
            </Text>
            <Text className={'text-colorOpacityText text-[10px]'}>
              {item?.course?.rate_count ? item?.course?.rate_count : 0}
              baholovchilar soni
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
