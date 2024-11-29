import React from 'react';
import {View} from 'react-native';

const SkeletonLoader = ({className}: {className?: string}) => {
  return (
    <View role="status" className="w-full animate-pulse">
      <View
        className={`w-full bg-gray-300 rounded-lg dark:bg-gray-700 ${className}`}
      />
    </View>
  );
};

export default SkeletonLoader;
