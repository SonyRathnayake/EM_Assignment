import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../res';
import Config from './Config';
import { showToast } from './util/action';
import useName from './hooks/useName';
import useID from './hooks/useID';

interface DrawerItemProps {
  label: string;
  icon: any;
  isAssetIcon?: boolean;
  translateX: Animated.Adaptable<number>;
  onpress?: () => void | null | undefined;
}

const DrawerItemRow: React.FC<
  DrawerItemProps & DrawerContentComponentProps<DrawerContentOptions>
> = (props) => {
  const window = useWindowDimensions();
  const rowWidth = (window.width * 0.75 * 80) / 100;
  const {
    state,
    label,
    icon,
    isAssetIcon = false,
    translateX,
    onpress,
  } = props;
  const { routes, index } = state;
  const focused = getActiveRouteState(routes, index, label);

  const tintColor = focused ? props.activeBackgroundColor : 'black';
  return (
    <Pressable
      style={styles.drawerRowStyle}
      android_ripple={{ color: 'lightgrey' }}
      onPress={onpress}
    >
      <Animated.View
        style={[
          styles.drawerRowbackViewStyle,
          {
            width: rowWidth,
            backgroundColor: focused
              ? props.activeBackgroundColor
              : props.inactiveBackgroundColor,
            transform: [{ translateX }],
          },
        ]}
      />
      <View style={styles.drawerRowContentContainer}>
        {isAssetIcon ? (
          <Image
            source={icon}
            style={{ width: 24, height: 24, tintColor }}
            resizeMode="contain"
          />
        ) : (
          <Icon name={icon} size={24} color={tintColor} />
        )}
        <Text
          numberOfLines={1}
          style={[styles.drawerRowTextStyle, { color: tintColor }]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

const getActiveRouteState = (routes: any[], index: number, name: string) =>
  routes[index].name.toLowerCase().indexOf(name.toLowerCase()) >= 0;

const DrawerContent: React.FC<
  DrawerContentComponentProps<DrawerContentOptions>
> = (props) => {
  const window = useWindowDimensions();
  const { name } = useName();
  const { msNo } = useID();
  const rowWidth = (window.width * 0.75 * 80) / 100;
  const rotate = Animated.interpolate(props.progress, {
    inputRange: [0, 1],
    outputRange: [0.3, 0],
  });
  const scale = Animated.interpolate(props.progress, {
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });
  const translateX = Animated.interpolate(props.progress, {
    inputRange: [0, 1],
    outputRange: [-rowWidth, 0],
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16, marginTop: 30 }}>
        <Animated.View
          style={[
            styles.drawerAvatarStyle,
            styles.avatarShadow,
            { transform: [{ rotate, scale }] },
          ]}
        >
          <Animated.Image
            style={[
              styles.drawerAvatarStyle,
              { transform: [{ rotate, scale }] },
            ]}
            source={
              name
                ? {
                    uri: 'https://firebasestorage.googleapis.com/v0/b/emassignment-236c8.appspot.com/o/user1.png?alt=media&token=c6f1ba91-4b29-4aaf-b0ec-905982df66ee',
                  }
                : AppImages.userImage
            }
            // source={AppImages.userImage}
          />
        </Animated.View>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userID}>{msNo}</Text>
      </View>
      <View style={styles.divider} />
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flexGrow: 1, paddingTop: 0 }}
      >
        <DrawerItemRow
          label="Courseweb"
          icon="home"
          {...{ ...props, translateX }}
          onpress={() => props.navigation.navigate('Home')}
        />
        <DrawerItemRow
          label="View TimeTable"
          icon={AppImages.calander_icon}
          isAssetIcon
          {...{ ...props, translateX }}
          onpress={() => props.navigation.navigate('Help')}
        />
        <DrawerItemRow
          label="Feedback "
          icon="help"
          {...{ ...props, translateX }}
          onpress={() => props.navigation.navigate('Feedback')}
        />
        <DrawerItemRow
          label="View Profile"
          icon="info"
          {...{ ...props, translateX }}
          onpress={() => props.navigation.navigate('Profile')}
        />
        <DrawerItemRow
          label="Mark Attendance"
          icon={AppImages.qr_icon}
          isAssetIcon
          {...{ ...props, translateX }}
          onpress={() => props.navigation.navigate('QR')}
        />
        <DrawerItemRow
          label="View Attendance"
          icon={AppImages.view_icon}
          isAssetIcon
          {...{ ...props, translateX }}
          onpress={() => props.navigation.navigate('Attendance')}
        />
        <DrawerItemRow
          label="View 360 Classrooms"
          icon={AppImages.view_icon}
          isAssetIcon
          {...{ ...props, translateX }}
          onpress={() => props.navigation.navigate('View')}
        />
        <DrawerItemRow
          label="Sliit Portal"
          icon={AppImages.student_icon}
          isAssetIcon
          {...{ ...props, translateX }}
          onpress={() => props.navigation.navigate('Marks')}
        />
      </DrawerContentScrollView>

      <Pressable
        style={({ pressed }) => [
          styles.signOutBtnStyle,
          { opacity: !Config.isAndroid && pressed ? 0.4 : 1 },
        ]}
        //onPress={() => props.navigation.navigate('Login')}
        onPressOut={() => showToast('Signed out not Implemented yet')}
        //onPressOut={() => }
        android_ripple={{ color: 'lightgrey' }}
      >
        <Text
          style={{ flex: 1, fontSize: 16, fontFamily: 'WorkSans-SemiBold' }}
        >
          Sign Out
        </Text>
        <Icon name="power-settings-new" size={20} color="red" />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userName: {
    fontSize: 18,
    color: 'grey',
    fontFamily: 'WorkSans-SemiBold',
    paddingTop: 4,
  },
  userID: {
    fontSize: 18,
    color: 'grey',
    fontFamily: 'WorkSans',
    paddingTop: 4,
  },
  drawerRowStyle: {
    marginHorizontal: 0,
    paddingVertical: 8,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  drawerRowbackViewStyle: {
    opacity: 0.3,
    height: 48,
    borderRadius: 24,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
  },
  drawerRowTextStyle: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
  drawerRowContentContainer: {
    flexDirection: 'row',
    padding: 8,
    paddingHorizontal: 16,
    position: 'absolute',
  },
  drawerAvatarStyle: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarShadow: {
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
  },
  divider: {
    backgroundColor: 'darkgrey',
    height: StyleSheet.hairlineWidth,
  },
  signOutBtnStyle: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'darkgrey',
  },
});

export default DrawerContent;
