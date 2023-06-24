import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ModuleCode } from '@typings/modules';
import { HoverLesson, TimetableDayArrangement } from '@typings/timetables';
import { TimePeriod } from '@typings/venues';
import { OnHoverCell, OnModifyCell } from '@typings/views';
import { convertTimeToIndex } from '@utils/time';

import TimetableRow from './TimetableRow';

interface Props {
  day: string;
  dayLessonRows: TimetableDayArrangement;
  showTitle: boolean;
  startingIndex: number;
  endingIndex: number;
  isCurrentDay: boolean;
  currentTimeIndicatorStyle: React.CSSProperties;
  hoverLesson: HoverLesson | null;
  onCellHover: OnHoverCell;
  onModifyCell?: OnModifyCell;
  highlightPeriod?: TimePeriod;
  customisedModules?: ModuleCode[];
}

const styles = StyleSheet.create({
  container: {
    width: 128,
    flex: 1,
    flexDirection: 'column',
    borderLeftColor: '#ECEBF2',
    borderLeftWidth: 1,
  },
  timetableHeader: {
    paddingTop: 16,
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
  },
});

// Height of timetable per hour in vertical mode
const VERTICAL_HEIGHT = 50;

function calculateLessonStyle(
  period: TimePeriod,
  startingIndex: number,
  endingIndex: number,
): React.CSSProperties {
  const totalCols = endingIndex - startingIndex;

  const startIndex = convertTimeToIndex(period.startTime);
  const endIndex = convertTimeToIndex(period.endTime);
  const size = endIndex - startIndex;

  const dirStyle = 'top';
  const sizeStyle = 'height';

  return {
    [dirStyle]: `calc(${
      ((startIndex - startingIndex) / totalCols) * 100
    }% + 1px)`,
    [sizeStyle]: `calc(${(size / totalCols) * 100}% - 1px)`,
  };
}

const TimetableDay = ({
  day,
  dayLessonRows,
  showTitle,
  startingIndex,
  endingIndex,
  isCurrentDay,
  currentTimeIndicatorStyle,
  hoverLesson,
  onCellHover,
  onModifyCell,
  highlightPeriod,
  customisedModules,
}: Props) => {
  const columns = endingIndex - startingIndex;
  const size = 100 / (columns / 4);

  const columnStyle = {
    backgroundSize: `${size}% ${size}%`,
    height: VERTICAL_HEIGHT * columns,
  };

  return (
    <View style={styles.container}>
      <View style={columnStyle}>
        <Text style={styles.timetableHeader}>{day.substring(0, 1)}</Text>
        {dayLessonRows.map((dayLessonRow, i) => (
          <TimetableRow
            customisedModules={customisedModules}
            endingIndex={endingIndex}
            hoverLesson={hoverLesson}
            key={i}
            lessons={dayLessonRow}
            onCellHover={onCellHover}
            onModifyCell={onModifyCell}
            showTitle={showTitle}
            startingIndex={startingIndex}
          />
        ))}
      </View>
    </View>
  );
};

export default TimetableDay;
