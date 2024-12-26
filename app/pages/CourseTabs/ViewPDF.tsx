import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
} from 'react-native';
import Pdf from 'react-native-pdf';
import api from '../../config/api.ts';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RouteParams} from '../../types/Types.ts';
import {BaseUrl} from '../../constants/urls.ts';

type DirectionRouteProp = RouteProp<{params: {params: RouteParams}}, 'params'>;

export default function PDFExample() {
  const {params} = useRoute<DirectionRouteProp>();
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const source = {
    uri: BaseUrl + pdfUrl,
    cache: false,
  };

  const getPdfUrlHome = async () => {
    setLoading(true);
    try {
      const res = await api(`/api/nurse/subject/item/${params.params.id}`);
      setPdfUrl(res.data?.content?.media?.[0]?.file_url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getPdfUrl = async () => {
    setLoading(true);
    try {
      const res = await api(
        `/api/nurse/course/subject/${params.params.course_subject_id}`,
      );
      setPdfUrl(res.data.media?.[0]?.file_url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (params.params.isHome) {
        await getPdfUrlHome();
      } else {
        await getPdfUrl();
      }
    })();
  }, []);

  if (loading) {
    return (
      <View className={'panel flex-1 justify-center items-center'}>
        {/*<Text className={'text-center '} >Loading...</Text>*/}
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View className={'flex-1 justify-start items-center panel p-0 pb-20'}>
      <Pdf
        trustAllCerts={false}
        source={source}
        style={styles.pdf}
        // onPageChanged={(page,numberOfPages) => {
        //   console.log(`Current page: ${page}`);
        // }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
