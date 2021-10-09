import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { AppImages } from '../../res';
import { TextInput } from 'react-native-gesture-handler';
import Config from '../config/Config';
import { readFirestoreUserId } from '../api/userApi';
import { showToast } from '../util/action';
import useName from '../hooks/useName';
import useID from '../hooks/useID';
import { useIsConnected } from 'react-native-offline';

interface Props {
  setUser: Function;
}

const LoginScene: React.FC<Props> = (props) => {
  const [ms, onChangeMs] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const { setName } = useName();
  const { setMsNo } = useID();
  const isConnected = useIsConnected();
  const login = async () => {
    if (isConnected) {
      if (ms !== '' && password !== '') {
        const data = await readFirestoreUserId(ms);
        if (data.name != null && data.NIC == password) {
          props.setUser(data);
          setName(data.name);
          setMsNo(ms);
          showToast('Welcome back ' + data.name + '!');
        } else {
          showToast('Invalid Username/Password!');
        }
      } else {
        showToast('Please enter your credentials');
      }
    } else {
      showToast('Please check your Internet Connection');
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="position">
        <Image
          style={{
            marginHorizontal: 155,
            marginTop: 90,
            position: 'relative',
            height: 125,
            width: 100,
          }}
          source={AppImages.sliitLogo}
          resizeMode="cover"
        />

        <Text style={styles.title}>Login to your Account</Text>
        <Text style={styles.subTitle}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your MS Number"
          onChangeText={onChangeMs}
          value={ms}
        />
        <Text style={styles.subTitle}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your NIC Number"
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { opacity: !Config.isAndroid && pressed ? 0.4 : 1 },
          ]}
          onPress={() => login()}
          android_ripple={{ color: 'grey' }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </KeyboardAvoidingView>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.85 : 1 },
        ]}
        android_ripple={{ color: 'white' }}
      >
        <Text style={styles.buttonGuest}>Guest Login</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'WorkSans-Bold',
    textAlign: 'center',
    paddingTop: 8,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    textAlign: 'center',
    paddingTop: 16,
  },
  input: {
    marginTop: 16,
    marginHorizontal: 32,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 8,
    paddingHorizontal: 10,
    padding: 16,
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    textAlignVertical: 'top',
  },
  button: {
    width: 200,
    height: 40,
    padding: 8,
    marginTop: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
    borderRadius: 4,
    elevation: 8,
  },
  buttonGuest: {
    width: 200,
    height: 40,
    padding: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 4,
    elevation: 10,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    padding: 4,
  },
});

export default LoginScene;
