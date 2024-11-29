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
import {Card} from '../../components/home/Card.tsx';
import SkeletonLoader from '../../components/helpers/Skeleton.tsx';
import {useFocusEffect} from '@react-navigation/native';

interface DataType {
  course_subject_id: string;
}

function Home() {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [per_page, setPer_page] = useState<number>(10);

  const getMyCourseList = async (
    pageNumber: number,
  ): Promise<{data: DataType[]}> => {
    try {
      const res = await api({
        method: 'GET',
        url: `/api/nurse/course/list`,
        params: {
          per_page: pageNumber,
        },
      });
      return res.data;
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getMyCourseList(per_page);
        setData(prevData => [...prevData, ...res.data]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [per_page]);

  // telefonda orqaga tugmani bosilgda ilovani yopish uchun
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

  if (data.length === 0 && loading) {
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
      {data.length === 0 && !loading ? (
        <View className="flex-1 justify-center items-center">
          <Text>Ma'lumot topilmadi!</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={Card}
          keyExtractor={(_, index) => index.toString()}
          onEndReached={() => {
            if (!loading) {
              setPer_page(prevPage => prevPage + 10);
            }
          }}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
          }
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={10}
        />
      )}
    </SafeAreaView>
  );
}

export default Home;
