import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import api from '../../config/api';
import SkeletonLoader from '../../components/helpers/Skeleton.tsx';
import {useFocusEffect} from '@react-navigation/native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DataType} from '../../types/Types.ts';
import {Card} from '../../components/home/Card.tsx';

function Home() {
  const [data, setData] = useState<DataType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(async () => {
    if (loading || (data && data?.length >= total && total > 0)) {
      return;
    }
    setLoading(true);
    try {
      const result = await api({
        method: 'GET',
        url: '/api/nurse/course/list',
        params: {
          page: page,
          per_page: 10,
        },
      });
      setData(prevData => [...(prevData || []), ...(result.data?.data || [])]);
      setTotal(result.data.total);
      setPage((prevPage: number) => prevPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [loading, data, total, page]);

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert(
          'Ilovani yopish',
          'Haqiqatan ham ilovani yopishni xohlaysizmi?',
          [
            {
              text: 'Bekor qilish',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Ha',
              onPress: () => BackHandler.exitApp(),
            },
          ],
        );
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  if (!data && loading) {
    return (
      <ScrollView className={'panel'}>
        <View>
          {Array(4)
            .fill('')
            .map((_, index) => {
              return (
                <View className={'my-1.5'} key={index}>
                  <SkeletonLoader className={'h-[180px] mb-3'} />
                  <View className={'flex-row gap-[3%] '}>
                    <View className={'w-[10%]'}>
                      <SkeletonLoader className={'h-10 w-10 !rounded-full'} />
                    </View>
                    <View className={'w-[87%]'}>
                      <SkeletonLoader className={'h-10 w-full '} />
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView className="panel">
      {data?.length === 0 && !loading ? (
        <View className="flex-1 justify-center items-center">
          <Text className={'text-gray-500'}>Ma'lumot topilmadi!</Text>
          <IconMaterialCommunityIcons
            name={'note-remove-outline'}
            size={40}
            className={'!text-gray-500'}
          />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => <Card item={item} />}
          keyExtractor={(item: DataType) => item.id.toString()}
          onEndReached={fetchData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
          }
        />
      )}
    </SafeAreaView>
  );
}

export default Home;
