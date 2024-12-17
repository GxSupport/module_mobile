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

export interface RouteParams {
  id: string | number;
  isHome?: boolean;
  course_subject_id: string;
}

export interface ToastPropTypes {
  type?: 'error' | 'success' | 'warning' | 'info' | undefined;
  time?: number;
  message: string;
  isToast: boolean;
}

export interface DataType {
  id: number;
  course_subject_id: number | string;
  course: {
    image: {
      file_url: string;
    };
    user: {
      last_name: string;
      first_name: string;
    };
    id: number;
    name: string | null;
    average_rate: number | null;
    rate_count: number | null;
  };
  percent: number | string;
  user: {
    image: string;
  };
}

export interface SingleDataType {
  id: number;
  image: {
    file_url: string;
  };
  user: {
    last_name: string;
    first_name: string;
    image: string;
  };
  name: string | null;
  average_rate: number | null;
  rate_count: number | null;
  percent: number | string;
}

export interface CourseCardTypes {
  id: number;
  name: string;
  imageUrl: string | null;
  teaser: string;
  statusType?: string;
  isHome?: boolean;
  course_subject_id: string;
}

export interface CommentBoxPropTypes {
  user: {
    first_name: string;
    last_name: string;
  };
  comment: string;
  created_at: string;
}
