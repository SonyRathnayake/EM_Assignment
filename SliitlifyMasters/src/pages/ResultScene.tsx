import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Pressable,
  Image,
  Animated,
  ListRenderItemInfo,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Config from '../config/Config';
interface Props {}

interface ListItemProps {
  data: ListRenderItemInfo<{ name: string; background: any }>;
  isGrid: boolean;
  onScreenClicked: () => void;
}

const HomeScene: React.FC<Props> = () => {
  const navigation = useNavigation<any>();
  const [isGrid, setGrid] = useState(true);
  const [isToggle, setIsToggle] = React.useState(false);

  const marginTop = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  const INJECTEDJAVASCRIPT = "document.body.style.userSelect = 'none'";
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop,
        backgroundColor: `${isToggle ? 'grey' : 'white'}`,
      }}
    >
      <View style={{ flexDirection: 'row', padding: 8 }}>
        <Pressable
          style={({ pressed }) => [
            { padding: 8, opacity: !Config.isAndroid && pressed ? 0.6 : 1 },
          ]}
          onPress={() => navigation.toggleDrawer()}
          android_ripple={{ color: 'grey', radius: 20, borderless: true }}
        >
          <Icon name="menu" size={25} color="black" />
        </Pressable>
        <Text style={isToggle ? styles.headerText2 : styles.headerText}>
          Sliitlify Masters
        </Text>
        <Pressable
          style={({ pressed }) => [
            { padding: 8, opacity: !Config.isAndroid && pressed ? 0.6 : 1 },
          ]}
          onPress={() => {
            setGrid(!isGrid);
            setIsToggle(!isToggle);
          }}
          android_ripple={{ color: 'grey', radius: 20, borderless: true }}
        >
          <Icon
            name={isGrid ? 'wb-sunny' : 'nightlight-round'}
            size={25}
            color="black"
          />
        </Pressable>
      </View>
      <WebView
        source={{ uri: 'http://student.sliit.lk/' }}
        injectedJavaScript={INJECTEDJAVASCRIPT}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    flex: 1,
    fontSize: 22,
    fontFamily: 'WorkSans-Bold',
    textAlign: 'center',
    color: 'black',
    textAlignVertical: 'center',
  },
  headerText2: {
    flex: 1,
    fontSize: 22,
    fontFamily: 'WorkSans-Bold',
    textAlign: 'center',
    color: 'white',
    textAlignVertical: 'center',
  },
});

export default HomeScene;
