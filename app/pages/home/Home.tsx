import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import api from '../../config/api';
import {Card} from '../../components/home/Card.tsx';

interface Course {
  course_subject_id: string;
}

function Home() {
  const [data, setData] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const getMyCourseList = async (page: number): Promise<{data: Course[]}> => {
    try {
      const res = await api({
        method: 'GET',
        url: `/api/nurse/course/list/${page}`,
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
        const res = await getMyCourseList(page);
        setData(prevData => [...prevData, ...res.data]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

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
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => {
            if (!loading) {
              setPage(prevPage => prevPage + 1);
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
