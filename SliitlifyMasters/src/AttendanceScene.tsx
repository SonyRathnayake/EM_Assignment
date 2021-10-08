import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useID from './hooks/useID';
import Config from './Config';
import { readAttendancebyId } from './api/userApi';
import AttendanceSlider from './hotel_booking/AttendanceSlider';

interface Props {}

const FeedbackScene: React.FC<Props> = () => {
  const [attendance, setAattendance] = React.useState({
    msNo: '',
    module1: '',
    module2: '',
    module3: '',
    module4: '',
    module5: '',
    module6: '',
    modules: [],
    optional: '',
    attended: [],
    total: [],
  });
  const navigation = useNavigation<DrawerNavigationProp<{}>>();
  const { msNo } = useID();

  const fetchData = async () => {
    const data = await readAttendancebyId(msNo);
    setAattendance(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const marginTop = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  if (attendance.total.length > 0 && attendance.attended.length > 0) {
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
            onPress={() => navigation.openDrawer()}
            android_ripple={{ color: 'grey', radius: 20, borderless: true }}
          >
            <Icon name="menu" size={25} color="black" />
          </Pressable>
        </View>
        <View>
          <Text style={styles.title}>Attended Lecture Status</Text>
          <Text></Text>
          {attendance.total.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Text style={[styles2.sectionTitle]}>
                  {attendance.modules[index]}
                </Text>
                <Text style={[styles.subTitle, { paddingBottom: 26 }]}>
                  {item - attendance.attended[index]} Lectures Remaining
                </Text>
                <AttendanceSlider
                  total={item}
                  attended={attendance.attended[index]}
                />
              </React.Fragment>
            );
          })}
          <Text style={styles.Optiontitle}>Optional Modules</Text>
          <Text style={[styles.OptionalTitle]}>{attendance.optional}</Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <View style={{ flexDirection: 'row', padding: 8, paddingBottom: 0 }}>
          <Text style={styles.Loading}> Loading... </Text>
        </View>
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({
  image: {
    paddingHorizontal: 16,
    width: undefined,
    height: 320,
  },
  title: {
    fontSize: 20,
    fontFamily: 'WorkSans-Bold',
    textAlign: 'center',
    paddingTop: 8,
  },
  Optiontitle: {
    fontSize: 20,
    fontFamily: 'WorkSans-Bold',
    textAlign: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  Loading: {
    fontSize: 16,
    fontFamily: 'WorkSans-Bold',
    color: 'black',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 150,
    marginTop: 200,
  },
  subTitle: {
    fontSize: 12,
    fontFamily: 'WorkSans-Regular',
    color: 'black',
    paddingHorizontal: 16,
  },
  OptionalTitle: {
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    color: 'grey',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    marginTop: 16,
    marginHorizontal: 32,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 8,
    minHeight: 80,
    maxHeight: 160,
    paddingHorizontal: 10,
    padding: 16,
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    textAlignVertical: 'top',
  },
  button: {
    width: 120,
    height: 40,
    padding: 8,
    marginTop: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
    borderRadius: 4,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    padding: 4,
  },
});

const styles2 = StyleSheet.create({
  headerText: {
    fontSize: 22,
    fontFamily: 'WorkSans-Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  headerShadow: {
    height: Config.isAndroid ? 0.2 : 1,
    elevation: 4,
    backgroundColor: 'lightgrey',
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'lightgrey' },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'WorkSans-Regular',
    color: 'black',
    paddingHorizontal: 16,
  },
  optionalTitle: {
    fontSize: 18,
    fontFamily: 'WorkSans-Regular',
    color: 'black',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  checkBoxBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    padding: 8,
  },
  switchText: {
    flex: 1,
    fontFamily: 'WorkSans-Regular',
    alignSelf: 'center',
  },
  buttonContainer: {
    borderRadius: 24,
    margin: 16,
    marginTop: 8,
    elevation: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  button: {
    backgroundColor: '#54D3C2',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'WorkSans-Medium',
  },
});

export default FeedbackScene;
