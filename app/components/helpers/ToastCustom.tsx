import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {ToastPropTypes} from '../../types/Types.ts';

interface ToastTypes {
  setToastcustom: (toast: ToastPropTypes) => void;
  toastCustom: ToastPropTypes;
}

function ToastCustom({toastCustom, setToastcustom}: ToastTypes) {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setToastcustom({...toastCustom, isToast: false});
    }, toastCustom.time);
    return () => {
      clearTimeout(timeOut);
    };
  }, [toastCustom, setToastcustom]);

  const roleColor = (value: string) => {
    switch (value) {
      case 'success':
        return 'bg-green-400';
      case 'warning':
        return 'bg-yellow-400';
      case 'error':
        return 'bg-red-400';
      case 'info':
        return 'bg-blue-400';
      default:
        return 'bg-red-400';
    }
  };

  return (
    <View>
      {toastCustom.isToast && (
        <View
          className={`bg-red-400 w-full py-3 absolute top-0 z-20 ${roleColor(
            toastCustom?.type || 'error',
          )}`}>
          <Text className={'text-center text-white'}>
            {toastCustom.message}
          </Text>
        </View>
      )}
    </View>
  );
}

export default ToastCustom;
