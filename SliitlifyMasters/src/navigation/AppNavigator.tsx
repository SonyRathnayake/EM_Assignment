import React from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import QRScene from '../pages/QrScene';
import ResultScene from '../pages/ResultScene';
import ProfileScene from '../pages/ProfileScene';
import AttendanceScene from '../pages/AttendanceScene';
import GuestView from '../components/guest/GuestView';
import { HomeScene, DrawerContent, Timetable, FeedbackScene } from '../pages';
interface Props {
  setUser: Function;
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigator: React.FC = () => {
  const window = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerContentOptions={{ activeBackgroundColor: '#5cbbff' }}
      drawerContent={(props) => <DrawerContent {...props} />}
      //drawerContent={(props) => <React.Fragment />}
      //disable
      drawerType="back"
      overlayColor="transparent"
      drawerStyle={{
        width: window.width * 0.75,
        backgroundColor: '#FFFEFEFE',
      }}
      sceneContainerStyle={styles.drawerSceneContainer}
      edgeWidth={window.width}

      //edgeWidth={-100}
    >
      <Drawer.Screen name="Home" component={HomeScene} />
      <Drawer.Screen name="Help" component={Timetable} />
      <Drawer.Screen name="Feedback" component={FeedbackScene} />
      <Drawer.Screen name="Profile" component={ProfileScene} />
      <Drawer.Screen name="QR" component={QRScene} />
      <Drawer.Screen name="View" component={GuestView} />
      <Drawer.Screen name="Attendance" component={AttendanceScene} />
      <Drawer.Screen name="Marks" component={ResultScene} />
    </Drawer.Navigator>
  );
};
const AppNavigator: React.FC<Props> = (props) => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />

      <Stack.Navigator screenOptions={{ headerBackTitle: '', title: '' }}>
        <Stack.Screen
          name="MainDrawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  drawerSceneContainer: {
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
});
export default AppNavigator;
