import {Text} from 'react-native';
import React from 'react';

interface HeaderTitleProps {
  title: string;
  className?: string;
}

const HeaderTitle = ({title, className}: HeaderTitleProps) => (
  <Text className={`font-bold text-center text-[18px] break-words ${className}`}>
    {title}
  </Text>
);
export {HeaderTitle};
