import {ImageSourcePropType} from 'react-native';
import React from 'react';

export interface DirectonBoxTypes {
  id: number;
  name: string;
  randomImgUrl?: ImageSourcePropType;
}

export interface TouchableType {
  className?: string;
  loading?: boolean;
  onPress?: () => void;
  titleStyle?: string;
  children: React.ReactNode;
}
