import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import CardBox from '../../components/choosingDirection/cardBox.tsx';
import api from '../../config/api.ts';
import {DirectonBoxTypes} from '../../types/Types.ts';
import SkeletonLoader from '../../components/helpers/Skeleton.tsx';

const image = require('../../assets/img/image.png');
const image2 = require('../../assets/img/image2.png');
const image3 = require('../../assets/img/image3.png');
const image4 = require('../../assets/img/image4.png');

const ChoosingDirection = () => {
  const [data, setData] = useState<DirectonBoxTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const images = [image, image2, image3, image4];
  const getDirectionList = async (): Promise<DirectonBoxTypes[]> => {
    try {
      const res = await api({
        method: 'GET',
        url: '/api/select/category',
      });

      let updatedData: DirectonBoxTypes[];
      updatedData = res.data.map((item: DirectonBoxTypes) => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return {
          ...item,
          randomImgUrl: images[randomIndex],
        };
      });
      return updatedData;
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getDirectionList();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (data.length === 0 && loading) {
    return (
      <ScrollView className={'panel'}>
        <View>
          {Array(6)
            .fill('')
            .map((_, index) => {
              return (
                <View className={'my-1.5'} key={index}>
                  <SkeletonLoader className={'h-[150px] mb-2'} />
                </View>
              );
            })}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView className={'panel'}>
      {data.length === 0 && !loading ? (
        <View className="flex-1 justify-center items-center">
          <Text>Ma'lumot topilmadi!</Text>
        </View>
      ) : (
        data.map((item: DirectonBoxTypes) => {
          return <CardBox item={item} key={item.id} />;
        })
      )}
    </ScrollView>
  );
};

export default ChoosingDirection;
