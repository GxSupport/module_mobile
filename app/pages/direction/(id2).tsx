import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome.js';
import {CourseCardTypes, RouteParams} from '../../types/Types.ts';
import api from '../../config/api.ts';
import SkeletonLoader from '../../components/helpers/Skeleton.tsx';
import CourseCard from '../../components/choosingDirection/CourseCard.tsx';

type DirectionRouteProp = RouteProp<{params: RouteParams}, 'params'>;

export const NourseCourseListCategoryID: React.FC = () => {
  const {params} = useRoute<DirectionRouteProp>();
  const [paramIdData, setParamIdData] = useState<CourseCardTypes[] | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const fetchDataHomeCourse = async () => {
    setLoading(true);
    try {
      const result = await api({
        method: 'GET',
        url: `/api/nurse/subject/mycourse/${params.id}`,
      });
      const resData = result?.data.map((item: any) => {
        return {
          id: item.id,
          imageUrl: item.image?.file_url,
          name: item.subject.name,
          teaser: item.subject.teaser,
          statusType: item?.status,
          isHome: params.isHome,
          course_subject_id: item?.course_subject_id,
        };
      });
      setParamIdData(resData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchDataCourse = async () => {
    setLoading(true);
    try {
      const result = await api({
        method: 'GET',
        url: `/api/nurse/course/list/${params.id}`,
      });
      const resData =
        result?.data?.data &&
        result?.data?.data.map((item: any) => {
          return {
            id: item.id,
            imageUrl: item.image?.file_url,
            name: item.name,
            teaser: item.teaser,
            statusType: 0,
            isHome: params.isHome,
            course_subject_id: item?.image?.course_subject_id,
          };
        });
      setParamIdData(resData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (params?.id && params?.isHome) {
        await fetchDataHomeCourse();
      } else if (params?.id) {
        await fetchDataCourse();
      }
    })();
  }, []);

  if (!paramIdData && loading) {
    return (
      <ScrollView className={'panel pt-3'}>
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

  if (paramIdData?.length === 0 && !loading) {
    return (
      <View className={'panel pt-3'}>
        <View className="flex-1 justify-center items-center">
          <Text className={'text-gray-500'}> Malumot bo'sh </Text>
          <IconMaterialCommunityIcons
            name={'note-remove-outline'}
            size={40}
            className={'!text-gray-500'}
          />
        </View>
      </View>
    );
  }

  if (params?.id) {
    return (
      <SafeAreaView className="flex-1 relative pt-3 bg-white">
        <ScrollView contentContainerStyle={{flexGrow: 1}} className={'px-3'}>
          {paramIdData?.map((item: CourseCardTypes) => (
            <CourseCard item={item} key={item?.id} />
          ))}
        </ScrollView>
        <View
          className={
            'w-full absolute bottom-[90px] left-0 right-0 flex items-center justify-center'
          }>
          <IconFontAwesome
            name={'angle-double-down'}
            size={20}
            className={
              'h-8 w-8 pt-1 text-center border border-colorParagreph !text-colorParagreph rounded-full'
            }
          />
        </View>
        <View className={'w-full shadow h-[100px] pt-2 rounded-t-2xl'}>
          <TouchableOpacity
            className={'bg-colorSpecial w-[60%] m-auto rounded-xl'}>
            <View className={'flex-row items-center justify-center py-4 gap-2'}>
              <View>
                <IconFontAwesome
                  name={'plus'}
                  className={'!text-white mt-1'}
                  size={16}
                />
              </View>
              <Text className={'text-white text-[16px] font-semibold'}>
                Kursni qo’shish
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className={'panel'}>
      <View className="flex-1 justify-center items-center">
        <Text className={'text-gray-500 w-1/2 text-center '}>
          Bunday categoriya malumoti mavjud emas
        </Text>
        <IconMaterialCommunityIcons
          name={'note-remove-outline'}
          size={40}
          className={'!text-gray-500'}
        />
      </View>
    </SafeAreaView>
  );
};
