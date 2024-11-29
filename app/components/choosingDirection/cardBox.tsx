import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {DirectonBoxTypes} from '../../types/Types.ts';
import {useNavigation} from '@react-navigation/native';

function CardBox({item}: {item: DirectonBoxTypes}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => {
        // @ts-ignore
        navigation.navigate('DirectionList', {id: item.id});
      }}
      className={'bg-zinc-200/60 flex flex-row rounded-lg h-[150px] py-1 my-2'}>
      <View className={'flex-1 items-center justify-center px-4 w-[55%]'}>
        <Text
          className={'text-center text-colorParagreph font-[600] text-[15px] '}>
          {item?.name}
        </Text>
      </View>
      <View className={'w-[45%]'}>
        <Image
          className={'w-full h-full rounded-lg '}
          source={item?.randomImgUrl}
        />
      </View>
    </TouchableOpacity>
  );
}

export default CardBox;
