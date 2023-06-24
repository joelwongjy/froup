import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { consumeWeeks, ModuleCode, WeekRange } from '@typings/modules';
import { HoverLesson, ModifiableLesson } from '@typings/timetables';
import { OnHoverCell } from '@typings/views';
import {
  formatNumericWeeks,
  getHoverLesson,
  LESSON_TYPE_ABBREV,
} from '@utils/timetable';
import { format, parseISO } from 'date-fns';
import { isEqual } from 'lodash';
import NUSModerator, { AcadWeekInfo } from 'nusmoderator';

interface Props {
  showTitle: boolean;
  lesson: ModifiableLesson;
  onHover: OnHoverCell;
  onClick?: (position: ClientRect) => void;
  style: StyleProp<ViewStyle>;
  hoverLesson?: HoverLesson | null;
  transparent: boolean;
  customisedModules?: ModuleCode[];
}

const lessonDateFormat = 'MMM dd';

function formatWeekInfo(weekInfo: AcadWeekInfo) {
  if (weekInfo.type === 'Instructional') {
    return `Week ${weekInfo.num}`;
  }
  return weekInfo.type;
}

function formatWeekRange(weekRange: WeekRange) {
  const start = parseISO(weekRange.start);

  // Start = end means there's just one lesson
  if (weekRange.start === weekRange.end) {
    return format(start, lessonDateFormat);
  }

  let dateRange = `${format(start, lessonDateFormat)}–${format(
    parseISO(weekRange.end),
    lessonDateFormat,
  )}`;

  // If lessons are not weekly, we need to mention that
  if (weekRange.weekInterval) {
    dateRange += `, every ${weekRange.weekInterval} weeks`;
  }

  if (!weekRange.weeks) {
    return dateRange;
  }

  return <Text>{dateRange}</Text>;
}

const TimetableCell = ({
  showTitle,
  lesson,
  onHover,
  onClick,
  style,
  hoverLesson,
  transparent,
  customisedModules,
}: Props) => {
  const moduleName = showTitle
    ? `${lesson.moduleCode} ${lesson.title}`
    : lesson.moduleCode;

  const isHoveredOver = isEqual(getHoverLesson(lesson), hoverLesson);
  const conditionalProps = onClick
    ? {
        onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          onClick(e.currentTarget.getBoundingClientRect());
        },
      }
    : {};

  const weekText = consumeWeeks<React.ReactNode>(
    lesson.weeks,
    formatNumericWeeks,
    formatWeekRange,
  );

  return (
    <View>
      <TouchableOpacity style={style} {...conditionalProps}>
        <View>
          <Text>
            {moduleName}
            {customisedModules?.includes(lesson.moduleCode) ? '*' : null}
          </Text>
          <Text>
            {LESSON_TYPE_ABBREV[lesson.lessonType]} [{lesson.classNo}]
          </Text>
          <Text>
            {lesson.venue.startsWith('E-Learn') ? 'E-Learning' : lesson.venue}
          </Text>
          {weekText && <div>{weekText}</div>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TimetableCell;
