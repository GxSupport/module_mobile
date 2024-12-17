import React, {useState} from 'react';
import {Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import ViewPdf from '../pages/CourseTabs/ViewPDF.tsx';
import ViewVideo from '../pages/CourseTabs/ViewVideo.tsx';
import {CustomTabComponent} from '../components/helpers/TabBarCustom.tsx';
import ViewComment from '../pages/CourseTabs/ViewComment.tsx';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

export default function CourseTabs() {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);

  const renderScene = SceneMap({
    view_pdf: () => <ViewPdf />,
    view_video: () => <ViewVideo />,
    view_comment: () => <ViewComment />,
  });

  const routes = [
    {key: 'view_pdf', title: 'ViewPdf'},
    {key: 'view_video', title: 'ViewVideo'},
    {key: 'view_comment', title: 'ViewComment'},
  ];

  return (
    <View className={'flex-1'}>
      <View className={'flex flex-row py-5 gap-4 items-center bg-white'}>
        <TouchableOpacity
          className={'ml-3'}
          onPress={() => {
            navigation.goBack();
          }}>
          <Feather name={'arrow-left'} size={22} />
        </TouchableOpacity>
        <Text
          className={
            'text-center w-10/12 text-[#00224D] font-bold text-[18px] break-words'
          }
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          O’zbekistonda tez tibbiy yordam tizimini
        </Text>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => (
          <CustomTabComponent {...props} setIndex={setIndex} />
        )}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
}
