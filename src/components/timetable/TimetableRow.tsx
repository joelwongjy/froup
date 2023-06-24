import { StyleSheet, View } from 'react-native';
import { ModuleCode } from '@typings/modules';
import { HoverLesson, ModifiableLesson } from '@typings/timetables';
import { OnHoverCell, OnModifyCell } from '@typings/views';
import { convertTimeToIndex } from '@utils/time';

import TimetableCell from './TimetableCell';

interface Props {
  showTitle: boolean;
  startingIndex: number;
  endingIndex: number;
  lessons: ModifiableLesson[];
  hoverLesson?: HoverLesson | null;
  onCellHover: OnHoverCell;
  onModifyCell?: OnModifyCell;
  customisedModules?: ModuleCode[];
}

const styles = StyleSheet.create({
  container: {
    width: 128,
    flex: 1,
    flexDirection: 'column',
    paddingTop: 64,
  },
});

const TimetableDay = ({
  startingIndex,
  endingIndex,
  lessons,
  hoverLesson,
  onCellHover,
  onModifyCell,
  showTitle,
  customisedModules,
}: Props) => {
  const columns = endingIndex - startingIndex;

  return (
    <View style={styles.container}>
      {lessons.map((lesson) => {
        const startIndex = convertTimeToIndex(lesson.startTime);
        const endIndex = convertTimeToIndex(lesson.endTime);

        const size = endIndex - startIndex;
        const style = {
          top: (startIndex - startingIndex / columns) * 100 + 1,
          height: (size / columns) * 100 - 1,
        };

        const conditionalProps =
          lesson.isModifiable && onModifyCell
            ? {
                onClick: (position: ClientRect) =>
                  onModifyCell(lesson, position),
              }
            : {};

        return (
          <TimetableCell
            customisedModules={customisedModules}
            hoverLesson={hoverLesson}
            key={lesson.startTime}
            lesson={lesson}
            onHover={onCellHover}
            showTitle={showTitle}
            style={style}
            transparent={lesson.startTime === lesson.endTime}
            {...conditionalProps}
          />
        );
      })}
    </View>
  );
};

export default TimetableDay;
