import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {BaseUrl} from '../../constants/urls.ts';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DataType} from '../../types/Types.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type SingleCardProps = {
  item: DataType;
};

export const Card: React.FC<SingleCardProps> = ({item}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <TouchableOpacity
      className={'my-1'}
      onPress={() =>
        //@ts-ignore
        navigation.navigate('NourseCourseListCategoryID', {
          id: item.id,
          isHome: true,
          label: item.course.name,
        })
      }>
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
            <Text>rasm bor</Text>
          ) : (
            <Text className={'text-[12px] text-white '}>
              {item?.course?.user?.last_name.slice(0, 1)}
              {item?.course?.user?.first_name.slice(0, 1)}
            </Text>
          )}
        </View>
        <View className={'w-full'}>
          <Text className={'text-colorParagreph font-[600] w-10/12 flex-wrap'}>
            {item?.course?.name}
          </Text>
          <View className={'flex-row gap-3 items-center'}>
            <Text className={'text-colorOpacityText text-[10px]'}>
              {item?.course?.user?.first_name} {item?.course?.user?.last_name}
            </Text>
            <View
              className={'items-center flex-row border gap-1 border-y-0 px-3 '}>
              <Icon
                name={'star-half'}
                size={14}
                className={'!text-colorText'}
              />
              <Text
                className={
                  'text-colorOpacityText border-colorOpacityText text-[12px] '
                }>
                {item?.course?.average_rate ? item?.course?.average_rate : 0}
              </Text>
            </View>
            <View className={'items-center flex-row gap-1'}>
              <IconMaterialCommunityIcons
                name={'account-heart-outline'}
                size={17}
                className={'!text-colorText'}
              />
              <Text
                className={
                  'text-colorOpacityText border-colorOpacityText text-[12px] '
                }>
                {item?.course?.rate_count ? item?.course?.rate_count : 0}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
