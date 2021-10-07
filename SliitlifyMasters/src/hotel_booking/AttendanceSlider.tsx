import { Slider } from '@miblanchard/react-native-slider';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
  total: number;
  attended: number;
}

const AttendanceSlider: React.FC<Props> = (props) => {
  const attended = props.attended;
  const tot = props.total;
  const barValue = attended == 0 ? 0 : (attended / tot) * 100;

  const [distValue, setDistValue] = useState(barValue);
  return (
    <Slider
      containerStyle={{ marginHorizontal: 16, marginBottom: 12 }}
      trackStyle={{ height: 6 }}
      thumbStyle={styles.thumbStyle}
      // renderThumbComponent={() => (
      //   <View style={styles.shadowBg}>
      //     <View style={styles.thumbStyle} />
      //   </View>
      // )}
      disabled
      value={distValue}
      step={1}
      minimumValue={0}
      maximumValue={100}
      onValueChange={(value) => setDistValue(value[0])}
      thumbTintColor="#54D3C2"
      minimumTrackTintColor="#54D3C2"
      maximumTrackTintColor="lightgrey"
      animateTransitions
      animationType="spring"
      renderAboveThumbComponent={() => (
        <Text style={[styles.thumbText, { right: distValue }]}>
          Attended {(attended / tot) * 100}%
        </Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  thumbStyle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    elevation: 8,
    // backgroundColor: '#54D3C2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  thumbText: { width: 170, textAlign: 'center' },
});

export default AttendanceSlider;
