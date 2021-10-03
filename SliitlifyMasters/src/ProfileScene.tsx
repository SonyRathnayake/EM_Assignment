import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../res';
import Config from './Config';

interface Props {}
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const InviteFriendScene: React.FC<Props> = () => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>();

  const marginTop = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  return (
    <SafeAreaView style={{ flex: 1, marginTop }}>
      <View style={{ flexDirection: 'row', padding: 8, paddingBottom: 0 }}>
        <Pressable
          style={({ pressed }) => [
            {
              padding: 8,
              paddingBottom: 0,
              opacity: !Config.isAndroid && pressed ? 0.4 : 1,
            },
          ]}
          onPress={() => navigation.toggleDrawer()}
          android_ripple={{ color: 'grey', radius: 20, borderless: true }}
        >
          <Icon name="menu" size={25} color="black" />
        </Pressable>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.Image
          style={[styles.drawerAvatarStyle]}
          source={AppImages.userImage}
        />

        <Text style={styles.title}>Sonal Rathnayake</Text>
        <Text style={styles.subTitle}>ms21911958@mysliit.lk</Text>
      </View>
      <View style={styles.cardView}>
        <Text style={styles.title}>Student Number</Text>
        <Text style={styles.subTitle}>MS21911958</Text>
        <Text />
        <Text style={styles.title}>Masters Programme</Text>
        <Text style={styles.subTitle}>
          MSc. Enterprise Application Developments
        </Text>
        <Text />
        <Text style={styles.title}>Cumulative GPA</Text>
        <Text style={styles.subTitle}>3.6</Text>
        <Text />
        <Text style={styles.title}>Current Year / Current Semester</Text>
        <Text style={styles.subTitle}>1/2</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    paddingHorizontal: 16,
    width: undefined,
    height: 320,
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
  button: {
    flexDirection: 'row',
    width: 140,
    height: 40,
    padding: 8,
    backgroundColor: 'dodgerblue',
    borderRadius: 4,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerAvatarStyle: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    padding: 4,
  },
  cardView: {
    width: deviceWidth - 32,
    height: deviceHeight - 300,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    padding: 25,
    marginLeft: 5,
    marginRight: 5,
    marginTop: '10%',
    marginBottom: '3%',
    backgroundColor: '#ccccb3',
  },
});

export default InviteFriendScene;
