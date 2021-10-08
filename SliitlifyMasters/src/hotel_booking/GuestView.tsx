import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SliitListItem from './SliitListItem';
import { HOTEL_LIST } from './model/360_list_data';
import Config from '../Config';

interface Props {}

const GuestView: React.FC<Props> = () => {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}
          data={HOTEL_LIST}
          renderItem={(data) =>
            data.index > 0 ? (
              <SliitListItem {...{ data }} />
            ) : (
              <View style={styles.stickyHeaderContainer}>
                <Pressable
                  style={({ pressed }) => [
                    { opacity: !Config.isAndroid && pressed ? 0.6 : 1 },
                  ]}
                  onPress={() => {}}
                  android_ripple={{
                    color: 'grey',
                    radius: 18,
                    borderless: true,
                  }}
                >
                  <Icon
                    name="menu"
                    size={60}
                    color="black"
                    style={styles.menu}
                  />
                </Pressable>
                <Text style={styles.title}>360 Views of SLIIT Venues</Text>
              </View>
            )
          }
          keyExtractor={(item) => item.id.toString()}
          stickyHeaderIndices={[1]}
          nestedScrollEnabled
          ListHeaderComponent={() => (
            <View style={{ backgroundColor: 'rgb(242, 242, 242)' }}>
              <View style={styles.headerDetailContainer}></View>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  headerDetailContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerSectionContainer: { flex: 1, paddingHorizontal: 8, paddingVertical: 4 },
  stickyHeaderContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: 'WorkSans-Bold',
    paddingTop: 15,
    paddingLeft: 30,
  },
  menu: {
    fontSize: 20,
    fontFamily: 'WorkSans-Bold',
    paddingTop: 17,
  },
});

export default GuestView;
