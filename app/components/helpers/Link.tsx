import {Linking, Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface LinkProps {
  url: string;
  children?: React.ReactNode;
  className?: string;
}

const Link = ({url, children, className}: LinkProps) => {
  const handlePress = () => {
    if (url) {
      Linking.openURL(url).catch((err: any) =>
        console.error('Havolani ochishda xatolik:', err),
      );
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text className={`text-blue-400 underline ${className}`}>{children}</Text>
    </TouchableOpacity>
  );
};
export default Link;
