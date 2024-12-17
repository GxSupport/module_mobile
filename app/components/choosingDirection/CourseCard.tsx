import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {BaseUrl} from '../../constants/urls.ts';
import {CourseCardTypes} from '../../types/Types.ts';
import {useNavigation} from '@react-navigation/native';

function CourseCard({item}: {item: CourseCardTypes}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className={'mb-5'}
      onPress={() =>
        //@ts-ignore
        navigation.navigate('CourseTabs', {
          params: {id: item.id, course_subject_id: item?.course_subject_id, isHome: item?.isHome},
        })
      }>
      <View className={'h-[400px]'}>
        <Image
          className={'w-full h-full object-cover rounded-lg'}
          source={{uri: BaseUrl + item?.imageUrl}}
        />
      </View>
      <View className={'mt-5'}>
        <Text className={'flex-wrap mb-4 text-colorParagreph font-semibold'}>
          {item.name}
        </Text>
        <Text className={'text-colorParagreph opacity-70 text-[12px]'}>
          {item.teaser}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default CourseCard;
