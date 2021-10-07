/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Config from './Config';
import { WebView } from 'react-native-webview';
interface Props {}

interface ListItemProps {
  data: ListRenderItemInfo<{ name: string; background: any }>;
  isGrid: boolean;
  onScreenClicked: () => void;
}
const ListItem: React.FC<ListItemProps> = ({
  data,
  isGrid,
  onScreenClicked,
}) => {
  const { index, item } = data;
  const translateY = useRef<Animated.Value>(new Animated.Value(50)).current;
  const opacity = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        delay: index * (1000 / 3),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        delay: index * (1000 / 3),
        useNativeDriver: true,
      }),
    ]).start();
  });

  if (item.name.length === 0) {
    return null;
  }
  return (
    <Animated.View
      style={{
        margin: 6,
        height: isGrid ? 120 : 250,
        opacity,
        transform: [{ translateY }],
      }}
    >
      <Image
        style={{ flex: 1, aspectRatio: 1.5, borderRadius: 4 }}
        source={item.background}
        resizeMode="cover"
      />

      <Pressable
        style={({ pressed }) => [
          {
            flex: 1,
            borderRadius: 4,
            backgroundColor: 'rgba(128,128,128,0.1)',
            ...StyleSheet.absoluteFillObject,
            opacity: !Config.isAndroid && pressed ? 0.6 : 1,
          },
        ]}
        android_ripple={{ color: 'rgba(128,128,128,0.3)' }}
        onPress={onScreenClicked}
      />
    </Animated.View>
  );
};

const HomeScene: React.FC<Props> = () => {
  const headerHeight = useHeaderHeight();
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
            name={isGrid ? 'help' : 'favorite-border'}
            size={25}
            color="black"
          />
        </Pressable>
      </View>
      <WebView
        source={{ uri: 'https://courseweb.sliit.lk/' }}
        injectedJavaScript={INJECTEDJAVASCRIPT}
        style={{ flex: 1 }}
      />
      {/* <FlatList
        key={isGrid ? 'G' : 'L'}
        style={{ marginTop: headerHeight, marginHorizontal: 6 }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={DEMOS}
        keyExtractor={(item) => item.name}
        numColumns={isGrid ? 2 : 1}
        renderItem={(data) => (
          <ListItem
            data={data}
            isGrid={isGrid}
            onScreenClicked={() => {
              if (data.item.screenName) {
                navigation.navigate(data.item.screenName);
              } else {
                showToast('Coming soon...');
              }
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
      /> */}
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
