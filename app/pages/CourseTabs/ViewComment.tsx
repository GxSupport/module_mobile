import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import api from '../../config/api.ts';
import {RouteProp, useRoute} from '@react-navigation/native';
import {CommentBoxPropTypes, RouteParams} from '../../types/Types.ts';
import Feather from 'react-native-vector-icons/Feather';
import {FormatTime, getColor} from '../../helpers/Formats.ts';

type DirectionRouteProp = RouteProp<{params: {params: RouteParams}}, 'params'>;

function ViewComment() {
  const {params} = useRoute<DirectionRouteProp>();
  const [comments, setComments] = useState<CommentBoxPropTypes[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isCommentLoading, setIsCommentLoading] = useState<boolean>(false);
  const getComments = async () => {
    if (
      isCommentLoading ||
      (comments && comments?.length >= total && total > 0)
    ) {
      return;
    }
    setIsCommentLoading(true);
    try {
      setIsCommentLoading(true);
      const res = await api({
        url: `/api/receive-comment?course_subjects_id=${params.params.course_subject_id}`,
        method: 'post',
        params: {
          page: page,
          per_page: 10,
        },
      });
      setComments(prevData => [
        ...(prevData || []),
        ...(res?.data?.data || []),
      ]);
      setTotal(res.data.total);
      setPage((prevPage: number) => prevPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCommentLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getComments();
    })();
  }, []);

  return (
    <View className={'panel pb-24'}>
      <FlatList
        data={comments}
        renderItem={({
          item,
          index,
        }: {
          item: CommentBoxPropTypes;
          index: number;
        }) => <CommentBox item={item} index={index} />}
        keyExtractor={(_, index: number) => index.toString()}
        onEndReached={getComments}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isCommentLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
      />
      <View
        className={
          'flex-row items-center gap-2 bg-colorBoxWhite px-4 py-1 mt-1 rounded-xl'
        }>
        <TextInput placeholder={'Xabar yuborish...'} className={'w-11/12'} />
        <TouchableOpacity>
          <Feather name={'send'} size={22} className={'!text-green-500'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ViewComment;

const CommentBox = ({
  item,
  index,
}: {
  item: CommentBoxPropTypes;
  index: number;
}) => {
  return (
    <View className={'flex flex-row items-end gap-5 mb-4'}>
      <View
        className={`w-10 h-10 flex-row items-center rounded-full justify-center bg-${getColor(
          index,
        )}`}>
        <Text className={'text-white'}>
          {item?.user?.first_name?.slice(0, 1)}
          {item?.user?.last_name?.slice(0, 1)}
        </Text>
      </View>
      <View className={'w-10/12 bg-colorBoxWhite p-2 rounded-xl'}>
        <Text className={`mb-1 font-bold text-${getColor(index)}`}>
          {item?.user?.first_name} {item.user.last_name}
        </Text>
        <Text>{item?.comment} </Text>
        <View className={'flex-row justify-end'}>
          <Text className={' text-[10px]'}>{FormatTime(item?.created_at)}</Text>
        </View>
      </View>
    </View>
  );
};
