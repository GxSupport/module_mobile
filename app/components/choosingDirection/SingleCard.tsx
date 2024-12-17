import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {BaseUrl} from '../../constants/urls.ts';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SingleDataType} from '../../types/Types.ts';
import {useNavigation} from '@react-navigation/native';

type SingleCardProps = {
  item: SingleDataType;
};
export const SingleCard: React.FC<SingleCardProps> = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className={'my-1'}
      onPress={() =>
        //@ts-ignore
        navigation.navigate('NourseCourseListCategoryID', {id: item.id, isHome: false})
      }>
      <View className={'w-full h-[180px] rounded-xl overflow-hidden relative'}>
        {item?.image?.file_url ? (
          <Image
            source={{uri: BaseUrl + item?.image?.file_url}}
            className={'w-full h-full object-cover'}
          />
        ) : null}
      </View>
      <View className={'flex-row gap-3 my-2 mb-2 px-1'}>
        <View
          className={
            'w-[35px] h-[35px] rounded-full overflow-hidden bg-blue-400 flex-row items-center justify-center'
          }>
          {item?.user?.image ? (
            <Text> rasm bor</Text>
          ) : (
            <Text className={'text-[12px] text-white '}>
              {item?.user?.last_name.slice(0, 1)}
              {item?.user?.first_name.slice(0, 1)}
            </Text>
          )}
        </View>
        <View className={'w-full'}>
          <Text className={'text-colorParagreph font-[600] w-10/12 flex-wrap'}>
            {item?.name}
          </Text>
          <View className={'flex-row gap-3 items-center'}>
            <Text className={'text-colorOpacityText text-[10px]'}>
              {item?.user?.first_name} {item?.user?.last_name}
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
                {item?.average_rate ? item?.average_rate : 0}
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
                {item?.rate_count ? item?.rate_count : 0}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
