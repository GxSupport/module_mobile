import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card} from '../../components/home/Card.tsx';

function Home() {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Card />
        <Card />
        <Card />
      </View>
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
});
