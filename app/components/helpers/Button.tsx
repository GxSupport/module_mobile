import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import {TouchableType} from '../../types/Types.ts';

function Button({className, children, loading, onPress}: TouchableType) {
  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onPress}
      className={`${className}`}>
      {loading ? (
        <ActivityIndicator className={'text-white'} size={'small'} />
      ) : (
        <Text className={'text-white text-center text-[20px] font-bold'}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default Button;
