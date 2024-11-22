import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/Colors.ts';
import Icon from 'react-native-vector-icons/Ionicons';

const cardBg = require('../../assets/img/cardBg.png');
const profileImg = require('../../assets/img/profile.png');
export const Card = () => {
  return (
    <View>
      <View style={styles.card}>
        <Image source={cardBg} style={styles.img} />
        <View style={styles.cardDifferent}>
          {5 > 4 ? (
            <Text> 41% </Text>
          ) : (
            <Icon
              name={'checkmark-done-outline'}
              color={'blue'}
              size={20}
             />
          )}
        </View>
      </View>
      <View style={styles.cardFlex}>
        <Image source={profileImg} style={styles.profileImg} />
        <View>
          <Text style={styles.cardTitle}>
            Hamshiraning shahslar aro kommunikativ munosabatlari
          </Text>
          <View style={styles.cardInfo}>
            <Text style={styles.infoText}>Xasanov Davron</Text>
            <Text style={[styles.infoText, styles.border]}>
              3.9 o’rtacha reyting
            </Text>
            <Text style={styles.infoText}>29 107 baholovchilar soni</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  cardDifferent: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  profileImg: {
    width: 35,
    height: 35,
    objectFit: 'cover',
  },
  cardFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10,
    marginVertical: 5,
  },
  cardTitle: {
    color: COLORS.colorParagreph,
    fontWeight: 600,
  },
  cardInfo: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 10,
    color: '#10267BCF',
  },
  border: {
    borderStyle: 'solid',
    borderColor: '#10267BCF',
    borderWidth: 1,
    paddingHorizontal: 5,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});
