import React, { FC, Fragment } from 'react';
import { useIsConnected } from 'react-native-offline';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OfflineApp: FC = ({ children }) => {
  const isConnected = useIsConnected();

  if (isConnected) {
    return <Fragment>{children}</Fragment>;
  } else {
    return (
      <View>
        <Icon name={'wifi-off'} size={50} color="black" style={styles.Icon} />
        <Text style={styles.Loading}>
          You are currently Offline. Please check your Internet!
        </Text>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  Loading: {
    fontSize: 16,
    fontFamily: 'WorkSans-Bold',
    color: 'black',
    alignSelf: 'center',
    paddingHorizontal: 100,
  },
  Icon: {
    marginTop: 150,
    alignSelf: 'center',
  },
});

export default OfflineApp;
