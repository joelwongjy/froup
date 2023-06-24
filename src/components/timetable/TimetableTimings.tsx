import { StyleSheet, Text, View } from 'react-native';
import { convertIndexToTime } from '@utils/time';
import { range } from 'lodash';

interface Props {
  startingIndex: number;
  endingIndex: number;
}

const styles = StyleSheet.create({
  timings: {
    flex: 1,
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
    color: '#aaa'
  }
});

const TimetableTimings = ({ startingIndex, endingIndex }: Props) => {
  const indices = range(startingIndex, endingIndex);

  return (
    <View style={styles.timings}>
      {indices.map((i) => {
        const time = convertIndexToTime(i);

        // Only mark even ticks
        if (i % 2 === 1) {
          return null;
        }

        return <Text key={time} style={styles.time}>{time}</Text>;
      })}
    </View>
  );
};

export default TimetableTimings;
