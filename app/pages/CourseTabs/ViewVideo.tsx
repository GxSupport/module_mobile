import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {RouteParams} from '../../types/Types.ts';
import {RouteProp, useRoute} from '@react-navigation/native';
import api from '../../config/api.ts';
import VideoPlayer, {type VideoPlayerRef} from 'react-native-video-player';
import {BaseUrl} from '../../constants/urls.ts';

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
      const res = await api(
        `/api/nurse/course/subject/${params.params.course_subject_id}`,
      );
      setVideoUrl(res.data.media);
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
  const playerRef = useRef<VideoPlayerRef>(null);
  return (
    <SafeAreaView className={'panel'}>
      {videoUrl ? (
        <VideoPlayer
          ref={playerRef}
          endWithThumbnail
          source={{
            uri: BaseUrl + videoUrl,
          }}
          onError={e => console.log(e)}
          showDuration={true}
        />
      ) : (
        <View className={'flex-1 flex justify-center items-center'}>
          <Text className={'text-center text-[16px]'}>
            Ushbu mavzuda video fayl mavjud emas!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default ViewVideo;
