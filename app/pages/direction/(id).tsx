import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../config/api.ts';
import {SingleCard} from '../../components/choosingDirection/SingleCard.tsx';
import SkeletonLoader from '../../components/helpers/Skeleton.tsx';
import {SingleDataType} from '../../types/Types.ts';

type DirectionRouteProp = RouteProp<{params: {id: string}}, 'params'>;

export const DirectionList: React.FC = () => {
  const {params} = useRoute<DirectionRouteProp>();
  const [paramIdData, setParamIdData] = useState<SingleDataType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    if (loading || (paramIdData && paramIdData?.length >= total && total > 0)) {
      return;
    }
    setLoading(true);
    try {
      const result = await api({
        method: 'GET',
        url: `/api/nurse/course/list/category/${params.id}`,
        params: {
          page: page,
          per_page: 10,
        },
      });
      setParamIdData(prevData => [
        ...(prevData || []),
        ...(result.data?.data || []),
      ]);
      setTotal(result.data.total);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error(error);
      Alert.alert('Xatolik', 'Maʼlumotni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchData();
    }
  }, [params?.id]);

  if (!paramIdData && loading) {
    return (
      <ScrollView className="panel pt-3">
        <View>
          {Array(4)
            .fill('')
            .map((_, index) => (
              <View className="my-1.5" key={index}>
                <SkeletonLoader className="h-[180px] mb-3" />
                <View className="flex-row gap-[3%]">
                  <View className="w-[10%]">
                    <SkeletonLoader className="h-10 w-10 !rounded-full" />
                  </View>
                  <View className="w-[87%]">
                    <SkeletonLoader className="h-10 w-full" />
                  </View>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    );
  }

  if (params?.id) {
    return (
      <SafeAreaView className="panel pt-3">
        {paramIdData?.length === 0 && !loading ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500">Maʼlumot bo'sh</Text>
            <IconMaterialCommunityIcons
              name="note-remove-outline"
              size={40}
              className="!text-gray-500"
            />
          </View>
        ) : (
          <FlatList
            data={paramIdData}
            renderItem={({item}) => <SingleCard item={item} />}
            keyExtractor={(item: SingleDataType) => item.id.toString()}
            onEndReached={fetchData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              paramIdData && paramIdData?.length > 0 && loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : null
            }
          />
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="panel pt-3">
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500 w-1/2 text-center">
          Bunday kategoriya maʼlumoti mavjud emas
        </Text>
        <IconMaterialCommunityIcons
          name="note-remove-outline"
          size={40}
          className="!text-gray-500"
        />
      </View>
    </SafeAreaView>
  );
};
