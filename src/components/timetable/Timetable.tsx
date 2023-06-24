import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ModuleCode } from '@typings/modules';
import {
  ColoredLesson,
  HoverLesson,
  TimetableArrangement,
} from '@typings/timetables';
import { TimePeriod } from '@typings/venues';
import { OnModifyCell } from '@typings/views';
import {
  calculateBorderTimings,
  getCurrentHours,
  getCurrentMinutes,
  getDayIndex,
  SCHOOLDAYS,
} from '@utils/time';
import { flattenDeep, values } from 'lodash';

import TimetableDay from './TimetableDay';
import TimetableTimings from './TimetableTimings';

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
  },
  border: {
    borderTopColor: '#ECEBF2',
    borderTopWidth: 1,
  },
  timetableTimings: {
    paddingTop: 48,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 48,
  },
});

interface Props {
  lessons: TimetableArrangement;
  showTitle?: boolean;
  onModifyCell?: OnModifyCell;
  highlightPeriod?: TimePeriod;
  customisedModules?: ModuleCode[];
}

const nullCurrentTimeIndicatorStyle: React.CSSProperties = {
  opacity: 0,
};

const EMPTY_ROW_LESSONS = [[]];

const Timetable = ({
  lessons,
  showTitle,
  onModifyCell,
  highlightPeriod,
  customisedModules,
}: Props) => {
  const [hoverLesson, setHoverLesson] = useState<HoverLesson | null>(null);

  const onCellHover = (hoverLesson: HoverLesson | null) => {
    setHoverLesson(hoverLesson);
  };

  const schoolDays = SCHOOLDAYS.filter((day) => day !== 'Saturday');
  const flattenedLessons = flattenDeep<ColoredLesson>(values(lessons));
  const { startingIndex, endingIndex } = calculateBorderTimings(
    flattenedLessons,
    highlightPeriod,
  );
  const currentDayIndex = getDayIndex(); // Monday = 0, Friday = 4

  // Calculate the margin offset for the CurrentTimeIndicator
  const columns = endingIndex - startingIndex;
  const currentHours = getCurrentHours();
  const currentMinutes = getCurrentMinutes();
  const hoursMarginOffset =
    ((currentHours * 2 - startingIndex) / columns) * 100;
  const minutesMarginOffset = (currentMinutes / 30 / columns) * 100;
  const currentTimeIndicatorVisible =
    currentHours * 2 >= startingIndex && currentHours * 2 < endingIndex;
  const currentTimeIndicatorStyle: React.CSSProperties = {
    top: `${hoursMarginOffset + minutesMarginOffset}%`,
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal={true} style={styles.border}>
        <View style={styles.timetableTimings}>
          <TimetableTimings
            endingIndex={endingIndex}
            startingIndex={startingIndex}
          />
        </View>
        
        {schoolDays.map((day, index) => (
          <TimetableDay
            currentTimeIndicatorStyle={
              index === currentDayIndex && currentTimeIndicatorVisible
                ? currentTimeIndicatorStyle
                : nullCurrentTimeIndicatorStyle
            }
            customisedModules={customisedModules}
            day={day}
            dayLessonRows={lessons ? lessons[day] : EMPTY_ROW_LESSONS}
            endingIndex={endingIndex}
            highlightPeriod={
              highlightPeriod && index === highlightPeriod.day
                ? highlightPeriod
                : undefined
            }
            hoverLesson={hoverLesson}
            isCurrentDay={index === currentDayIndex}
            key={day}
            onCellHover={onCellHover}
            onModifyCell={onModifyCell}
            showTitle={showTitle ?? false}
            startingIndex={startingIndex}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default Timetable;
