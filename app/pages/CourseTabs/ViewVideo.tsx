import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {RouteParams} from '../../types/Types.ts';
import {RouteProp, useRoute} from '@react-navigation/native';
import api from '../../config/api.ts';

type DirectionRouteProp = RouteProp<{params: {params: RouteParams}}, 'params'>;

function ViewVideo() {
  const {params} = useRoute<DirectionRouteProp>();

  const [videoUrl, setVideoUrl] = useState<string>('');
  const getVideoUrlHome = async () => {
    try {
      const res = await api(`/api/nurse/subject/item/${params.params.id}`);
      setVideoUrl(res.data?.content?.media?.[1]?.file_url);
    } catch (error) {
      console.error(error);
    }
  };
  const getVideoUrl = async () => {
    try {
      const res = await api(`/api/nurse/course/subject/${params.params.id}`);
      setVideoUrl(res.data.media?.[1]?.file_url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (params.params.isHome) {
        await getVideoUrlHome();
      } else {
        await getVideoUrl();
      }
    })();
  }, []);

  return (
    <SafeAreaView className={'panel'}>
      <Text>
        {' '}
        View Video {params.params.id} {videoUrl}
      </Text>
    </SafeAreaView>
  );
}

export default ViewVideo;
