import React from 'react';
import {ScrollView, View} from 'react-native';
import {Card} from '../../components/home/Card.tsx';

function Home() {
  return (
    <ScrollView className={'panel'}>
      <View>
        <Card />
        <Card />
        <Card />
      </View>
    </ScrollView>
  );
}

export default Home;
