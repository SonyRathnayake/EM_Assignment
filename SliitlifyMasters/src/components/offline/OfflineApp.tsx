import React, { FC, Fragment } from 'react';
import { useIsConnected } from 'react-native-offline';
import { Text, View } from 'react-native';

const OfflineApp: FC = ({ children }) => {
  const isConnected = useIsConnected();

  if (isConnected) {
    return <Fragment>{children}</Fragment>;
  } else {
    return (
      <View>
        <Text>You are currently Offline. Please check your net!</Text>
      </View>
    );
  }
};

export default OfflineApp;
